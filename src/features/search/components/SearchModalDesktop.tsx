"use client"

import { Box, Divider, Modal, ModalProps, Paper, Typography } from "@mui/material";
import SearchProvider from "./SearchProvider";
import SearchSectionSelector from "./SearchSectionSelector";
import SearchListModal from "./SearchListModal";
import ScrollableBox from "@/components/ScrollableBox";
import SearchInputDesktop from "./SearchInputDesktop";
import theme from "@/theme";
import { useState } from "react";
import SuggestMangaDialog from "@/components/SuggestMangaDialog";

export default function SearchModalDesktop({onClose, ...props}: Omit<ModalProps, "children">) {
    
    const [suggestDialogOpen, setSuggestDialogOpen] = useState(false);

    return (
        <>
            <Modal
                onClose={onClose}
                {...props}
            >
                <SearchProvider emptyQuery={false}>
                    <Paper
                        sx={{
                            position: "absolute",
                            top: "10px",
                            left: "50%",
                            overflow: "hidden",
                            transform: 'translateX(-50%)',
                            boxShadow: 24,
                            border: "none",
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
                                    padding: "10px",
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
                                    p: "5px 10px 10px",
                                    flexGrow: 1,
                                    overflowY: "auto"
                                }}
                            >
                                <SearchListModal/>
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
                                    sx={{
                                        color: theme.vars?.palette.primary.main,
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
                </SearchProvider>
            </Modal>
            <SuggestMangaDialog open={suggestDialogOpen} onClose={() => setSuggestDialogOpen(false)}/>
        </>
    )
}