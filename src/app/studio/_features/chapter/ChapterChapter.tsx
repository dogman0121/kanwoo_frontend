import EditInput from "@/features/edit/components/EditInput";
import { TextFieldProps } from "@mui/material";

export default function ChapterChapter({...props}: TextFieldProps) {
    return (
        <EditInput 
            label="Номер главы"
            caption="Идентификатор главы. В переводе не должно быть двух одинаковых номеров."
            type="number"
            sx={{
                maxWidth: "300px"
            }}
            {...props}
        />
    )
}