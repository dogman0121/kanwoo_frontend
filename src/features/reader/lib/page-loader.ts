"use client"

import { ReaderMode } from "@/features/types/reader-mode";
import Page from "@/types/chapter/page"
import { PriorityQueue } from "@datastructures-js/priority-queue"
import { padEnd, range } from "lodash";

const asyncSleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// const sleep = (ms: number) => setTimeout(() => {}, ms)

export type PageLoadingStatus = {
    status: "loading" | "loaded" | "failed" | "waiting" | "interrupted"
}

export type PageLoadingTask = {
    priority: number,
    pageNumber: number,
    page: Page
}

class WorkerTaskInterrupted extends Error {}

class PageLoaderWorker {
    isBusy: boolean = false

    maxRetries: number
    retryTimeout: number
    abortController?: AbortController
    pageTask?: PageLoadingTask

    constructor (maxRetries: number, retryTimeout: number) {
        this.maxRetries = maxRetries
        this.retryTimeout = retryTimeout
    }

    async execute(task: PageLoadingTask) {
        this.abortController = new AbortController()

        this.isBusy = true
        this.pageTask = task

        let attemps = 0;
        let currentRetryTimeout = this.retryTimeout

        while (attemps < this.maxRetries) {
            try {
                //alert(task.page.link)
                const response = await fetch(
                    task.page.link,
                    {
                        signal: this.abortController.signal
                    }
                )
                const responseBlob = await response.blob()

                this.isBusy = false
                this.pageTask = undefined

                return responseBlob
            } 
            catch (error: unknown) {
                if (error instanceof Error && error.name == "AbortError")
                    throw new WorkerTaskInterrupted("The task was cancelled")

                attemps += 1
                
                //alert(error)
                await asyncSleep(currentRetryTimeout)
                currentRetryTimeout *= 1.5   
            }
        }
        
        this.isBusy = false
        this.pageTask = undefined

        throw new Error("Maximum attemps reached while fetching image.")
    }

    cancel() {
        if (this.abortController)
            this.abortController.abort()

        this.pageTask = undefined
        this.isBusy = false
        this.abortController = undefined
    }
}

export interface PageLoaderProps {
    preloadBeforeSize: number,
    preloadAfterSize: number, 
    maxRetries: number
}

class PageLoader {
    RETRY_TIMEOUT: number = 100
    MAX_RETRIES: number = 2
    MAX_CONCURRENT_TASKS: number = 2
    LOOP_ITERATION_TIMEOUT: number = 100

    mode: ReaderMode = ReaderMode.ANONYMUS
    currChapterID: number = 0
    currPageNumber: number = -1
    chapterPages: Map<number, Page[]>
    loadStatuses: Map<string, PageLoadingStatus>
    
    preloadBeforeSize: number
    preloadAfterSize: number
    maxRetries: number

    blobCache: Map<string, Blob>
    urlCache: Map<string, string>

    callbacks: Map<string, Function[]>

    tasks: PriorityQueue<PageLoadingTask>
    workersPool: PageLoaderWorker[]

    constructor({preloadAfterSize, preloadBeforeSize, maxRetries}: PageLoaderProps) {
        this.preloadBeforeSize = preloadBeforeSize
        this.preloadAfterSize = preloadAfterSize

        this.chapterPages = new Map()
        this.loadStatuses = new Map() // key: uuid, value: PageStatus
        this.maxRetries = maxRetries
        this.callbacks = new Map()

        this.blobCache = new Map()
        this.urlCache = new Map()

        this.tasks = new PriorityQueue((a, b) => b.priority - a.priority)
        this.workersPool = [...range(0, this.MAX_CONCURRENT_TASKS).map(
            () => new PageLoaderWorker(this.MAX_RETRIES, this.RETRY_TIMEOUT)
        )]

        this._loadingLoop()
    }

    initialize({mode, chapterID, pages}: {
        mode: ReaderMode,
        chapterID: number, 
        pages: Page[], 
    }) {
        this.mode = mode
        this.addChapter(chapterID, pages)
    }

    setPage(chapterID: number, pageNumber: number) {
        //if (this.pageNumber ==  pageNumber) return
        
        this.currChapterID = chapterID
        this.currPageNumber = pageNumber
        // this._cancelTasks()

        const rangeStart = Math.max(0, pageNumber - this.preloadBeforeSize)
        const rangeEnd = Math.min(this._getChapterPagesById(this.currChapterID).length-1, pageNumber + this.preloadAfterSize)

        for(let pageInd = rangeStart; pageInd <= rangeEnd; pageInd++) {
            const page = this._getPageByNumber(pageInd)

            if (this._getPageLoadingStatus(page.uuid).status != "loading"){
                this.loadStatuses.set(page.uuid, {status: "loading"})
                this.tasks.push({
                    priority: this._computePageTaskPriority(page),
                    pageNumber: pageInd,
                    page: page
                })
            }
        }
    }

