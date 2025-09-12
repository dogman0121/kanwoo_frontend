import Image from "next/image"

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
        <Image
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