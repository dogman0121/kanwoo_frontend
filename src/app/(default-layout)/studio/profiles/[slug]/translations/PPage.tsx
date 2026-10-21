import EditHeader from "@/components/edit/EditHeader";
import EditHeaderNav from "@/components/edit/EditHeaderNav";
import Poster from "@/components/poster/Poster";
import { Privacy } from "@/components/PrivacySelect";
import { routes, toHref } from "@/constants/routes/main.routes";
import { openSnackbar } from "@/features/global/states/app/slice";
import { studioClientAPI } from "@/features/studio/api/client.api";
import CreateProfileTranslationDialog from "@/features/studio/components/CreateProfileTranslationDialog";
import CreateTranslationDialog from "@/features/studio/components/CreateProfileTranslationDialog";
import StudioList from "@/features/studio/components/List";
import StudioPrivacyStatus from "@/features/studio/components/ui/PrivacyStatus";
import { convertFormToJSON, ProfileTranslationCreateFormSchema } from "@/features/studio/forms/CreateProfileTranslationForm";
import { selectCreateTranslationDialogOpen, selectProfile, setCreateTranslationDialogOpen } from "@/features/studio/states/profile/page.slice";
import { addTranslation, selectTranslations } from "@/features/studio/states/profile/translations.slice";
import { StudioTranslation } from "@/features/studio/types/studio-translation.type";
import { TranslationContext } from "@/features/translations/types";
import { ApiError } from "@/lib/fetch/api-response.types";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Entity } from "@/lib/types/Entity.type";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { Children } from "react";

function TranslationGrid({children}: {children: React.ReactNode}) {
    return (
        <Box
            sx={{
                px: 5,
                py: 1
            }}
        >
            <Grid
                container
                columns={12}
                spacing={3}
                alignItems={"center"}
            >
                {Children.map(children, c => c)}
            </Grid>
        </Box>
    )
}

function TranslationGridRow({translationBlock}: {translationBlock: Entity<StudioTranslation, TranslationContext>}){ 

    return (
        <TranslationGrid>
            <Grid
                size={6}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems :"center",
                        gap: 2
                    }}
                >
                    <Poster 
                        width="80px"
                        src={translationBlock.context?.manga?.poster?.medium}
                    />
                    <Link href={toHref(routes.studio.translations.item, {id: translationBlock.data.id.toString()})}>
                        <Typography
                            variant="h3"
                            sx={{
                                "&:hover": {
                                    textDecoration: "underline"
                                }
                            }}
                        >
                            {translationBlock.data.name}
                        </Typography>
                    </Link>
                </Box>
            </Grid>
            <Grid size={2}>
                <StudioPrivacyStatus privacy={translationBlock.data.privacy.id as Privacy}/>
            </Grid>
            <Grid size={2}>
                <Typography>{translationBlock.data.lang.name}</Typography>
            </Grid>
            <Grid size={2}>
                <Typography>{translationBlock.data.chapters_count}</Typography>
            </Grid>            
        </TranslationGrid>
    )
}

export default function PPage() {
    const dispatch = useAppDispatch()

    const profile = useAppSelector(selectProfile)
    const translations = useAppSelector(selectTranslations)
    const createTranslationDialogOpen = useAppSelector(selectCreateTranslationDialogOpen)
    
    const handleCloseDialog = () => {
        dispatch(setCreateTranslationDialogOpen(false))
    }

    const handleCreateTranslation = async (data: ProfileTranslationCreateFormSchema) => {
        if (!profile) return

        try {
            const formData = convertFormToJSON(data)

            const response = await studioClientAPI.createProfileTranslation(profile.slug, formData)

            dispatch(addTranslation({
                data: response.data,
                context: response.context
            }))
            dispatch(openSnackbar({type: "success", message: "Перевод добавлен успешно"}))
            dispatch(setCreateTranslationDialogOpen(false))
        } catch (e) {
            let errorMessage = "неизвестная ошибка"
            if (e instanceof ApiError) {
                if (e.code == "already_exists") {
                    errorMessage = "перевод уже существует"
                }
            }
            dispatch(openSnackbar({
                type: "error", 
                message: `При добавлении перепода произошла ошибка: ${errorMessage}`
            }))
        }
    }

    return (
        <>
            <EditHeader>Мои переводы</EditHeader>
            <EditHeaderNav 
                buttons={
                    <>
                        <Button
                            variant="contained"
                            onClick={() => dispatch(setCreateTranslationDialogOpen(true))}
                        >
                            Создать
                        </Button>
                    </>
                }
            />
            <TranslationGrid>
                <Grid size={6}>
                    <Typography variant="caption">Название</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography variant="caption">Доступ</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography variant="caption">Язык</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography variant="caption">Кол-во глав</Typography>
                </Grid>
            </TranslationGrid>
            <Divider />
            <StudioList py={4}>
                {translations.map(t => (
                    <TranslationGridRow 
                        key={t.data.id}
                        translationBlock={t}
                    />
                ))}
            </StudioList>
            <CreateProfileTranslationDialog
                open={createTranslationDialogOpen}
                onCreate={handleCreateTranslation}
                onClose={handleCloseDialog}
            />
        </>
    )
}