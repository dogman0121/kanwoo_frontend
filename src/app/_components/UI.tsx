"use client"

import AppSnackbar from "@/components/AppSnackbar"
import ReportDialog from "@/components/ReportDialog"
import Share from "@/components/Share"
import AuthModal from "@/features/auth/components/AuthModal"
import CreateCollectionDialog from "@/features/collection/components/CreateDialog"
import MangaAddRemoveDialog from "@/features/collection/components/MangaAddRemoveDialog"
import { 
    closeCollectionDialog,
    closeReportDialog, 
    closeShareBackdrop, 
    selectAuthDialogOpen, 
    selectAuthSnackbarOpen, 
    selectCollectionDialogContext, 
    selectCollectionDialogOpen, 
    selectCreateCollectionDialogOpen, 
    selectReportDialogContext, 
    selectReportDialogOpen, 
    selectShareBackdropOpen, 
    selectShareBackgropLink, 
    setAuthModalOpen, 
    setAuthSnackbarOpen, 
    setCreateCollectionDialogOpen
} from "@/features/global/states/app/slice"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { useEffect } from "react"


export default function UI() {
    const dispatch = useAppDispatch()

    const authSnackbarOpen = useAppSelector(selectAuthSnackbarOpen)
    const authModalOpen = useAppSelector(selectAuthDialogOpen)

    const reportDialogOpen = useAppSelector(selectReportDialogOpen)
    const reportDialogContext = useAppSelector(selectReportDialogContext)
    
    const shareBackdropOpen = useAppSelector(selectShareBackdropOpen)
    const shareBackdropLink = useAppSelector(selectShareBackgropLink)

    const createCollectionDialogOpen = useAppSelector(selectCreateCollectionDialogOpen)

    const mangaAddRemoveCollectionDialogOpen = useAppSelector(selectCollectionDialogOpen)
    const mangaAddRemoveCollectionDialogContext = useAppSelector(selectCollectionDialogContext)

    return(
        <>
            <AuthModal
                open={authModalOpen}
                onClose={() => dispatch(setAuthModalOpen(false))}
            />
            <AppSnackbar 
                variant="error"
                message="Для использования данной функции необходимо авторизоваться."
                open={authSnackbarOpen}
                onClose={() => dispatch(setAuthSnackbarOpen(false))}
            />
            <ReportDialog 
                open={reportDialogOpen}
                onClose={() => dispatch(closeReportDialog())}
                context={reportDialogContext}
            />
            <Share 
                open={shareBackdropOpen}
                onClose={() => dispatch(closeShareBackdrop())}
                link={shareBackdropLink}
            />
            <CreateCollectionDialog
                open={createCollectionDialogOpen}
                onClose={() => dispatch(setCreateCollectionDialogOpen(false))}
            />
            <MangaAddRemoveDialog 
                open={mangaAddRemoveCollectionDialogOpen}
                context={mangaAddRemoveCollectionDialogContext}
                onClose={() => dispatch(closeCollectionDialog())}
            />
        </>
    )
}