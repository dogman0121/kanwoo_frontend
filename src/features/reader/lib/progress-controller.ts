import { ReaderMode } from "@/features/types/reader-mode"
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


class ProgressController {
    progressesInfo: Map<number, ProgressInfo> = new Map()
    mode: ReaderMode = ReaderMode.ANONYMUS

    currChapterID: number = 0

    debouncedPageNumber: number = 0
    debounceTimerID: NodeJS.Timeout | null = null

    constructor(props: ProgressSaverProps) {

    }

    async _fetchProgress(chapterID: number) {
        if (this.mode == ReaderMode.AUTHORIZED) {
            try {
                const response = await readerClientAPI.getChapterProgress(chapterID);

                return {
                    progress: response.data,
                    progressContext: response.context,
                };
            }  catch (e) {
                console.log(e)
            }
        }

        return {
            progress: null,
            progressContext: null
        }
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
    
    async initialize({
        mode,
        chapterID
    }: {
        mode: ReaderMode,
        chapterID: number
    }) {
        this.mode = mode

        const {progress, progressContext} = await this._fetchProgress(chapterID)

        this._initSession(chapterID, progress?.page || 0)

        return {progress, progressContext}
    }

    async setPage(chapterID: number, pageNumber: number) {
        if (!this.progressesInfo.has(chapterID)) {
            await this._initSession(chapterID, 0)
        }

        this._saveProgress(chapterID, pageNumber)
    }

    async _saveProgress(chapterID: number, pageNumber: number) {
        if (this.mode == ReaderMode.AUTHORIZED) {
            this._sendSaveRequest(chapterID, pageNumber)
        } else {

        }
    }

    async _sendSaveRequest(chapterID: number, pageNumber: number) {
        const infoBlock = this.progressesInfo.get(chapterID)
        if (!infoBlock) 
            throw new Error("Failed to get session info")

        if (infoBlock.sessionId != -1 && !this.debounceTimerID)
            this.debounceTimerID = setTimeout(() => {
                readerClientAPI.saveProgress(infoBlock.sessionId, this.debouncedPageNumber)

                this.debounceTimerID = null
            }, 2000)
        
        this.debouncedPageNumber = pageNumber
    }
}

export default ProgressController