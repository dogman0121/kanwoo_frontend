import AppBackdrop from "@/components/app/AppBackdrop";
import { Backdrop, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Confirmation from "@/components/Confirmation";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { selectAuthProfile } from "@/features/auth/states/auth-profile";
import { selectCollection, selectEditDialogOpen, setEditDialogOpen } from "@/features/collection/states/collection-page/slice";
import { openShareBackdrop } from "@/features/global/states/app/slice";
import { routes, toHref } from "@/constants/routes/main.routes";
import { useRouter } from "next/navigation";
import { deleteCollection } from "@/features/collection/states/lib/thunks";
import EditDialog from "./EditDialog";

export default function MobileOptionsOptions({
    open,
    onClose
}: {
    open: boolean,
    onClose: () => void
}) {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const editDialogOpen = useAppSelector(selectEditDialogOpen)
    const authProfile = useAppSelector(selectAuthProfile)
    const collection = useAppSelector(selectCollection)

    if (!collection)
        return

    return (
        <>
            <AppBackdrop
                open={open}
                onClose={onClose}        
            >
                <List>
                    <ListItemButton onClick={() => dispatch(openShareBackdrop(toHref(routes.collections.item, {id: collection.data.id.toString()})))}>
                        <ListItemIcon>
                            <ShareRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Поделиться
                        </ListItemText>
                    </ListItemButton>
                    {authProfile?.id == collection.data.creator.id && (
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
                                dispatch(deleteCollection(collection.data.id)).unwrap()
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
                </List>
            </AppBackdrop>
            <EditDialog 
                collection={collection.data}
                open={editDialogOpen}
                onClose={() => dispatch(setEditDialogOpen(false))}
            />
        </>
    )
}