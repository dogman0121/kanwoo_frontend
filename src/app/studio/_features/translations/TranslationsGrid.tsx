import Poster from "@/components/Poster";
import EditPageContainer from "@/features/edit/components/EditPageContainer";
import { useAppSelector } from "@/lib/state/hooks";
import Translation from "@/types/translation/translation";
import { Box, Divider, SxProps, Typography } from "@mui/material";
import Link from "next/link";

const gridRowStyle: SxProps = {
    display: "grid",
    gridTemplateColumns: "4fr 1fr 1fr 1fr",
    columnGap: "15px",
    py: "15px"
}

function TranslationGridRow({translation}: {translation: Translation}){ 
    const meta = useAppSelector(state => state.meta.meta);

    if (!meta) return;

    return (
        <Box
            sx={{
                width: "100%",
                "&:not(:first-child)": {
                    borderTop: "1px solid",
                    borderColor: "divider"
                }
            }}
        >
            <EditPageContainer
                sx={{
                    ...gridRowStyle,
                    alignItems: "center"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "12px",
                        alignItems: "center"
                    }}
                >
                    <Poster 
                        width="80px"
                        src={translation.manga?.poster?.medium || ""}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "5px"
                        }}
                    >
                        <Link href={`/studio/translation/${translation.id}`}>
                            <Typography
                                sx={{
                                    "&:hover": {
                                        textDecoration: "underline"
                                    }
                                }}
                            >{translation.name}</Typography>
                        </Link>
                    </Box>
                </Box>
                <Typography>{translation.lang.name}</Typography>
                <Typography>{translation.privacy.name}</Typography>
                <Typography>{new Date(translation.created_at).toLocaleDateString()}</Typography>
            </EditPageContainer>
        </Box>
    )
}

export default function TranslationGrid({translations}: {translations: Translation[]}) {
    return (
        <Box>
            <EditPageContainer
                sx={{
                    ...gridRowStyle
                }}
            >
                <Typography variant="caption">Название</Typography>
                <Typography variant="caption">Язык</Typography>
                <Typography variant="caption">Видимость</Typography>
                <Typography variant="caption">Дата</Typography>
            </EditPageContainer>
            <Divider />
            {translations?.map(translation => (
                <TranslationGridRow key={translation.id} translation={translation} />
            ))}
        </Box>
    )
}