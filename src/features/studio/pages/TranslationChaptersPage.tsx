import EditHeader from "@/components/edit/EditHeader";
import EditHeaderNav from "@/components/edit/EditHeaderNav";
import CreateChapterDialog from "@/features/studio/components/CreateChapterDialog";
import { createChapter, selectCreateChapterDialogOpen, selectTranslation, setCreateChapterDialogOpen } from "@/features/studio/states/translation/page.slice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Button, Divider, Grid, GridProps, Typography } from "@mui/material";
import { useEffect } from "react";
import StudioList from "../components/List";
import StudioListHeaderLabel from "../components/ui/ListHeaderLabel";
import { sum } from "lodash";
import EditPageContainer from "@/components/edit/EditPageContainer";
import { StudioChapter } from "../types/studio-chapter.type";
import StudioPrivacyStatus from "../components/ui/PrivacyStatus";
import { fetchChapters, selectChapters } from "../states/translation/chapters.slice";
import { Entity } from "@/lib/types/Entity.type";
import { routes, toHref } from "@/constants/routes/main.routes";
import Link from "next/link";

const gridSizes: number[]  = [
    3,
    1,
    1,
    1,
    1
]

function ChapterListGrid({sx, ...props}: GridProps) {
    return (
        <EditPageContainer>
            <Grid 
                columns={sum(gridSizes)}
                spacing={2}
                container
                sx={{
                    alignItems: "center",
                    ...sx
                }}
                {...props}
            />
        </EditPageContainer>
    )
}

function ChapterListHeader() {
    return (
        <ChapterListGrid
            sx={{
                my: 1
            }}
        >
            <Grid size={gridSizes[0]}>
                <StudioListHeaderLabel label="Название"/>
            </Grid>
            <Grid size={gridSizes[1]}>
                <StudioListHeaderLabel label="Экстра"/>
            </Grid>
            <Grid size={gridSizes[2]}>
                <StudioListHeaderLabel label="Доступ"/>
            </Grid>
            <Grid size={gridSizes[3]}>
                <StudioListHeaderLabel label="Просмотры"/>
            </Grid>
            <Grid size={gridSizes[4]}>
                <StudioListHeaderLabel label="Комментарии"/>
            </Grid>
        </ChapterListGrid>
    )
}

function ChapterListRow({chapterEntity}: {chapterEntity: Entity<StudioChapter>}) {
    const chapter = chapterEntity.data

    return (
        <ChapterListGrid>
            <Grid size={gridSizes[0]}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4
                    }}
                >
                    <Typography
                        sx={{
                            fontStyle: "italic",
                            fontSize: "24px",
                            fontWeight: "600"
                        }}
                    >
                        {chapter.chapter}
                    </Typography>
                    <Link href={toHref(routes.studio.chapters.item, {id: chapter.id.toString()})}>
                        <Typography
                            sx={{
                                "&:hover": {
                                    textDecoration: "underline"
                                }
                            }}
                        >
                            {chapter.name || "Нет названия"}
                        </Typography>
                    </Link>
                </Box>
            </Grid>
            <Grid size={gridSizes[1]}>
                <Typography>{chapter.extra_number || "нет"}</Typography>
            </Grid>
            <Grid size={gridSizes[2]}>
                <StudioPrivacyStatus privacy={chapter.privacy.id}/>
            </Grid>
            <Grid size={gridSizes[3]}>
                в разработке
            </Grid>
            <Grid size={gridSizes[4]}>
                в разработке
            </Grid>
        </ChapterListGrid>
    )
}

export default function TranslationChaptersPage() {
    const dispatch = useAppDispatch()

    const translation = useAppSelector(selectTranslation)
    const chapters = useAppSelector(selectChapters)
    const createChapterDialogOpen = useAppSelector(selectCreateChapterDialogOpen)

    useEffect(() => {
        if (translation) {
            dispatch(fetchChapters(translation.id))
        }
    }, [translation])

    if (!translation) return

    return (
        <>
            <EditHeader>Главы</EditHeader>
            <EditHeaderNav 
                buttons={
                    <>
                        <Button
                            variant="contained"
                            onClick={() => dispatch(setCreateChapterDialogOpen(true))}
                        >
                            Создать
                        </Button>
                    </>
                }
            />
            <ChapterListHeader />
            <Divider />
            <StudioList>
                {chapters.map(c => (
                    <ChapterListRow key={c.data.id} chapterEntity={c}/>
                ))}
            </StudioList>
            <CreateChapterDialog 
                open={createChapterDialogOpen}
                onClose={() => dispatch(setCreateChapterDialogOpen(false))}
                onCreate={(data) => dispatch(createChapter({
                    translationId: translation.id, form: data
                }))}
            />
        </>
    )
}