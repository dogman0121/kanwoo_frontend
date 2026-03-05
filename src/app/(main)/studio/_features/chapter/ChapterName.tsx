import EditInput from "@/features/edit/components/EditInput";
import { TextFieldProps } from "@mui/material";

export default function ChapterName({...props}: TextFieldProps) {
    return (
        <EditInput 
            label="Название"
            caption="Показывается рядом с номером главы."
            placeholder="Введите название"
            {...props}
        />
    )
}