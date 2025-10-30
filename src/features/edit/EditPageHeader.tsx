import { Typography, TypographyProps } from "@mui/material";

const EditPageHeader = (props: TypographyProps) => (
    <Typography
        variant="h1"
        sx={{
            p: "25px 25px 10px"
        }}
        {...props}
    />
)

export default EditPageHeader;