import { Status, Type } from "@/types/manga/manga";
import { Breadcrumbs, styled, Typography } from "@mui/material";

const BreadCrumbsText = styled(Typography)({
    lineHeight: "1.2"
})

export default function Metadata({
    type,
    year,
    status
}: {
    type: Type,
    year: number,
    status: Status
}) {
    return (
        <Breadcrumbs>
            <BreadCrumbsText sx={{lineHeight: "1.2"}}>{type.name}</BreadCrumbsText>
            <BreadCrumbsText sx={{lineHeight: "1.2"}}>{year}</BreadCrumbsText>
            <BreadCrumbsText sx={{lineHeight: "1.2"}}>{status.name}</BreadCrumbsText>
        </Breadcrumbs>
    )
}