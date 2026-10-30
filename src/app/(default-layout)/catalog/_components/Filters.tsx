import { Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "@/lib/state/hooks";
import SelectFilter from "./SelectFilter";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"
import useSearch from "@/features/search/hooks/useSearch";
import InputFilter from "./InputFilter";

export default function Filters() {
    const meta = useAppSelector(state => state.global.meta.meta)

    const {setFilters} = useSearch()

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Typography
                    variant="h3"
                >
                    Фильтры
                </Typography>
                <Button
                    variant="text"
                    color="inherit"
                    size="small"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                    onClick={() => {
                        setFilters(new Map())
                    }}
                    endIcon={<DeleteRoundedIcon />}
                >
                    <Typography>очистить</Typography>
                </Button>
            </Box>
            <Box
                sx={{
                    mt: 2,
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "15px"
                }}
            >
                <SelectFilter
                    name="genre"
                    label={"Теги"}
                    options={meta?.manga.genres || []}
                />
                <SelectFilter
                    name="status"
                    label={"Статус"}
                    options={meta?.manga.statuses || []}
                />
                <SelectFilter
                    name="type"
                    label={"Тип"}
                    options={meta?.manga.types || []}
                />
                <SelectFilter
                    name="adult"
                    label={"Возрастное ограничение"}
                    options={meta?.manga.adults || []}
                />
                <Box>
                    <Typography
                        sx={{
                            mb: 1
                        }}
                    >
                        Дата выпуска
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            columnGap: "15px",
                        }}
                    >
                        <InputFilter 
                            type="number"
                            placeholder="От"
                            name="year_from"
                            fullWidth
                            slotProps={{
                                htmlInput: {
                                    min: "1900",
                                    max: "2099"
                                }
                            }}
                        />
                        <InputFilter 
                            type="number"
                            placeholder="До"
                            name="year_to"
                            fullWidth
                            slotProps={{
                                htmlInput: {
                                    min: "1900",
                                    max: "2099"
                                }
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}