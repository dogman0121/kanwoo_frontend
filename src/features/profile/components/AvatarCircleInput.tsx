import { Avatar } from "@mui/material"
import { useEffect, useState } from "react"
import useAvatarInput from "../hooks/use-avatar-input"
import AvatarCropper from "@/components/AvatarCropper";

export default function AvatarCircleInput({
    value,
    onChange
}: {
    value: File | null,
    onChange: (value: File) => void
}) {

    const [avatarSrc, setAvatarSrc] = useState<string>(value ? URL.createObjectURL(value) : "")

    const {file, cropperProps, inputProps, labelProps} = useAvatarInput();

    useEffect(() => {
        if (file) {
            setAvatarSrc(URL.createObjectURL(file)) 
            onChange(file)
        }

        return () => {
            URL.revokeObjectURL(avatarSrc)
        }
    }, [file])

    return (
        <>
            <Avatar 
                src={avatarSrc}
                {...labelProps}
                sx={{
                    width: "120px",
                    height: "120px"
                }}
            />
            <input 
                {...inputProps}
            />
            <AvatarCropper 
                {...cropperProps}
            />
        </>
    )
}