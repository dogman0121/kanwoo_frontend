"use client"

import { Autocomplete, Box, CircularProgress, MenuItem, TextField, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import Poster from "./poster/Poster";
import { debounce } from "lodash";
import { clientFetch } from "@/lib/fetch/client-fetch.util";
import theme from "@/constants/themes/main.theme";
import { Manga, MangaShort } from "@/types/manga";
import { setDrawerOpen } from "@/lib/state/features/studio-page/studio-page.slice";

export default function MangaSelectWithSearch({
    value = null,
    onChange
}: {
    value?: MangaShort | null,
    onChange?: (value: MangaShort | null) => void
}) {
    const [innerValue, setInnerValue] = useState<MangaShort | null>(value)

    const [options, setOptions] = useState<MangaShort[]>([])
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const searchManga = useCallback(debounce(async(query: string) => {
        setIsLoading(true)

        try {
            const res = await clientFetch.get<Manga[]>(`/search?query=${query}&section=manga`)

            setOptions(res.data);
        } finally {
            setIsLoading(false)
        }
    }, 500), [])


    return (
        <Autocomplete 
            aria-required
            freeSolo
            options={options}
            value={innerValue}
            inputValue={query}
            loading={isLoading}
            isOptionEqualToValue={(option, value) => option.slug == value.slug}
            onInputChange={(_event, value) => {
                const query = value;
                if (query != "") {
                    setIsLoading(true)
                    searchManga(value)
                } else {
                    setOptions([])
                }
                setQuery(value)
            }}
            onChange={(_event, value) => {
                if (value == null){
                    setInnerValue(value)
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
                                src={value.poster.thumbnail}
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
                        setInnerValue(option)
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
                            src={option.poster.thumbnail}
                        />
                        <Typography>{option.name}</Typography>
                    </Box>

                </MenuItem>
            )}
            renderInput={(params) => (<TextField {...params} label="Манга"/>)}
            getOptionLabel={(option) => option instanceof Object ? option.name : option}
            noOptionsText={
                <Typography 
                    sx={{
                        textAlign: "center"
                    }}
                >
                    По вашему запросу ничего не найдено.
                </Typography>
            }
            loadingText={
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <CircularProgress
                        size={24}
                    />
                </Box>
            }
        />
    )
}