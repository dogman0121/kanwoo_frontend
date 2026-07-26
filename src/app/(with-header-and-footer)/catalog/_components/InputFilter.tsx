"use client"

import useSearch from "@/features/search/hooks/useSearch";
import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function InputFilter({label, name, sx, ...props}: TextFieldProps) {
    const [value, setValue] = useState<string | number | null>("");

    const { filters, setFilters } = useSearch()

    useEffect(() => {
        if (!name) return

        setValue(filters.get(name)?.[0] || "")
    }, [filters])

    return (
        <Box>
            <Typography>{label}</Typography>
            <TextField
                sx={{
                    
                    "& input": {
                        padding: "10px 14px"
                    },
                    ...sx
                }} 
                placeholder="Введите значение"
                value={value}
                onChange={(event) => {
                    const val = event.target.value;

                    const newFilters = filters;
                    setValue(val)
                    if (name)
                        newFilters.set(name, [val])

                    setFilters(newFilters)

                }}
                {...props}
            />
        </Box>
    )
}