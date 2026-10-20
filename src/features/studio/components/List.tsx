import { Divider, Stack, StackProps } from "@mui/material";

export default function StudioList({sx, ...props}: StackProps) {
    return (
        <Stack 
            sx={{
                py: 2,
                ...sx
            }}
            divider={
                <Divider 
                    sx={{
                        my: 2
                    }}
                />
            }
            {...props}
        />
    )
}