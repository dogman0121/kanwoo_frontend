import Poster from "@/components/Poster";
import ProfileReadingProgress from "@/types/profile/profileReadingProgress";
import { Box, Button, Icon, IconButton, Typography, useTheme } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes";

export default function MobileReadingProgress({
    progress,
    onDelete
}: {
    progress: ProfileReadingProgress,
    onDelete: () => void

}) {
    const theme = useTheme()

    const router = useRouter()

    return (
        <Box 
            sx={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
            }}
        >
            <Button
                disableRipple
                variant="text"
                onClick={() => {
                    router.push(ROUTES.CHAPTER(progress.chapter.id))
                }}
                sx={{
                    p: "0",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Poster 
                    src={progress.manga.poster.medium}
                    style={{
                        borderRadius: "0"
                    }}
                />
                <Typography
                    sx={{
                        fontWeight: 600,
                        textAlign: "center",
                        py: theme.spacing(2),
                        bgcolor: "background.paper",
                        width: "100%"
                    }}
                >
                    {progress.chapter.chapter} глава
                </Typography>
            </Button>
            <IconButton
                disableRipple
                onClick={onDelete}
                sx={{
                    bgcolor: "background.paper",
                    p: "5px",
                    borderRadius: "50%",
                    position: "absolute",
                    right: theme.spacing(1),
                    top: theme.spacing(1)
                }}
            >
                <DeleteRoundedIcon 
                    sx={{
                        width: "20px",
                        height: "20px",
                    }}
                />
            </IconButton>
        </Box>
    )
}