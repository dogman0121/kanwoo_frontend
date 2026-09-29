import AppBackdrop from "@/components/AppBackdrop";
import { routes, toHref } from "@/constants/routes/main.routes";
import { openReportDialog, openShareBackdrop } from "@/features/global/states/app/slice";
import { selectProfile } from "@/lib/state/features/profile-page/page/selectors";
import { setInfoModalOpen } from "@/lib/state/features/profile-page/page/slice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import ReportIcon from '@mui/icons-material/Report';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export default function Options({
    open,
    onClose
}: {
    open: boolean,
    onClose: () => void
}) {
    const dispatch = useAppDispatch()

    const profile = useAppSelector(selectProfile)

    const handleOpenInfo = () => {
        dispatch(setInfoModalOpen(true))
    }

    const handleOpenShare = () => {
        if (!profile) return

        dispatch(openShareBackdrop(toHref(routes.profiles.item, {slug: profile.slug})))
    }

    const handleOpenReport = () => {
        if (!profile) return

        dispatch(openReportDialog({type: "profile", entityID: profile.id}))
    }

    return (
        <AppBackdrop
            open={open}
            onClose={onClose}
        >
            <List>
                <ListItemButton onClick={handleOpenInfo}>
                    <ListItemIcon><InfoOutlineRoundedIcon /></ListItemIcon>
                    <ListItemText>Информация о профиле</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={handleOpenShare}>
                    <ListItemIcon><ShareRoundedIcon /></ListItemIcon>
                    <ListItemText>Поделиться</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={handleOpenReport}>
                    <ListItemIcon><ReportIcon /></ListItemIcon>
                    <ListItemText>Пожаловаться</ListItemText>
                </ListItemButton>
            </List>
        </AppBackdrop>
    )
}