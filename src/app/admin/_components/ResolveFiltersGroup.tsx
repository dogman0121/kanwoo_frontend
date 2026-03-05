import { useAppSelector } from "@/lib/state/hooks";
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"

export interface ResolveFilterType {
    unresolved: boolean,
    resolved: boolean,
}

export default function ResolveFiltersGroup({
    value, onChange
}: {
    value: ResolveFilterType,
    onChange: (value: ResolveFilterType) => void
}) {
    const {unresolved, resolved} = value

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
                    <Checkbox checked={unresolved} size="small" name="unresolved" onChange={handleChange} />
                } 
                label="Ожидает"
            />
            <FormControlLabel 
                control={<Checkbox checked={resolved} size="small" name="resolved" onChange={handleChange}/>} 
                label="Обработано"
            />
        </FormGroup>
    )
}