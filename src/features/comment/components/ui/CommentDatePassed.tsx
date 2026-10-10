import { Typography } from "@mui/material"
import getPassedDateString from "../../lib/getPassedDateString"

export default function CommentDatePassed({
    date
}: {
    date: string
}) {
    return (
        <Typography variant="caption" color="textSecondary" ml={1}>
            {getPassedDateString(date)}
        </Typography>
    )
}