    _getPageByNumber(pageNumber: number) {
        const pages = this.chapterPages.get(this.currChapterID); 
        if (!pages || pages.length <= pageNumber)
            throw Error("Failed to get Page object")

        const page: Page = pages[pageNumber]

        return page
    }

    _getChapterPagesById(chapterId: number) {
        const pages = this.chapterPages.get(chapterId)

        if (!pages)
            throw new Error("Failed to get chapter pages")

        return pages
    }

    _isPageNeedsToLoad (pageNumber: number) {
        return (this.currPageNumber - this.preloadBeforeSize) <= pageNumber && pageNumber <= (this.currPageNumber + this.preloadAfterSize)
    }

    _addPageIntoBlobCache(pageUUID: string, blob: Blob) {
        this.blobCache.set(pageUUID, blob)
    }

    _checkPageInBlobCache(pageUUID: string) {
        return this.blobCache.has(pageUUID)
    }

    _addPageIntoUrlCache(pageUUID: string, url: string) {
        this.urlCache.set(pageUUID, url)
    }

    _checkPageIntoURLCache(pageUUID: string) {
        return this.urlCache.has(pageUUID)
    }

    _setPageLoadingStatus(pageUUID: string, status: PageLoadingStatus) {
        this.loadStatuses.set(pageUUID, status)
    }

    _getPageLoadingStatus(pageUUID: string) {
        if (!this.loadStatuses.has(pageUUID))
            this.loadStatuses.set(pageUUID, {status: "waiting"})

        return this.loadStatuses.get(pageUUID)!
    }

    _isTaskMustBeCompleted(task: PageLoadingTask) {
        return !this.blobCache.has(task.page.uuid)
    }

    _computePageTaskPriority(page: Page) {
        return 1
    }

    _cancelTasks() {
        for (let worker of this.workersPool){
            if (worker.pageTask && !this._isTaskMustBeCompleted(worker.pageTask)) {
                this.loadStatuses.set(worker.pageTask.page.uuid, {status: "interrupted"})
                worker.cancel()
            }
        }
    }

    async _loadingLoop() {
        while (true) {
            for (let worker of this.workersPool) {
                if (worker.isBusy)
                    continue

                // Если страница есть в кэше или не требует загрузки, пропускаем
                while (!this.tasks.isEmpty()) {
                    const task = this.tasks.front()
                    if (task && this._isTaskMustBeCompleted(task)) {
                        break
                    }

                    this.tasks.pop()
                }

                const task = this.tasks.pop()
                if (task) {
                    const plannedTask = task

                    worker.execute(plannedTask)
                    .then((imageBlob: Blob) => {
                        this.blobCache.set(plannedTask.page.uuid, imageBlob)

                        this._setPageLoadingStatus(plannedTask.page.uuid, {status: "loaded"})
                        this._notify(plannedTask.page.uuid, imageBlob)
                    })
                    .catch((e) => {
                        if (e.name == "WorkerTaskInterrupted")
                            this._setPageLoadingStatus(plannedTask.page.uuid, {status: "interrupted"})
                    })
                }
            }
            
            await asyncSleep(this.LOOP_ITERATION_TIMEOUT)
        }
    }

    addChapter(chapterId: number, pages: Page[]) {
        this.chapterPages.set(chapterId, pages)
    }

    hasChapter(
        chapterId: number
    ) {
        return this.chapterPages.has(chapterId)
    }

    getPageImageUrlByUUID(pageUUID: string) {
        const urlString = this.urlCache.get(pageUUID)

        if (!urlString){
            const blobObject = this.blobCache.get(pageUUID)

            if (!blobObject) return

            const newUrlString = URL.createObjectURL(blobObject)
            this._addPageIntoUrlCache(pageUUID, newUrlString)

            return newUrlString
        }

        return urlString
    }

    _notify(pageUUID: string, result: Blob) {
        const callbackFunctions = this.callbacks.get(pageUUID)

        if (callbackFunctions) {
            for (let func of callbackFunctions)
                func(result)
        }
    }

    addLoadingCallback(page: Page, callbackFn: (image: Blob) => void) {
        let callbacks = this.callbacks.get(page.uuid) || []

        callbacks.push(callbackFn)

        this.callbacks.set(page.uuid, callbacks)

    }

    removeLoadingCallback(page: Page, callbackFn: (image: Blob) => void) {
        const callbacks = this.callbacks.get(page.uuid)

        if (!callbacks)
            return

        const filteredCallbacks = callbacks.filter(callback => callback != callbackFn)

        this.callbacks.set(page.uuid, filteredCallbacks)
    }

    destroy() {
        for (let worker of this.workersPool)
            worker.cancel()
        
        for (let urlObject of this.urlCache.values())
            URL.revokeObjectURL(urlObject)
    }
}

export default PageLoader;