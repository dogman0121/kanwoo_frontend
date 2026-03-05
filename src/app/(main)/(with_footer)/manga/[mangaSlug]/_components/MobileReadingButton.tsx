"use client"

import { useAppSelector } from "@/lib/state/hooks";
import { Button, ButtonProps, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Children } from "react";

function ReadingButton({children, sx, ...props}: ButtonProps) {
    return (
        <Button
            fullWidth
            variant="contained"
            sx={{
                p: "5px 50px",
                fontSize: "16px",
                ...sx
            }}

            {...props}
        >
            {Children.map(children, c => c)}
        </Button>
    )
}

export default function MobileReadingButton(){
    const router = useRouter()

    const readingProgress = useAppSelector(state => state.mangaPage.readingProgress)

    const manga = useAppSelector(state => state.mangaPage.manga)

    const translations = useAppSelector(state => state.mangaPage.translations)

    if (!translations || translations?.length == 0)
        return (
            <ReadingButton
                disabled
            >
                Нет глав
            </ReadingButton>
        )

    return (
        <>
            {readingProgress ? 
                <ReadingButton
                    onClick={() => router.push(`/chapters/${readingProgress.chapter.id}`)}
                    sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Typography color="#000" fontWeight={600}>
                        Продолжить
                    </Typography>
                    <Typography color="#000" fontSize={"13px"}>
                        Глава {readingProgress.chapter.chapter}
                    </Typography>
                </ReadingButton>
                :
                <ReadingButton
                    onClick={() => router.push(`/manga/${manga?.slug}/startReading`)}
                    sx={{
                        color: "#000"
                    }}
                >
                    Читать
                </ReadingButton>
            }
        </>
    )
}