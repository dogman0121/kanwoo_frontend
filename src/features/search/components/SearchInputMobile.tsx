"use client"

import { Box, BoxProps, FormControl, InputAdornment, OutlinedInput, styled, Typography } from "@mui/material";
import { useContext } from "react";
import SearchContext from "../context/SearchContext";
import CloseIcon from '@mui/icons-material/Close';

const SearchOutlinedInputMobile = styled(OutlinedInput)(({theme}) => ({
    borderRadius: "20px",
    height: "34.6px",
    padding: `0 ${theme.spacing(2)} 0 ${theme.spacing(3)}`, 
    backgroundColor: theme.palette.background.paper,
    "& input": {
        padding: "6px 0",
        fontSize: "14px"
    }
}));


export default function SearchInputMobile({sx, ...props}: BoxProps) {
    const { query, setQuery } = useContext(SearchContext);

    return (
        <FormControl
            variant="outlined"
            sx={{
                width: "100%",
            }}
        >
            <Box 
                sx={{
                    width: "100%",
                    ...sx
                }}
                {...props}
            >
                <SearchOutlinedInputMobile
                    id="search-input"
                    type="text"
                    fullWidth
                    slotProps={{
                        input: {
                            autoCapitalize:"off",
                            autoComplete:"off",
                            autoCorrect:"off"
                        }
                    }}
                    value={query}
                    autoFocus
                    onInput={(event: React.FormEvent) => {
                        setQuery((event.target as HTMLInputElement).value)
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <CloseIcon 
                                sx={{
                                    width: "20px",
                                    height: "20px",
                                    cursor: "pointer"
                                }}
                                onClick={() => {setQuery("")}}
                            />
                        </InputAdornment>
                    }
                    sx={{
                        
                    }}
                    placeholder="Поиск"
                >

                </SearchOutlinedInputMobile>
            </Box>
        </FormControl>
    )
}