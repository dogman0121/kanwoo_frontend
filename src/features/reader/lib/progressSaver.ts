import { readerClientAPI } from "../api/client.api"

enum ProgressStatus {

    STARTED = "started",
    FINISHED = "finished"
};

type ProgressInfo = {
    sessionId: number,
    progressStatus: ProgressStatus
}

export interface ProgressSaverProps {

}


class ProgressSaver {
    progressesInfo: Map<number, ProgressInfo> = new Map()
    currChapterID: number = 0

    debouncedPageNumber: number = 0
    debounceTimerID: NodeJS.Timeout | null = null

    constructor(props: ProgressSaverProps) {

    }

    async _initSession(chapterID: number, pageNumber: number) {
        this.progressesInfo.set(chapterID, {
            sessionId: -1,
            progressStatus: ProgressStatus.STARTED
        })

        const {data: {id}} = await readerClientAPI.createSession(chapterID, pageNumber)

        this.progressesInfo.set(chapterID, {
            sessionId: id,
            progressStatus: ProgressStatus.STARTED
        })
    }

    async _sendSaveProgress(pageNumber: number) {
        const infoBlock = this.progressesInfo.get(this.currChapterID)
        if (!infoBlock) throw new Error("Failed to get session info")

        if (!this.debounceTimerID)
            this.debounceTimerID = setTimeout(() => {
                readerClientAPI.saveProgress(infoBlock.sessionId, this.debouncedPageNumber)

                this.debounceTimerID = null
            }, 2000)
        
        this.debouncedPageNumber = pageNumber
    }
    
    async startSession(chapterID: number, pageNumber: number) {
        if (this.progressesInfo.has(chapterID))
            return

        this.currChapterID = chapterID
        await this._initSession(chapterID, pageNumber)
    }

    async saveProgress (pageNumber: number) {
        if (!this.progressesInfo.has(this.currChapterID)){
            this._initSession(this.currChapterID, pageNumber)
        }
        
        this._sendSaveProgress(pageNumber)
    }

    endSession() {
        
    }
}

export default ProgressSaver