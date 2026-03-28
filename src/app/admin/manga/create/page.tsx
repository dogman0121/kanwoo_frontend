"use client"

import { EditPageHeader, EditPageNavbar, EditPageTitle } from "@/features/edit/components/EditHeader"
import { Breadcrumbs, Button, Link, Typography, useTheme } from "@mui/material"
import MangaForm, { getFormDefaultValues, MangaFormSchema } from "../_forms/MangaForm"
import { useForm } from "react-hook-form";
import { ROUTES } from "@/routes";
import { clientFetch } from "@/lib/fetch/clientFetch";
import AdminManga from "@/types/admin/manga/manga";
import { useRouter } from "next/navigation";


export default function Page() {
    const theme = useTheme()

    const router = useRouter()

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
        defaultValues: getFormDefaultValues()
    });

    const onSend = async (data: MangaFormSchema) => {
        const formData = new FormData();
                    
        formData.append("slug", data.slug);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("nameTranslations", JSON.stringify(data.nameTranslations));
        formData.append("type", data.type.toString());
        formData.append("status", data.status.toString());
        formData.append("adult", data.adult.toString());
        formData.append("year", data.year.toString())
        formData.append("privacy", data.privacy.toString())

        // setting genres
        for (const genre of data.genres)
            formData.append("genre", genre.toString());
        if (data.poster)
            formData.append("poster", data.poster);
        if (data.background)
            formData.append("background", data.background);
        if (data.promoName)
            formData.append("promoName", data.promoName);
        if (data.promoLogo)
            formData.append("promoLogo", data.promoLogo);
        if (data.promoBackground)
            formData.append("promoBackground", data.promoBackground);

        const response = await clientFetch.post<AdminManga>(`/admin/manga`, {
            body: formData
        })

        router.push(ROUTES.ADMIN.MANGA.MAIN)
    }

    return (
        <>
            <EditPageHeader>
                <Breadcrumbs>
                    <Link href={ROUTES.ADMIN.MANGA.MAIN}>
                        Манга
                    </Link>
                    <Typography>
                        Создание
                    </Typography>
                </Breadcrumbs>
                <EditPageTitle>Создание манги</EditPageTitle>
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
                    onClick={() => reset(getFormDefaultValues())}
                >
                    Отмена
                </Button>
                <Button
                    variant="contained"
                    disabled={!isValid}
                    type="submit"
                    form="manga-info"
                >
                    Сохранить
                </Button>
            </EditPageNavbar>
            <MangaForm 
                control={control}
                handleSubmit={handleSubmit}
                onSend={onSend}
            />
        </>
    )
}