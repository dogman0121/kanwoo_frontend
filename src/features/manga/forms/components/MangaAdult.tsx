"use client"

import EditSelect from "@/components/edit/EditSelect";
import { selectMeta } from "@/features/global/states/meta/meta.slice";
import { useAppSelector } from "@/lib/state/hooks";
import { MenuItem, SelectProps } from "@mui/material";

export default function MangaAdult({...props}: SelectProps) {
    const meta = useAppSelector(selectMeta);

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