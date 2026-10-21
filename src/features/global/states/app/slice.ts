import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
    deviceType?: "mobile" | "desktop",
    ui: {
        authSnackbarOpen: boolean,
        authModalOpen: boolean,
        createCollectionDialogOpen: boolean,
        collectionDialog: {
            open: boolean,
            context: {mangaUUID: string}
        },
        reportDialog: {
            open: boolean,
            context: {
                type: "chapter" | "profile" | "manga",
                entityID: string | number,
            }
        },
        shareBackdrop: {
            open: boolean,
            link: string
        },
        snackbar: {
            context: {
                type: "error" | "success",
                message: string,
            }
            open: boolean
        }
    }
}

const initialState: AppState = {
    deviceType: undefined,
    ui: {
        authSnackbarOpen: false,
        authModalOpen: false,
        createCollectionDialogOpen: false,
        collectionDialog: {
            open: false,
            context: {mangaUUID: ""}
        },
        reportDialog: {
            open: false,
            context: {
                type: "manga",
                entityID: 0
            }
        },
        shareBackdrop: {
            open: false,
            link: ""
        },
        snackbar: {
            context: {
                message: "нет сообщения",
                type: "success",
            },
            open: false
        }
    }
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        init: (state, action: PayloadAction<{deviceType: "mobile" | "desktop"}>) => {
            state.deviceType = action.payload.deviceType
        },
        setDeviceType: (state, action) => {
            state.deviceType = action.payload
        },
        setAuthSnackbarOpen: (state, action) => {
            state.ui.authSnackbarOpen = action.payload
        },
        setAuthModalOpen: (state, action) => {
            state.ui.authModalOpen = action.payload
        },
        openCollectionDialog: (state, action: PayloadAction<{mangaUUID: string}>) => {
            state.ui.collectionDialog.open = true
            state.ui.collectionDialog.context = action.payload      
        },
        closeCollectionDialog: (state) => {
            state.ui.collectionDialog.open = false
        },
        openReportDialog: (state, action: PayloadAction<{type: "profile" | "chapter" | "manga", entityID: string | number}>) => {
            state.ui.reportDialog.context = action.payload
            state.ui.reportDialog.open = true
        },
        closeReportDialog: (state) => {
            state.ui.reportDialog.open = false
        },
        openShareBackdrop: (state, action: PayloadAction<string>) => {
            state.ui.shareBackdrop.open = true,
            state.ui.shareBackdrop.link = action.payload
        },
        closeShareBackdrop: (state) => {
            state.ui.shareBackdrop.open = false
        },
        setCreateCollectionDialogOpen: (state, action) => {
            state.ui.createCollectionDialogOpen = action.payload
        },
        openSnackbar: (state, action: PayloadAction<{type: "error" | "success", message: string}>) => {
            const {type, message} = action.payload

            state.ui.snackbar.context.type = type
            state.ui.snackbar.context.message = message
            state.ui.snackbar.open = true
        },
        closeSnackbar: (state) => {
            state.ui.snackbar.open = false
        }
    }
})

export const { 
    init,
    setAuthModalOpen,
    setAuthSnackbarOpen,
    setDeviceType,
    openCollectionDialog,
    closeCollectionDialog,
    openReportDialog,
    closeReportDialog,
    openShareBackdrop,
    closeShareBackdrop,
    setCreateCollectionDialogOpen,
    openSnackbar,
    closeSnackbar
} = appSlice.actions

export type RootState = {
    global: {app: AppState}
}

export const selectDeviceType = (state: RootState) => state.global.app.deviceType
export const selectAuthDialogOpen = (state: RootState) => state.global.app.ui.authModalOpen
export const selectAuthSnackbarOpen = (state: RootState) => state.global.app.ui.authSnackbarOpen
export const selectCollectionDialogOpen = (state: RootState) => state.global.app.ui.collectionDialog.open
export const selectCollectionDialogContext = (state: RootState) => state.global.app.ui.collectionDialog.context
export const selectReportDialogOpen = (state: RootState) => state.global.app.ui.reportDialog.open
export const selectReportDialogContext = (state: RootState) => state.global.app.ui.reportDialog.context
export const selectShareBackdropOpen = (state: RootState) => state.global.app.ui.shareBackdrop.open
export const selectShareBackgropLink = (state: RootState) => state.global.app.ui.shareBackdrop.link
export const selectCreateCollectionDialogOpen = (state: RootState) => state.global.app.ui.createCollectionDialogOpen
export const selectSnackbarOpen = (state: RootState) => state.global.app.ui.snackbar.open
export const selectSnackbarContext = (state: RootState) => state.global.app.ui.snackbar.context

export default appSlice.reducer