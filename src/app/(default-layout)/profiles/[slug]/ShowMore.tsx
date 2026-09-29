import { Typography } from "@mui/material";

export default function ShowMore(){
    return (
        <Typography
            variant="caption"
            color="primary"
            sx={{
                cursor: "pointer",
                "&:hover": {
                    textDecoration: "underline"
                }
            }}
        >
            показать еще
        </Typography>
    )
}