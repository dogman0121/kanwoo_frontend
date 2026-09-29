"use client"

import { selectCollection, selectCollectionContext, setAddMangaDialogOpen, setEditDialogOpen } from "@/features/collection/states/collection-page/slice"
import { selectAuthProfile } from "@/features/global/states/auth-profile"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Box, Button, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, SxProps } from "@mui/material"
import { Children, useRef, useState } from "react"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Confirmation from "@/components/Confirmation"
import { useRouter } from "next/navigation"
import { deleteCollection } from "@/features/collection/states/lib/thunks"
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import { openShareBackdrop } from "@/features/global/states/app/slice"
import { routes, toHref } from "@/constants/routes/main.routes"

export interface ActionsProps {
    mobile?: boolean,
    sx?: SxProps
}

function ActionsContainer ({children, sx}: {children: React.ReactNode, sx?: SxProps}) {
    return (
        <Box
            sx={{
                display: "flex",
                gap: 1,
                ...sx
            }}
        >
            {Children.map(children, c => c)}
        </Box>
    )
}

export function ActionsMobile({sx}: {sx?: SxProps}) {
    const collection = useAppSelector(selectCollection)
    const collectionContext = useAppSelector(selectCollectionContext)
    
    const authProfile = useAppSelector(selectAuthProfile)

    if (!collection)
        return

    return (
        <>
            {authProfile?.id != collection.creator.id && (
                <ActionsContainer sx={{...sx}}>
                    {collectionContext?.viewer.is_saved ?
                        <Button
                            variant="contained"
                            color="secondary"
                        >
                            Убрать
                        </Button>
                        :
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Сохранить
                        </Button>
                    }
                </ActionsContainer>
            )}
        </>
    )
}

export function ActionsDesktop({sx}: {sx?: SxProps}) {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const collection = useAppSelector(selectCollection)
    const collectionContext = useAppSelector(selectCollectionContext)
    
    const authProfile = useAppSelector(selectAuthProfile)

    const [optionsMenuOpen, setOptionsMenuOpen] = useState(false)
    const optionsButtonRef = useRef(null)

    const handleShare = () => {
        if (!collection) return
        
        dispatch(openShareBackdrop(toHref(routes.collections.item, {id: collection.id.toString()})))
    }

    if (!collection)
        return

    return (
        <>
            <ActionsContainer sx={sx}>
                {authProfile?.id == collection.creator.id ?
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {dispatch(setAddMangaDialogOpen(true))}}
                        >
                            Добавить мангу
                        </Button>
                        <IconButton onClick={handleShare}>
                            <ShareRoundedIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => dispatch(setEditDialogOpen(true))}
                        >
                            <EditRoundedIcon />
                        </IconButton>
                        <IconButton
                            ref={optionsButtonRef}
                            onClick={() => setOptionsMenuOpen(true)}
                        >
                            <MoreVertRoundedIcon />
                        </IconButton>
                        
                    </>
                    :
                    <>
                        {collectionContext?.viewer.is_saved ?
                            <Button
                                variant="contained"
                                color="secondary"
                            >
                                Убрать
                            </Button>
                            :
                            <Button
                                variant="contained"
                                color="primary"
                            >
                                Сохранить
                            </Button>
                        }
                        <IconButton onClick={handleShare}>
                            <ShareRoundedIcon />
                        </IconButton>
                    </>
                }
            </ActionsContainer>
            <Menu
                open={optionsMenuOpen}
                onClose={() => setOptionsMenuOpen(false)}
                anchorEl={optionsButtonRef.current}
            >
                <Confirmation onConfirm={() => {
                    dispatch(deleteCollection(collection.id)).unwrap()

                    setOptionsMenuOpen(false)
                    router.back()
                }}>
                    <MenuItem>
                        <ListItemIcon>
                            <DeleteRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Удалить
                        </ListItemText>
                    </MenuItem>
                </Confirmation>
            </Menu>
        </>
    )
}

export default function Actions({mobile, sx}: ActionsProps) {

    return (
        <>
            {mobile ?
                <ActionsMobile sx={sx}/>
                :
                <ActionsDesktop sx={sx}/>
            }
        </>
    )
}