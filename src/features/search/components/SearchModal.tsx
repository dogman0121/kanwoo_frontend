"use client"

import { selectDeviceType } from "@/features/global/states/app/slice"
import { useAppSelector } from "@/lib/state/hooks"
import SearchProvider from "./SearchProvider"
import { Box, Divider, List, Modal, Paper, Typography } from "@mui/material"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useContext, useRef, useState } from "react"
import SearchInputMobile from "./SearchInputMobile"
import ScrollableBox from "@/components/ScrollableBox"
import SearchListModal from "./ui/SearchListModal"
import SearchInputDesktop from "./SearchInputDesktop"
import SuggestMangaDialog from "@/components/SuggestMangaDialog"
import SearchContext from "../context/SearchContext"
import LoadingBox from "@/components/LoadingBox"

export interface SearchModalProps {
    open: boolean,
    onClose?: () => void
}

function DesktopModal({
    open, onClose
}: SearchModalProps) {
    const { isLoading } = useContext(SearchContext);

    const [suggestDialogOpen, setSuggestDialogOpen] = useState(false);

    return (
        <>
            <Modal
                onClose={onClose}
                open={open}
            >
                <Paper
                    sx={{
                        position: "absolute",
                        top: "10px",
                        left: "50%",
                        transform: 'translateX(-50%)',
                        
                        overflow: "hidden",
                        boxShadow: 24,
                        borderRadius: "20px",
                        width: "650px",

                        "&:focus": {
                            outline: "none"
                        }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            position: "static",
                            maxHeight: "90vh",
                        }}
                    >
                        <Box
                            sx={{
                                px: 2,
                                pt: 2,
                                pb: 2
                                
                            }}
                        >
                            <SearchInputDesktop
                                fullWidth
                            />
                            {/* <SearchSectionSelector 
                                sx={{
                                    mt: "5px"
                                }}
                            /> */}
                        </Box>
                        <ScrollableBox
                            sx={{
                                pb: 2
                            }}
                        >
                            <LoadingBox loading={isLoading}>
                                <SearchListModal
                                    onChoose={() => {
                                        onClose?.()
                                    }}
                                />
                            </LoadingBox>
                        </ScrollableBox>
                        <Divider />
                        <Box
                            sx={{
                                py: "10px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                columnGap: "5px"
                            }}
                        >
                            Не нашли тайтл?
                            <Typography
                                onClick={() => setSuggestDialogOpen(true)}
                                color="primary"
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": {
                                        textDecoration: "underline"
                                    }
                                }}
                            >
                                Оставить заявку
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Modal>
            <SuggestMangaDialog open={suggestDialogOpen} onClose={() => setSuggestDialogOpen(false)}/>
        </>
    )
}

function MobileModal({
    open, onClose
}: SearchModalProps) {
    const { isLoading } = useContext(SearchContext);

    const inputRef = useRef<HTMLInputElement>(null)
    
    const handleClose = () => {
        if (inputRef.current)
            inputRef.current.blur()
        onClose?.()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            disableAutoFocus
            disableEnforceFocus
            disableRestoreFocus
        >
            <Box
                sx={{
                    width: "100vw",
                    height: "100%",
                    overflow: "hidden",
                    bgcolor: "background.default"
                }}
            >
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        position: "static",
                    }}
                >
                    <Box
                        sx={{
                            position: "sticky",
                            top: 0,

                            bgcolor: "background.default",

                        }}
                    >
                        <Box
                            sx={{
                                p: 2
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    columnGap: 2,
                                    height: "34px",
                                }}
                            >
                                <ArrowBackRoundedIcon onClick={handleClose}/>
                                <SearchInputMobile
                                    slotProps={{
                                        formControl: {
                                            focused: true,
                                            autoFocus: true
                                        },
                                        input: {
                                            autoFocus: true,
                                            inputRef: inputRef
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>               
                    <LoadingBox loading={isLoading}>
                        <ScrollableBox
                            sx={{
                                pb: 2
                            }}
                        >
                            <SearchListModal
                                onChoose={() => onClose?.()}
                            />
                        </ScrollableBox>
                    </LoadingBox>
                </Box>
            </Box>
        </Modal>
    )
}

export default function SearchModal({...props}: SearchModalProps) {
    const deviceType = useAppSelector(selectDeviceType)
    
    return (
        <SearchProvider>
            {deviceType == "mobile" && (
                <MobileModal {...props}/>
            )}
            {deviceType != "mobile" && (
                <DesktopModal {...props}/>
            )}
        </ SearchProvider>
    )
}