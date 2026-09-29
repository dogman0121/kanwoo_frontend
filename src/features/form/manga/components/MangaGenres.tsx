"use client"

import EditSelect from "@/components/edit/EditSelect";
import { useAppSelector } from "@/lib/state/hooks";
import { Box, Chip, MenuItem, SelectProps, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel"
import { selectMeta } from "@/features/global/states/meta/meta.slice";

export default function MangaGenres({onChange, ...props}: SelectProps & {onChange: (value: string[]) => void}) {
    const meta = useAppSelector(selectMeta)

    if (!meta)
        return null;

    return (
        <EditSelect
            label="Жанры"
            caption="Помогают при поиске тайтла в каталоге а также в системе рекомендаций"
            multiple
            displayEmpty={true}
            onChange={onChange}
            {...props}
            renderValue={(selected)=> (
                <Box
                    sx={(theme) => ({ display: "flex", flexWrap: "wrap", gap: theme.spacing(1)})}
                >
                    {(selected as string[]).length !== 0 ?
                        <>
                            {(selected as string[]).map((option: string) => (
                                <Chip
                                    key={option} 
                                    label={meta.manga.genres.find((item) => item.id == parseInt(option))?.name}
                                    onDelete={() => onChange((selected as string[]).filter((f: string) => f != option))}
                                    deleteIcon={
                                        <CancelIcon
                                            sx={{
                                                width: "16px",
                                                height: "16px"
                                            }}
                                            onMouseDown={(event) => {event.stopPropagation(); event.preventDefault()}}
                                        />
                                    }
                                />
                            ))}
                        </>
                        :
                        <Typography color="darkgray">Выберите значение</Typography>
                    }
                </Box>
            )}
        >
            {meta.manga.genres.map((genre) => (
                <MenuItem key={`genre_${genre.id}`} value={genre.id}>{genre.name}</MenuItem>
            ))}
        </EditSelect>
    )
}