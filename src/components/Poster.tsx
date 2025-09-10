"use client"

export default function Poster({
    src, 
    width,
    style
}: {
    src: string, 
    width?: string
    style?: React.CSSProperties
}){
    return (
        <img
            draggable={false}
            src={src}
            alt="poster"
            style={{
                aspectRatio: "2/3",
                borderRadius: "3% / 2%",
                width: width || "100%",
                ...style
            }} 
        />
    )
}