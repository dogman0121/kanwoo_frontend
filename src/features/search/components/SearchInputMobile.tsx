"use client"

import { Box, BoxProps, FormControl, FormControlProps, InputAdornment, OutlinedInput, OutlinedInputProps, styled } from "@mui/material";
import { useContext } from "react";
import SearchContext from "../context/SearchContext";
import CloseIcon from '@mui/icons-material/Close';

const SearchOutlinedInputMobile = styled(OutlinedInput)(({theme}) => ({
    borderRadius: "20px",
    height: "34.6px",
    padding: `0 ${theme.spacing(2)} 0 ${theme.spacing(3)}`, 
    "& input": {
        padding: "6px 0",
        fontSize: "14px"
    }
}));

export interface SearchInputMobileProps {
    slotProps?: {
        formControl?: FormControlProps,
        box?: BoxProps,
        input?: OutlinedInputProps
    }
}


export default function SearchInputMobile({slotProps: {formControl, box, input} = {}}: SearchInputMobileProps) {
    const { query, setQuery } = useContext(SearchContext);

    return (
        <FormControl
            variant="outlined"
            fullWidth
            {...formControl}
        >
            <Box 
                sx={{
                    width: "100%",
                }}
                {...box}
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
                    placeholder="Поиск"
                    {...input}
                />
            </Box>
        </FormControl>
    )
}