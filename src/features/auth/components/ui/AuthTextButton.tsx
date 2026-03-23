import { Button, ButtonProps } from "@mui/material";

export default function AuthTextButton({sx, ...props}: ButtonProps) {
    return (
        <Button 
            variant="text"
            sx={{
                p: "0",
                ":hover": {
                    bgcolor: "transparent",
                    textDecoration: "underline"
                },
                ...sx
            }}
            {...props}
        />
    )
}