import AppBackdrop from "@/components/AppBackdrop";
import { Backdrop, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Confirmation from "@/components/Confirmation";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { selectAuthProfile } from "@/features/global/states/auth-profile";
import { selectCollection, setEditDialogOpen } from "@/features/collection/states/collection-page/slice";
import { openShareBackdrop } from "@/features/global/states/app/slice";
import { routes, toHref } from "@/constants/routes/main.routes";
import { useRouter } from "next/navigation";
import { deleteCollection } from "@/features/collection/states/lib/thunks";

export default function Options({
    open,
    onClose
}: {
    open: boolean,
    onClose: () => void
}) {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const authProfile = useAppSelector(selectAuthProfile)
    const collection = useAppSelector(selectCollection)

    if (!collection)
        return

    return (
        <AppBackdrop
            open={open}
            onClose={onClose}        
        >
            <ListItemButton onClick={() => dispatch(openShareBackdrop(toHref(routes.collections.item, {id: collection.id.toString()})))}>
                <ListItemIcon>
                    <ShareRoundedIcon />
                </ListItemIcon>
                <ListItemText>
                    Поделиться
                </ListItemText>
            </ListItemButton>
            {authProfile?.id == collection.creator.id && (
                <>
                    <ListItemButton onClick={() => dispatch(setEditDialogOpen(true))}>
                        <ListItemIcon>
                            <EditRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Редактировать
                        </ListItemText>
                    </ListItemButton>
                    <Confirmation onConfirm={() => {
                        dispatch(deleteCollection(collection.id)).unwrap()
                        onClose()
                        
                        router.back()
                    }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <DeleteRoundedIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Удалить
                            </ListItemText>
                        </ListItemButton>
                    </Confirmation>
                </>
            )}
        </AppBackdrop>
    )
}