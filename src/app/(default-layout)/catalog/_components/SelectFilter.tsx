import useSearch from "@/features/search/hooks/useSearch";
import { Box, Chip, FormControl, MenuItem, Select, SelectChangeEvent, SelectProps, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import theme from "@/constants/themes/main.theme";
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";

export function CatalogSelect({sx, ...props}: SelectProps) {
    return (
        <Select
            sx={{
                "& .MuiSelect-outlined": {
                    padding: "10px 14px"
                } ,
                ...sx
            }}
            {...props}
        />
    )
}

export default function SelectFilter({
    name, 
    options, 
    label, 
    ...props
}: SelectProps & {
    options: {
        id: number, 
        name: string
    }[], 
    label: string
}) {
    const [value, setValue] = useState<string[]>([]);

    const { filters, setFilters } = useSearch();

    useEffect(() => {
        setValue(name ? filters.get(name) || [] : [])
    }, [filters])
    
    return (
        <FormControl fullWidth>
            <Typography fontWeight={600}>{label}</Typography>
            <CatalogSelect
                labelId={`catalog_${name}_input`}
                name={name}
                fullWidth
                multiple
                displayEmpty
                value={value}
                sx={{
                    mt: 1
                }}
                renderValue={(selected: unknown) => (
                    <>
                        {(selected as string[]).length == 0 ? 
                            <Typography
                                sx={{
                                    color: theme.typography.caption.color
                                }}
                            >
                                Выберите значение
                            </Typography>
                            :
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: "5px"
                                }}
                            >
                                {(selected as string[]).map((value: string) => (
                                    <Chip 
                                        onClick={() => {console.log(42534)}}
                                        key={`catalog_${name}_${value}_chip`} 
                                        label={options.find((v) => v.id.toString() == value)?.name} 
                                        onMouseDown={(event: MouseEvent) => event.stopPropagation()}
                                        onDelete={() => {
                                            setValue((val) => val.filter(v => v != value.toString()))

                                            if (name) {
                                                const newFilters = new Map(filters);

                                                const oldList = newFilters.get(name) || []
                                                const newList = oldList.filter(v => v != value.toString())
                                                
                                                newFilters.set(name, newList)
                                                setFilters(newFilters)
                                            }

                                        }}
                                    />
                                ))}
                            </Box>
                        }
                    </>
                )}
                onChange={(event) => {
                    const {target: {value}} = event as SelectChangeEvent<string[]>;
                    
                    const newFilters: Map<string, string[]> = new Map(filters)

                    const newValue = typeof value === 'string' ? value.split(',') : value

                    setValue(newValue)
                    if (name) {
                        newFilters.set(name, newValue)

                        setFilters(newFilters) 
                    }
                }}
                {...props}
            >
                {options.map((op) => (
                    <MenuItem key={`catalog_${name}_${op.id}_option`} value={op.id}>{op.name}</MenuItem>
                ))}
            </CatalogSelect>
        </FormControl>
    )
}