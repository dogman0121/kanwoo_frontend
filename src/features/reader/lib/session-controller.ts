import { ReaderMode } from "@/features/types/reader-mode"
import { readerClientAPI } from "../api/client.api"

enum ReadingStatus {
    STARTED = "started",
    FINISHED = "finished"
};

type ReadingState = {
    readingStatus: ReadingStatus
}

export interface ReadingSessionControllerProps {

}


class ReadingSessionController {
    chaptersReadingStates: Map<number, ReadingState> = new Map()
    mode: ReaderMode = ReaderMode.ANONYMUS

    sessionID: number = -1

    debouncedChapterID: number = 0
    debouncedPageNumber: number = 0
    debouncedIsFinished: boolean = false
    debounceTimerID: NodeJS.Timeout | null = null

    constructor(props: ReadingSessionControllerProps) {

    }

    async _fetchProgress(chapterID: number) {
        if (this.mode == ReaderMode.AUTHORIZED) {
            try {
                const response = await readerClientAPI.getChapterProgress(chapterID);

                return {
                    data: response.data,
                    context: response.context,
                };
            }  catch (e) {
                console.log(e)
            }
        }

        return null
    }

    _getChapterReadingStateProtected(chapterID: number) {
        const readingState = this.chaptersReadingStates.get(chapterID)
        
        if (!readingState)
            throw Error("Failed to get chapter reading state.")

        return readingState
    }

    async _initSession(translationID: number) {
        const {data: {id}} = await readerClientAPI.getReadingSession(translationID)

        this.sessionID = id
    }
    
    async initialize({
        mode,
        chapterID,
        translationID
    }: {
        mode: ReaderMode,
        chapterID: number,
        translationID: number
    }) {
        this.mode = mode

        const progress = await this._fetchProgress(chapterID)

        this._initSession(translationID)

        return progress
    }

    async setProgress(chapterID: number, pageNumber: number, isFinished: boolean = false) {
        if (this.sessionID == -1) {
            return
        }

        const readingState = this.chaptersReadingStates.get(chapterID)
        if (readingState && readingState.readingStatus == ReadingStatus.FINISHED) {
            return
        }

        this._saveProgress(chapterID, pageNumber, isFinished)
    }

    async _saveProgress(chapterID: number, pageNumber: number, isFinished: boolean) {
        if (this.mode == ReaderMode.AUTHORIZED) {
            this._sendSaveRequest(chapterID, pageNumber, isFinished)

            if (isFinished) {
                this.chaptersReadingStates.set(chapterID, {readingStatus: ReadingStatus.FINISHED})
            } else {
                this.chaptersReadingStates.set(chapterID, {readingStatus: ReadingStatus.STARTED})
            }
        }
    }

    async _sendSaveRequest(chapterID: number, pageNumber: number, isFinished: boolean) {

        if (this.sessionID != -1 && !this.debounceTimerID)
            this.debounceTimerID = setTimeout(() => {
                readerClientAPI.updateSession(
                    this.sessionID, 
                    this.debouncedChapterID,
                    this.debouncedPageNumber,
                    this.debouncedIsFinished
                )

                this.debounceTimerID = null
            }, 2000)
        
        this.debouncedChapterID = chapterID
        this.debouncedIsFinished = isFinished
        this.debouncedPageNumber = pageNumber
    }
}

export default ReadingSessionController