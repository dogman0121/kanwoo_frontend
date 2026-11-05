"use client"

import { Autocomplete, Box, CircularProgress, MenuItem, SxProps, TextField, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import Poster from "../features/manga/components/ui/Poster";
import { debounce } from "lodash";
import { clientFetch } from "@/lib/fetch/client-fetch.util";
import theme from "@/constants/themes/main.theme";
import { Manga, MangaShort } from "@/types/manga";

export default function MangaSelectWithSearch({
    value = null,
    onChange,
    sx
}: {
    value?: MangaShort | null,
    onChange?: (value: MangaShort | null) => void,
    sx?: SxProps
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
            sx={{...sx}}
            isOptionEqualToValue={(option, value) => option.slug == (value as MangaShort).slug}
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
                if (typeof value == "string")
                    return

                setInnerValue(value)
                onChange?.(value)
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
                                width="24px"
                                src={value.poster?.thumbnail}
                            />
                            <Typography>{value.name}</Typography>
                        </Box>
                    )
                }
                
            }}
            renderOption={(props, option) => {
                // key нужно вынести отдельно, чтобы избежать предупреждения React
                const { key, ...otherProps } = props;

                return (
                    <Box
                        component="li"
                        key={key}
                        {...otherProps}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            columnGap: theme.spacing(2),
                            alignItems: "center",
                        }}
                    >
                        <Poster
                            width="40px"
                            src={option.poster?.thumbnail}
                        />
                        <Typography>{option.name}</Typography>
                    </Box>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Тайтл"
                    slotProps={{
                        ...params.slotProps,
                        htmlInput: {
                        ...params.slotProps.htmlInput,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                        },
                    }}
                />      
            )}
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