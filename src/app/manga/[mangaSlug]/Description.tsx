"use client"

import { useState, useRef, useEffect } from "react";
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Box, useTheme } from "@mui/material";
import { useAppSelector } from "@/lib/state/hooks";

export default function Description() {
    const description = useAppSelector(state => state.manga.manga?.description)

    const [open, setOpen] = useState(false);

    const theme = useTheme();

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
    }, [])

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
        <Box>
            <Box 
                sx={{
                    lineHeight: 1.5,
                    width: "100%",
                    overflowWrap: "break-word",
                    overflowY: "hidden",
                    fontSize: "16px",
                    whiteSpace: "pre-wrap"
                }}
                ref={textRef}
            >
                {description}
            </Box>
            { isFullText && (
                <Box
                    sx={{
                        display: "inline-flex",
                        padding: `${theme.spacing(0.8)} ${theme.spacing(1.6)}`,
                        borderRadius: "6px",

                        alignItems: "center",

                        backgroundColor: theme.vars?.palette.secondary.main,

                        marginTop: theme.spacing(2),
                        lineHeight: "1.5",
                        fontSize: "14px",
                        cursor: "pointer"
                    }} 
                    onClick={handleShow}
                >
                    {open ?
                        <>
                            Скрыть
                            <ExpandLessRoundedIcon />
                        </>
                        :
                        <>
                            Показать
                            <ExpandMoreRoundedIcon />
                        </>
                    }
                </Box>
            )}
        </Box>
    )

}