import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { ChangeEvent } from "react"

export interface ModerationFilterType {
    approved: boolean,
    rejected: boolean,
    waiting: boolean
}

export default function ModerationFiltersGroup({
    value, onChange
}: {
    value: ModerationFilterType,
    onChange: (value: ModerationFilterType) => void
}) {
    const {rejected, approved, waiting} = value

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...value,
            [event.target.name]: event.target.checked
        })
    }

    return (
        <FormGroup
            sx={{
                display: "flex",
                flexDirection: "row"
            }}
        >
            <FormControlLabel 
                control={
                    <Checkbox checked={approved} size="small" name="approved" onChange={handleChange} />
                } 
                label="Одобрено"
            />
            <FormControlLabel 
                control={<Checkbox checked={rejected} size="small" name="rejected" onChange={handleChange}/>} 
                label="Отклонено"
            />
            <FormControlLabel 
                control={<Checkbox checked={waiting} size="small" name="waiting" onChange={handleChange}/>} 
                label="Ожидает"
            />
        </FormGroup>
    )
}