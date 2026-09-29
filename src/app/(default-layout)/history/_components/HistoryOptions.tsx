"use client"

import { selectDeleteDisabled, selectIsAllSelected, setAllSelected } from "@/features/progress/states/auth-profile-history-page/slice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";

export default function HistoryOptions() {
    const dispatch = useAppDispatch()

    const allSelected = useAppSelector(selectIsAllSelected)
    const deleteDisabled = useAppSelector(selectDeleteDisabled)
    
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end"
            }}
        >
            <FormControlLabel 
                control={
                    <Checkbox 
                        checked={allSelected} 
                        onChange={
                            (_event, checked) => dispatch(setAllSelected(checked))
                        }
                    />
                }
                label="Выбрать все"
            />
            <Button
                variant="contained"
                disabled={deleteDisabled}
            >
                Удалить
            </Button>
        </Box>
    )
}