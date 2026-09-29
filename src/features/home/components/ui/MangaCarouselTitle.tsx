import { Box, Icon, IconButton, Typography } from "@mui/material";
import EastRoundedIcon from "@mui/icons-material/EastRounded"
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded"
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded"
import { Ref, RefObject, useRef } from "react";

type Props = {
    children: string | React.ReactElement,
    prevButtonRef: RefObject<HTMLButtonElement | null>,
    nextButtonRef: RefObject<HTMLButtonElement | null>,
}

export default function MangaCarouselTitle({
    children,
    prevButtonRef,
    nextButtonRef
}: Props) {

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 1
                }}
            >
                <Typography
                    variant="h3"
                >
                    {children}
                </Typography>
                <EastRoundedIcon 
                    sx={{
                        width: "20px",
                        height: "20px"
                    }}
                />
            </Box>

            <Box>
                <IconButton
                    size="small"
                    ref={prevButtonRef}
                >
                    <KeyboardArrowLeftRoundedIcon />
                </IconButton>
                <IconButton
                    size="small"
                    ref={nextButtonRef}
                >
                    <KeyboardArrowRightRoundedIcon />
                </IconButton>
            </Box>
        </Box>
    )
}