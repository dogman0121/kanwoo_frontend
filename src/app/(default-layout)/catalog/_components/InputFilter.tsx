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
        <Box
            sx={{
                width: "100%"
            }}
        >
            {label && (
                <Typography variant="caption" mb={1}>{label}</Typography>
            )}
            <TextField
                sx={{
                    "& input": {
                        padding: "10px 14px"
                    },
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 3
                    },
                    ...sx
                }} 
                placeholder="Введите значение"
                value={value}
                onChange={(event) => {
                    const val = event.target.value;

                    const newFilters = filters;

                    if (name)
                        newFilters.set(name, [ val ])
                    setFilters(newFilters)
                    setValue(val)
                }}
                {...props}
            />
        </Box>
    )
}