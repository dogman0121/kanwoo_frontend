"use client"

import EditSelect from "@/features/edit/components/EditSelect";
import { useAppSelector } from "@/lib/state/hooks";
import { MenuItem, SelectProps } from "@mui/material";

export default function MangaType({...props}: SelectProps) {
    const meta = useAppSelector(state => state.meta.meta);

    if (!meta) return null;

    return (
        <EditSelect
            label="Тип"
            {...props}
        >
            {meta.manga.types.map((type) => (
                <MenuItem value={type.id} key={`type_${type.id}`}>
                    {type.name}
                </MenuItem>
            ))}
        </EditSelect>
    )
}