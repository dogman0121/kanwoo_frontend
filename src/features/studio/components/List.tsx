import { Divider, Stack, StackProps } from "@mui/material";

export default function StudioList({...props}: StackProps) {
    return (
        <Stack 
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