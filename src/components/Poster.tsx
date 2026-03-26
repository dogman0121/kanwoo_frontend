import { Box } from "@mui/material"
import Image from "next/image"

export default function Poster({
    src, 
    width,
    style
}: {
    src?: string, 
    width?: string
    style?: React.CSSProperties
}){
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
                        width: width || "100%",
                        ...style
                    }} 
                /> 
                :
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        aspectRatio: "2/3",
                        borderRadius: "6% / 4%",
                        minWidth: width || "100%",
                        ...style
                    }}
                />
            }
        </>
    )
}