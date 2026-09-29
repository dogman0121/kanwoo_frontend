"use client"

import { FormControl, FormControlProps, InputAdornment, OutlinedInput, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from "react";
import SearchContext from "../context/SearchContext";

const SearchOutlinedInputPC = styled(OutlinedInput)(({theme}) => ({
    borderRadius: "30px",
    padding: `0 ${theme.spacing(3)}`, 
    "& input": {
        padding: "10px 0",
        lineHeight: "20px",
        height: "auto",
        fontSize: "16px"
    }
}));

export default function SearchInputDesktop({sx, ...props}: FormControlProps) {
    const { query, setQuery } = useContext(SearchContext);

    return (
        <FormControl
            variant="outlined"
            {...props}
        >
            <SearchOutlinedInputPC
                id="search-input"
                value={query}
                autoFocus
                fullWidth
                onInput={(event: React.FormEvent) => {
                    setQuery((event.target as HTMLInputElement).value)
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon sx={{
                            width: "32px",
                            height: "32px"
                        }} />
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <CloseIcon 
                            sx={{
                                cursor: "pointer"
                            }}
                            onClick={() => {setQuery("")}}
                        />
                    </InputAdornment>
                }
                sx={{
                    ...sx
                }}
                placeholder="Введите запрос"
            />
        </FormControl>
    )
}
