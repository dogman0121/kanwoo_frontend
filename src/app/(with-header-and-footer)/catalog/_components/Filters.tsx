import { Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "@/lib/state/hooks";
import SelectFilter from "./SelectFilter";
import InputFilter from "./InputFilter";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"
import useSearch from "@/features/search/hooks/useSearch";

export default function Filters() {
    const meta = useAppSelector(state => state.meta.meta)

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
                <Typography>Фильтры</Typography>
                <Button
                    variant="text"
                    color="secondary"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                    onClick={() => {
                        setFilters(new Map())
                    }}
                >
                    <Typography>очистить</Typography>
                    <DeleteRoundedIcon 
                        sx={(theme) => ({
                            ml: "5px",
                            color: theme.typography.body1.color
                        })}
                    />
                </Button>
            </Box>
            <Box
                sx={{
                    mt: "20px",
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
                    <Typography>Дата выпуска</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            columnGap: "15px",
                            mt: "5px"
                        }}
                    >
                        <InputFilter 
                            label="От"
                            type="number"
                            name="year_from"
                        />
                        <InputFilter 
                            label="До"
                            type="number"
                            name="year_to"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}