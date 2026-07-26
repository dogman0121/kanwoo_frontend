import EditInputCaption from "@/features/edit/components/EditInputCaption";
import EditInputLabel from "@/features/edit/components/EditInputLabel";
import EditMultipleFilesInput, { EditFile } from "@/features/edit/components/EditMultipleFilesInput";
import { Box } from "@mui/material";

export default function ChapterPages({
    value,
    onChange
}: {
    value: EditFile[],
    onChange: (value: EditFile[]) => void
}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            <EditInputLabel>Страницы</EditInputLabel>
            <EditInputCaption>То, из чего состоит ваша глава.</EditInputCaption>
            <EditMultipleFilesInput 
                value={value}
                onChange={onChange}
                sx={{
                    mt: "10px"
                }}
            />
        </Box>
    )
}