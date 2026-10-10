"use client"

import EditSelect from "@/components/edit/EditSelect";
import { selectMeta } from "@/features/global/states/meta/meta.slice";
import { useAppSelector } from "@/lib/state/hooks";
import { MenuItem, SelectProps } from "@mui/material";

export default function MangaType({...props}: SelectProps) {
    const meta = useAppSelector(selectMeta);

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