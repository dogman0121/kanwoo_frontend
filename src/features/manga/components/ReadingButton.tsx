import { routes, toHref } from "@/constants/routes/main.routes";
import { loadProgress, selectReadingProgress, selectReadingProgressContext } from "@/features/manga/states/manga-page/progress/slice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Button, ButtonProps, styled, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { selectManga } from "../states/manga-page/page/slice";
import { selectDeviceType } from "@/features/global/states/app/slice";

function MyButton({
    label,
    caption,
    disabled,
    loading,
    onClick
}: {
    label: string,
    caption?: string,
    disabled?: boolean,
    loading?: boolean,
    onClick?: () => void
}) {
    const deviceType = useAppSelector(selectDeviceType)
    
    return (
        <>
            {deviceType == "desktop" && (
                <Button
                    variant="contained"
                    disabled={disabled}
                    loading={loading}
                    onClick={onClick}
                    sx={{
                        px: 5,
                        py: 2,

                        display: "flex",
                        flexDirection: 'column'
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: "14px"
                        }}
                    >
                        {label}
                    </Typography>
                    {caption && (
                        <Typography variant="caption">
                            {caption}
                        </Typography>
                    )}
                </Button>
            )}
            {deviceType != "desktop" && (
                <Button
                    fullWidth
                    variant="contained"
                    disabled={disabled}
                    loading={loading}
                    onClick={onClick}
                    sx={{
                        py: 2,
                        fontWeight: 600,

                        display: "flex",
                        flexDirection: 'column'
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 600,
                        }}
                    >
                        {label}
                    </Typography>
                    {caption && (
                        <Typography variant="caption">
                            {caption}
                        </Typography>
                    )}
                </Button>
            )}
        </>
    )
}

export default function ReadingButton({...props}: ButtonProps) {

    const router = useRouter()
    const dispatch = useAppDispatch()

    const [progressLoading, setProgressLoading] = useTransition()
    const manga = useAppSelector(selectManga)

    useEffect(() => {
        if (!manga) return

        setProgressLoading(async() => {
            await dispatch(loadProgress(manga.data.slug))
        })
    }, [manga])

    const progress = useAppSelector(selectReadingProgress)


    const handleClick = () => {
        const chapter = progress?.chapter
        
        if (!chapter)
            throw new Error("Failed to fetch chapter from reading progress context")

        router.push(toHref(routes.chapters.item, {id: chapter.id.toString()}))
    }

    if (!progress && !progressLoading)
        return (
            <MyButton 
                disabled 
                label={"Нет глав"}
            />
        )

    if (progress && (progress.status == "not_started" || progress.status == "finished"))
        return (
            <MyButton 
                label={"Читать"}
                onClick={handleClick} 
            />
        )

    return (
        <MyButton 
            label={"Продолжить чтение"}
            caption={`${progress?.chapter?.chapter} глава`}
            onClick={handleClick} 
            loading={progressLoading}
        />
    )
}