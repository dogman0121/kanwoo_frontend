import PrivacySelect from "@/components/PrivacySelect";
import EditInputCaption from "@/features/edit/components/EditInputCaption";
import EditInputLabel from "@/features/edit/components/EditInputLabel";
import { Box, SelectProps, TextFieldProps } from "@mui/material";

export default function ChapterPrivacy({...props}: SelectProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            <EditInputLabel>Доступ</EditInputLabel>
            <EditInputCaption>Кто может видеть ваш перевод.</EditInputCaption>
            <PrivacySelect 
                sx={{
                    maxWidth: "300px"
                }}
                {...props}
            />
        </Box>
    )
}