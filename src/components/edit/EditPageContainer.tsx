import { Box, styled } from "@mui/material";

const EditPageContainer = styled(Box)(({theme}) => ({
    maxWidth: theme.breakpoints.values.lg,
    padding: "10px 25px"
}))

export default EditPageContainer;