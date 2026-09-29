import { ChangeEvent, useRef, useState } from "react"

export default function useAvatarInput() {
    
    const inputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<null | File>(null);

    const [cropperOpen, setCropperOpen] = useState(false);
    
    const [uncroppedURL, setUncroppedURL] = useState("")

    return {
        file: file,
        inputProps: {
            type: "file",
            hidden: true,
            ref: inputRef,
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
                const files = event.target.files;

                if (!files?.length)
                    return;

                const avatarBytes = URL.createObjectURL(files[0]);

                event.target.value = "";

                URL.revokeObjectURL(uncroppedURL)

                setUncroppedURL(avatarBytes);
                setCropperOpen(true);
            }
        },
        labelProps: {
            onClick: (event: unknown) => {
                if (!inputRef.current)
                    return

                inputRef.current.click()
            }
        },
        cropperProps: {
            open: cropperOpen,
            src: uncroppedURL,
            width: 160,
            height: 160,
            onClick: (event: Event) => {
                event.stopPropagation()
            },
            onClose: () => setCropperOpen(false),
            onCrop: (file: File) => {
                setFile(file)
            },
            aspectRatio: 1
        }
    }
}