import { Typography } from "@mui/material"

export default function StudioListHeaderLabel({
    label
}: {
    label: string
}) {
    return (
        <Typography variant="caption" color="textSecondary">{label}</Typography>
    )
}