"use client"

import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogProps, 
    DialogTitle, 
    FormControl, 
    FormHelperText, 
    InputLabel, 
    MenuItem,
    Select,  
    styled, 
    TextField, 
    Typography
} from "@mui/material";
import { useState } from "react";
import AppSnackbar from "./AppSnackbar";
import { Controller, useForm } from "react-hook-form";

const MySelect = styled(Select)(() => ({
    borderRadius: "12px"
}))

export interface ReportForm {
    reportType: number,
    comment: string
}

export default function ReportDialog({
    onClose, 
    onSend, 
    ...props
}: Omit<DialogProps, "children"> & {onSend: (value: ReportForm) => Promise<unknown>}) {

    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)

    const [errorSnackbarOpem, setErrorSnackbarOpen] = useState(false)

    const {handleSubmit, control, formState: {errors}} = useForm<ReportForm>({
        mode: "onChange"
    })

    const handleReport = async (formData: ReportForm) => {
        try {
            await onSend(formData)

            setSuccessSnackbarOpen(true)
        
        } catch (_error) {
            setErrorSnackbarOpen(true)
        }
        onClose?.({}, "escapeKeyDown")
    }

    return (
        <>
            <Dialog 
                onClose={onClose}
                {...props}
            >
                <DialogTitle>Жалоба</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(handleReport)} id="report-form">
                        <Controller 
                            control={control}
                            name="reportType"
                            rules={{
                                required: true,
                            }}
                            render={({field}) => (
                                <FormControl 
                                    fullWidth
                                    error={errors.reportType != undefined}
                                    
                                >
                                    <InputLabel id="report-label">Доступ</InputLabel>
                                    <MySelect
                                        labelId="report-label"
                                        required
                                        id="report-select"
                                        fullWidth
                                        label="Доступ"
                                        {...field}
                                    >
                                        <MenuItem value={"1"}>
                                            <Typography>Неверная информация</Typography>
                                        </MenuItem>
                                        <MenuItem value={"2"}>
                                            <Typography>Дубликат</Typography>
                                        </MenuItem>
                                        <MenuItem value={"3"}>
                                            <Typography>Запрещенный контент</Typography>
                                        </MenuItem>
                                    </MySelect>
                                    {errors.reportType && (
                                        <FormHelperText>
                                            Поле не должно быть пустым
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                        <Controller 
                            control={control}
                            name="comment"
                            rules={{
                                required: true
                            }}
                            render={({field}) => (
                                <TextField 
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Комментарий"  
                                    error={errors.comment != undefined}  
                                    helperText={errors.comment ? "Поле не должно быть пустым" : undefined}              
                                    sx={{
                                        mt: "15px"
                                    }}
                                    {...field}
                                />
                            )}
                        />
                    </form>   
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => onClose?.({}, "escapeKeyDown")}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        form="report-form"
                    >
                        Отправить
                    </Button>
                </DialogActions>
            </Dialog>
            <AppSnackbar 
                open={successSnackbarOpen}
                onClose={() => setSuccessSnackbarOpen(false)}
                message={"Жалоба успешно отправлена"}
                variant="success"
            />
            <AppSnackbar 
                open={errorSnackbarOpem}
                onClose={() => setErrorSnackbarOpen(false)}
                message={"При отправке жалобы произошла ошибка"}
                variant="error"
            />
        </>
    )
}