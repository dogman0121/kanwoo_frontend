"use client"

import theme from "@/theme";
import { Box, Modal, ModalProps } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SearchInputMobile from "./SearchInputMobile";
import ScrollableBox from "@/components/ScrollableBox";
import SearchListModal from "./SearchListModal";
import SearchProvider from "./SearchProvider";

export default function MobileSearchModal({onClose, ...props}: Omit<ModalProps, "children">) {

    return (
        <SearchProvider emptyQuery={false}>
            <Modal
                {...props}
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
                                p: `${theme.spacing(2)}`,
                                position: "sticky",
                                top: 0,
                                bgcolor: "background.default"
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
                                <ArrowBackRoundedIcon 
                                    onClick={() => onClose?.({}, "escapeKeyDown")}
                                />
                                <SearchInputMobile/>
                            </Box>
                        </Box>
                        
                        <ScrollableBox
                            sx={{
                                flexGrow: 1,
                                overflowY: "auto"
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