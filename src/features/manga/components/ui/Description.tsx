"use client"

import { useState, useRef, useEffect } from "react";
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Box, BoxProps, Button, styled, Typography, useTheme } from "@mui/material";

export const DescriptionText = styled(Typography)(({theme}) => ({
    width: "100%",
    fontSize: "16px",
    lineHeight: "1.7",

    overflowWrap: "break-word",
    overflowY: "hidden",
    whiteSpace: "pre-wrap"
}))

export default function Description({description, boxProps}: {description: string, boxProps?: BoxProps}) {
    const [open, setOpen] = useState(false);

    const textRef = useRef<HTMLDivElement | null>(null);

    const [isFullText, setFullText] = useState(false);

    useEffect(() => {
        const lineHeight = parseFloat(window.getComputedStyle(textRef.current as HTMLDivElement).lineHeight);
        const height = parseFloat(window.getComputedStyle(textRef.current as HTMLDivElement).height);

        if (lineHeight * 4 < height){
            setFullText(true);
            (textRef.current as HTMLDivElement).style.maxHeight = lineHeight * 4 + "px";
        }

        return () => {};
    }, [description])

    const handleShow = () => {
        if (open){
            const lineHeight = parseFloat(window.getComputedStyle(textRef.current as HTMLDivElement).lineHeight);
            (textRef.current as HTMLDivElement).style.maxHeight = lineHeight * 4 + "px";
            setOpen(false);
        } else {
            (textRef.current as HTMLDivElement).style.maxHeight = "";
            setOpen(true);
        }
    }

    return (
        <Box
            {...boxProps}
        >
            <DescriptionText
                ref={textRef}
            >
                {description}
            </DescriptionText>
            { isFullText && (
                <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleShow}
                    endIcon={open ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                    sx={{
                        mt: 2
                    }}
                >
                    {open ? "Скрыть" : "Показать"}
                </Button>
                // <Box
                //     sx={{
                //         display: "inline-flex",
                //         padding: `${theme.spacing(0.8)} ${theme.spacing(1.6)}`,
                //         borderRadius: "6px",

                //         alignItems: "center",

                //         backgroundColor: theme.vars?.palette.secondary.main,

                //         marginTop: theme.spacing(2),
                //         lineHeight: "1.5",
                //         fontSize: "14px",
                //         cursor: "pointer"
                //     }} 
                //     onClick={handleShow}
                // >
                //     {open ?
                //         <>
                //             Скрыть
                //             <ExpandLessRoundedIcon />
                //         </>
                //         :
                //         <>
                //             Показать
                //             <ExpandMoreRoundedIcon />
                //         </>
                //     }
                // </Box>
            )}
        </Box>
    )

}