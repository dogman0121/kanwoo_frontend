import { Controller, useForm, UseFormReturn } from "react-hook-form"
import { Box, Checkbox, Grid } from "@mui/material"
import PrivacySelect, { Privacy } from "@/components/PrivacySelect"
import EditInput from "@/components/edit/Input"
import EditLabel from "@/components/edit/Label"
import EditCaption from "@/components/edit/Caption"
import EditMultipleFilesInput, { EditFile } from "@/components/edit/MultipleFilesInput"
import { Chapter } from "@/types/chapter"
import { useEffect } from "react"
import { v4 } from "uuid"

export function convertDataIntoForm(chapter?: Chapter | null) {
    return {
        name: chapter?.name || "",
        chapter: chapter?.chapter || 1,
        isExtra: chapter?.extra_number ? true : false,
        extraNumber: chapter?.extra_number || 1,
        privacy: chapter?.privacy.id || 1,
        pages: chapter?.pages?.map(p => ({
            previewLink: p.link, 
            name: p.orig_filename, 
            uuid: p.uuid
        } as EditFile)) || []
    }
}

export interface ChapterUpdateFormSchema {
    name: string,
    chapter: number,
    isExtra: boolean,
    extraNumber: number,
    pages: EditFile[],
    privacy: number
}

export function useUpdateChapterInfoForm(chapter?: Chapter | null) {
    const {reset, ...props} = useForm<ChapterUpdateFormSchema>({
        mode: "onChange",
        defaultValues: convertDataIntoForm(chapter)
    });

    useEffect(() => {
        if (chapter)
            reset(convertDataIntoForm(chapter))
    }, [chapter])

    return {
        reset,
        ...props
    }
}

export default function UpdateChapterInfoForm({
    onUpdate,
    control,
    watch,
    setValue,
    handleSubmit,
}: {
    onUpdate?: (data: ChapterUpdateFormSchema) => void
} & UseFormReturn<ChapterUpdateFormSchema>) {

    const onSubmit = async (data: ChapterUpdateFormSchema) => {
        onUpdate?.(data)
    }

    return (
        <>
            <form id="chapter-info" onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: 3
                    }}
                >
                    <Controller 
                        control={control}
                        name="name"
                        render={({field: {value, ...props}, fieldState: {invalid, error}}) => (
                            <EditInput
                                label="Название главы"
                                caption="Если название не указано, в списке глав будет отображаться 'Нет названия'. "
                                inputProps={{
                                    placeholder: "Введите название",
                                    value: value,
                                    error: invalid,
                                    helperText: error?.message,
                                    ...props
                                }}
                            />
                        )}
                    />
                    <Controller 
                        control={control}
                        name="chapter"
                        render={({field}) => (
                            <EditInput
                                label="Номер главы"
                                caption="Используется при сортировке глав. Порядковый номер главы."
                                inputProps={{
                                    placeholder: "Введите номер",
                                    type: "number",
                                    ...field
                                }}
                            />
                        )}
                    />
                    <Controller 
                        control={control}
                        name="privacy"
                        defaultValue={Privacy.PRIVATE}
                        render={({field}) => (
                            <PrivacySelect 
                                sx={{
                                    maxWidth: "400px"
                                }}
                                {...field}
                            />
                        )}
                    />

                    <Box>
                        <EditLabel>Дополнительная глава</EditLabel>
                        <EditCaption>
                            Данный раздел позволяет создать главу с уже существующим номером. 
                            Будет считаться за доп главу с соответвующим модификатором
                        </EditCaption>
                        <Box
                            sx={{
                                mt: 2,
                                display: "flex",
                                flexDirection: "row",
                                gap: 2
                            }}
                        >
                            <Controller 
                                control={control}
                                name="isExtra"
                                render={({field}) => (
                                    <Checkbox
                                        {...field}
                                    />
                                )}
                            />
                            <Controller 
                                control={control}
                                name="extraNumber"
                                render={({field}) => (
                                    <EditInput
                                        inputProps={{
                                            placeholder: "Экстра номер",
                                            disabled: !watch("isExtra"),
                                            type: "number",
                                            ...field
                                        }}
                                    />
                                )}
                            />
                        </Box>
                    </Box>
                    <Controller 
                        control={control}
                        name="pages"
                        render={({field: {value}}) => (
                            <Box>
                                <EditLabel>Страницы</EditLabel>
                                <EditCaption>Страницы главы</EditCaption>
                                <EditMultipleFilesInput 
                                    value={value}
                                    onChange={(value: EditFile[]) => {setValue("pages", value, {shouldDirty: true})}}
                                />
                            </Box>
                        )}
                    />
                </Box>
            </form>
        </>
    )
}