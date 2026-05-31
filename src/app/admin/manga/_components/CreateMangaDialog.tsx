import { clientFetch } from "@/lib/fetch/clientFetch";
import { ROUTES } from "@/routes";
import AdminManga from "@/types/admin/manga/manga";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import MangaForm, { getFormDefaultValues, MangaFormSchema } from "../_forms/MangaForm";
import { useState } from "react";
import AppSnackbar from "@/components/AppSnackbar";

export default function CreateMangaDialog({onClose, sx, ...props}: DialogProps) {

    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)
    
    const { 
        formState: {
            isValid,
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
            formData.append("promo_name", data.promoName);
        if (data.promoLogo)
            formData.append("promo_logo", data.promoLogo);
        if (data.promoBackground)
            formData.append("promo_background", data.promoBackground);


        try {
            await clientFetch.post<AdminManga>(`/admin/manga`, {
                body: formData
            })

            setSuccessSnackbarOpen(true)
            onClose?.({}, "backdropClick")
        } catch (e) {
            setErrorSnackbarOpen(true)
            throw e
        }
    }

    return (
        <>
            <Dialog 
                {...props}
                sx={{
                    "&  .MuiDialog-paper": {
                        maxWidth: "800px",
                        width: "100%",
                        height: "80%",   
                    },
                    ...sx
                }}
            >
                <DialogTitle>Создание манги</DialogTitle>
                <DialogContent>
                    <MangaForm
                        control={control}
                        handleSubmit={handleSubmit}
                        onSend={onSend}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => onClose?.({}, "backdropClick")}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        form="manga-info"
                        disabled={!isValid}
                    >
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
            <AppSnackbar 
                variant="success"
                open={successSnackbarOpen}
                onClose={() => setSuccessSnackbarOpen(false)}
                message="Манга успешно добавлена"
            />
            <AppSnackbar 
                variant="error"
                open={errorSnackbarOpen}
                onClose={() => setErrorSnackbarOpen(false)}
                message="При добавлении манги произошла ошибка"
            />
        </> 
    )
}