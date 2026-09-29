"use client"

import theme from "@/constants/themes/main.theme";
import { Box, Divider, Modal, ModalProps, Paper } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SearchInputMobile from "./SearchInputMobile";
import ScrollableBox from "@/components/ScrollableBox";
import SearchListModal from "./SearchListModal";
import SearchProvider from "./SearchProvider";
import { useRef, useState } from "react";

export default function MobileSearchModal({onClose, open}: {open: boolean, onClose: () => void}) {

    const inputRef = useRef<HTMLInputElement>(null)

    const handleClose = () => {
        if (inputRef.current)
            inputRef.current.blur()
        onClose()
    }

    return (
        <SearchProvider processEmptyQuery={false}>
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
                                        columnGap: theme.spacing(2),
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
                            <Divider />
                        </Box>
                        
                        <ScrollableBox
                            sx={{
                                flexGrow: 1,
                                overflowY: "auto",

                                scrollbarWidth: "none"
                            }}
                        >
                            <SearchListModal/>
                        </ScrollableBox>
                    </Box>
                </Box>
            </Modal>
        </SearchProvider>
    )
    
}