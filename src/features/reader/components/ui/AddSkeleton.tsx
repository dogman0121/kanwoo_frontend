import { MAX_CHAPTER_WIDTH } from "@/constants/reader";
import { Paper } from "@mui/material";


export default function AddSkeleton() {
    return (
        <Paper 
            elevation={1}
            sx={{
                height: "100px",
                width: "100%",
                mx: "auto"
            }}
        />
    )
}