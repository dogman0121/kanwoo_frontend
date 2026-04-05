"use client"

import EditSelect from "@/features/edit/components/EditSelect";
import { useAppSelector } from "@/lib/state/hooks";
import { MenuItem, SelectProps } from "@mui/material";

export default function MangaAdult({...props}: SelectProps) {
    const meta = useAppSelector(state => state.meta.meta);

    if (!meta) return null;

    return (
        <EditSelect
            label="Возрастное ограничение"
            {...props}
        >
            {meta.manga.adults.map((adult) => (
                <MenuItem value={adult.id} key={`adult_${adult.id}`}>
                    {adult.name}
                </MenuItem>
            ))}
        </EditSelect>
    )
}