"use client"

import EditSelect from "@/components/edit/EditSelect";
import { selectMeta } from "@/features/global/states/meta/meta.slice";
import { useAppSelector } from "@/lib/state/hooks";
import { MenuItem, SelectProps } from "@mui/material";

export default function MangaStatus({...props}: SelectProps) {
    const meta = useAppSelector(selectMeta);

    if (!meta) return null;

    return (
        <EditSelect
            label="Статус"
            {...props}
        >
            {meta.manga.statuses.map((status) => (
                <MenuItem value={status.id} key={`status_${status.id}`}>
                    {status.name}
                </MenuItem>
            ))}
        </EditSelect>
    )
}