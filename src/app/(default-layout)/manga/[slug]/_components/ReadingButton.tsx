import { routes, toHref } from "@/constants/routes/main.routes";
import { selectReadingProgress, selectReadingProgressContext } from "@/lib/state/features/manga-page/progress/slice";
import { useAppSelector } from "@/lib/state/hooks";
import { Button, ButtonProps, styled } from "@mui/material";
import { useRouter } from "next/navigation";

const MyButton = styled(Button)(({theme}) => ({
    padding: `5px 50px`,
    fontSize: "16px"
}))

export default function ReadingButton({...props}: ButtonProps) {
    const readingProgress = useAppSelector(selectReadingProgress)

    const readingProgressContext = useAppSelector(selectReadingProgressContext)

    const router = useRouter()

    const handleClick = () => {
        const chapter = readingProgressContext?.chapter
        
        if (!chapter)
            throw new Error("Failed to fetch chapter from reading progress context")

        router.push(toHref(routes.chapters.item, {id: chapter.id.toString()}))
    }

    if (!readingProgress)
        return (
            <MyButton variant="contained" color="primary" disabled {...props}>
                Глав нет
            </MyButton>
        )

    if (readingProgress.status == "not_started" || readingProgress.status == "finished")
        return (
            <MyButton onClick={handleClick} {...props}>
                Читать
            </MyButton>
        )

    return (
        <MyButton variant="contained" onClick={handleClick} {...props}>
            Продолжить читать
        </MyButton>
    )
}