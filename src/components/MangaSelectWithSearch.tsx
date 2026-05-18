"use client"

import Manga from "@/types/manga/manga";
import { Autocomplete, Box, MenuItem, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import Poster from "./Poster";
import { debounce } from "lodash";
import { clientFetch } from "@/lib/fetch/clientFetch";
import theme from "@/theme";

export default function MangaSelectWithSearch({
    value,
    onChange
}: {
    value?: Manga | null,
    onChange?: (value: Manga | null) => void
}) {
    const [options, setOptions] = useState<Manga[]>([])
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const searchManga = useRef(debounce(async(query: string) => {
        setIsLoading(true)

        try {
            const res = await clientFetch.get<Manga[]>(`/search?query=${query}&section=manga`)

            setOptions(res.data);
        } finally {
            setIsLoading(false)
        }
    }, 2000)).current;


    return (
        <Autocomplete 
            aria-required
            freeSolo
            options={options}
            value={value}
            inputValue={query}
            loading={isLoading}
            onInputChange={(_event, value, reason) => {
                searchManga(value)
                setQuery(value)
                
            }}
            onChange={(_event, value) => {
                if (value == null){
                    onChange?.(value)
                }
            }}
            renderValue={(value) => {
                if (value instanceof Object){
                    return (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                columnGap: theme.spacing(2),
                                alignItems: "center"
                            }}
                        >
                            <Poster 
                                width="32px"
                            />
                            <Typography>{value.name}</Typography>
                        </Box>
                    )
                }
            }}
            renderOption={(_props, option, _state, _ownerState) => (
                <MenuItem
                    key={option.slug}
                    value={option.slug}
                    onClick={() => {
                        onChange?.(option)
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            columnGap: theme.spacing(2),
                            alignItems: "center"
                        }}
                    >
                        <Poster 
                            width="40px"
                        />
                        <Typography>{option.name}</Typography>
                    </Box>

                </MenuItem>
            )}
            renderInput={(params) => (<TextField {...params} label="Манга"/>)}
            getOptionLabel={(option) => option instanceof Object ? option.name : option}
        />
    )
}