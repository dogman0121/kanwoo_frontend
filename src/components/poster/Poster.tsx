import { Box, Paper } from "@mui/material"
import NoPhotographyRoundedIcon from "@mui/icons-material/NoPhotographyRounded"

export interface PosterProps {
    src?: string, 
    width?: string
    style?: React.CSSProperties
}

export default function Poster({
    src, 
    width,
    style
}: PosterProps) {

    const computedWidth = width || "100%"

    return (
        <>
            {src ?
                <img
                    draggable={false}
                    src={src || "https://cdn.kanwoo.ru/manga/default.jpg"}
                    alt="poster"
                    style={{
                        aspectRatio: "2/3",
                        borderRadius: "6% / 4%",
                        width: computedWidth,
                        ...style
                    }} 
                /> 
                :
                <Paper
                    elevation={1}
                    sx={{
                        aspectRatio: "2/3",
                        position: "relative",
                        borderRadius: "6% / 4%",
                        border: "1px solid",
                        //borderStyle: "dashed",
                        borderColor: "divider",

                        width: width || "100%",
                        ...style
                    }}
                >
                    <NoPhotographyRoundedIcon 
                        sx={{
                            width: "20%",
                            height: "20%",
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)"
                        }}
                    />
                </Paper>
            }
        </>
    )
}