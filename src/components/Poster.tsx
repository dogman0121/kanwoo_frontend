import { Box, Paper } from "@mui/material"
import NoPhotographyRoundedIcon from "@mui/icons-material/NoPhotographyRounded"

export default function Poster({
    src, 
    width,
    style
}: {
    src?: string, 
    width?: string
    style?: React.CSSProperties
}){

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
                    sx={{
                        aspectRatio: "2/3",
                        position: "relative",
                        borderRadius: "6% / 4%",
                        border: "1px solid",
                        //borderStyle: "dashed",
                        borderColor: "divider",

                        minWidth: width || "100%",
                        ...style
                    }}
                >
                    <NoPhotographyRoundedIcon 
                        sx={{
                            fontSize: `100%`,
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