"use client"

import { notFound, useParams } from "next/navigation"
import { useForm } from "react-hook-form";
import MangaForm, { getFormData, MangaFormSchema } from "../_forms/MangaForm";
import { clientFetch } from "@/lib/fetch/clientFetch";
import AdminManga from "@/types/admin/manga/manga";
import { EditPageHeader, EditPageNavbar, EditPageTitle } from "@/features/edit/components/EditHeader";
import { Breadcrumbs, Button, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { ROUTES } from "@/routes";
import { useEffect, useState } from "react";
import { getDefaultValues } from "@/features/form/manga/Create";
import FileAction from "@/types/fileAction";
import compileFileAction from "@/utils/compileFileAction";

function compileFormIntoFormData(data: MangaFormSchema) {
    const formData = new FormData();
    
    const posterAction: FileAction = compileFileAction(data.poster);
    const backgroundAction: FileAction = compileFileAction(data.background);
    const promoNameAction: FileAction = compileFileAction(data.promoName);
    const promoLogoAction: FileAction = compileFileAction(data.promoLogo);
    const promoBackgroundAction: FileAction = compileFileAction(data.promoBackground);
        
    formData.append("slug", data.slug);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("name_translations", JSON.stringify(data.nameTranslations));
    formData.append("type", data.type.toString());
    formData.append("status", data.status.toString());
    formData.append("adult", data.adult.toString());
    formData.append("year", data.year.toString())
    formData.append("poster_action", posterAction);
    formData.append("background_action", backgroundAction);
    formData.append("promo_name_action", promoNameAction);
    formData.append("promo_logo_action", promoLogoAction);
    formData.append("promo_background_action", promoBackgroundAction);
    formData.append("privacy", data.privacy.toString())

    // setting genres
    data.genres.forEach((genre) => formData.append("genre", genre.toString()))

    if (data.poster && posterAction == "update")
        formData.append("poster", data.poster);
    
    if (data.background && backgroundAction == "update")
        formData.append("background", data.background);
    
    if (data.promoName && promoNameAction == "update")
        formData.append("promo_name", data.promoName);
    
    if (data.promoLogo && promoLogoAction == "update")
        formData.append("promo_logo", data.promoLogo);
    
    if (data.promoBackground && promoBackgroundAction == "update")
        formData.append("promo_background", data.promoBackground);

    return formData
}

export default function Page() {
    const theme = useTheme()

    const { mangaSlug } = useParams()

    const [manga, setManga] = useState<AdminManga | null>(null)

    const { 
        reset,
        formState: {
            isValid,
            isDirty
        },
        handleSubmit,
        control,
    } = useForm<MangaFormSchema>({
        mode: "onChange",
        defaultValues: getDefaultValues()
    });

    useEffect(() => {
        clientFetch.get<AdminManga>(`/admin/manga/${mangaSlug}`)
            .then(resp => {
                if (!resp.data) return notFound()
                
                reset(getFormData(resp.data))
                setManga(resp.data)
            })
    }, [])

    useEffect(() => {
        if (!manga) return;
        
        reset(getFormData(manga))
    }, [manga])

    const handleSend = async(data: MangaFormSchema) => {
        const formData = compileFormIntoFormData(data)

        const {data: updatedManga} = await clientFetch.post<AdminManga>(
            `/admin/manga/${mangaSlug}/update`,
            {
                body: formData
            }
        ) 

        reset(getFormData(updatedManga))
    }

    if (!manga) return;
    
    return (
        <>
            <EditPageHeader>
                <Breadcrumbs>
                    <Link href={ROUTES.ADMIN.MANGA.MAIN}>
                        Манга
                    </Link>
                    <Typography>
                        {manga.name}
                    </Typography>
                </Breadcrumbs>
                <EditPageTitle>Редактирование манги</EditPageTitle>
            </EditPageHeader>
            <EditPageNavbar
                sticky
                sx={{
                    gap: theme.spacing(2)
                }}
            >
                <Button
                    variant="outlined"
                    disabled={!isDirty}
                    onClick={() => reset(getFormData(manga))}
                >
                    Отмена
                </Button>
                <Button
                    variant="contained"
                    disabled={!isDirty || !isValid}
                    type="submit"
                    form="manga-info"
                >
                    Сохранить
                </Button>
            </EditPageNavbar>
            <MangaForm 
                onSend={handleSend}
                control={control}
                handleSubmit={handleSubmit}
                manga={manga}
            />
        </>
    )
}