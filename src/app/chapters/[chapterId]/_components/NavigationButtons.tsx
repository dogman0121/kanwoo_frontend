import { useAppSelector } from "@/lib/state/hooks";
import { Box, Button, IconButton, IconButtonProps, SvgIcon, useTheme } from "@mui/material";
import ArrowBackIosRounded from "@mui/icons-material/ArrowBackIosRounded"
import ArrowForwardIosRounded from "@mui/icons-material/ArrowForwardIosRounded"
import { useContext, useEffect, useState } from "react";
import NavOpenContext from "../_contexts/navOpenContext";
import { useRouter } from "next/navigation";

export function NavigationButtonsShadow() {
    return (
        <Box
            sx={{
                width: "190px",
                height: "50px",
                mt: "50px",
                mx: "auto"
            }}
        >

        </Box>
    )
}

function NavigationButton({sx, ...props}: IconButtonProps) {
    const theme = useTheme()
    return (
        <IconButton
            disableRipple
            sx={{
                bgcolor: "#121212",
                width: "40px",
                height: "40px",
                p: "25px",

                "&.Mui-disabled": {
                    bgcolor: "#121212"
                },
                ...sx
            }}
            {...props}
        />
    )
}

export default function NavigationButtons() {
    const {open} = useContext(NavOpenContext)

    const router = useRouter()

    const currentChapter = useAppSelector(state => state.chapterPage.currentChapter)

    if (!currentChapter) return

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: "25px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 5,
            
                display: "flex",
                flexDirection: "row",
                gap: "20px",

                opacity: open ? 1 : 0,
                transition: "0.3s"
            }}
        >
            <NavigationButton
                disabled={!currentChapter.prev_chapter_id}
                onClick={() => {
                    router.push(`/chapters/${currentChapter.prev_chapter_id}`)
                }}
            >
                <ArrowBackIosRounded />
            </NavigationButton>
            <NavigationButton
                disabled
                
            >
                <SvgIcon>
                    {/* <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 10H16M8 14H16M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg> */}
                    <svg width="800px" height="800px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <defs>

                    </defs>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Dribbble-Light-Preview" transform="translate(-60.000000, -919.000000)" fill="currentColor">
                                <g id="icons" transform="translate(56.000000, 160.000000)">
                                    <path d="M13.9577278,759 C7.99972784,759 3.26472784,764.127 4.09472784,770.125 C4.62372784,773.947 7.52272784,777.156 11.3197278,778.168 C12.7337278,778.545 14.1937278,778.625 15.6597278,778.372 C16.8837278,778.16 18.1397278,778.255 19.3387278,778.555 L20.7957278,778.919 L20.7957278,778.919 C22.6847278,779.392 24.4007278,777.711 23.9177278,775.859 C23.9177278,775.859 23.6477278,774.823 23.6397278,774.79 C23.3377278,773.63 23.2727278,772.405 23.5847278,771.248 C23.9707278,769.822 24.0357278,768.269 23.6887278,766.66 C22.7707278,762.415 18.8727278,759 13.9577278,759 M13.9577278,761 C17.9097278,761 21.0047278,763.71 21.7337278,767.083 C22.0007278,768.319 21.9737278,769.544 21.6547278,770.726 C20.3047278,775.718 24.2517278,777.722 19.8237278,776.614 C18.3507278,776.246 16.8157278,776.142 15.3187278,776.401 C14.1637278,776.601 12.9937278,776.544 11.8347278,776.236 C8.80772784,775.429 6.49272784,772.863 6.07572784,769.851 C5.40472784,764.997 9.26872784,761 13.9577278,761 L13.9577278,761" id="message-[#1579]">

                    </path>
                                </g>
                            </g>
                        </g>
                    </svg>
                </SvgIcon>
            </NavigationButton>
            <NavigationButton
                disabled={!currentChapter.next_chapter_id}
                onClick={() => {
                    router.push(`/chapters/${currentChapter.next_chapter_id}`)
                }}
            >
                <ArrowForwardIosRounded />
            </NavigationButton>
        </Box>
    )
}