"use client"

import EditSelect from "@/features/edit/components/EditSelect";
import { useAppSelector } from "@/lib/state/hooks";
import { MenuItem, SelectProps } from "@mui/material";

export default function MangaStatus({...props}: SelectProps) {
    const meta = useAppSelector(state => state.meta.meta);

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