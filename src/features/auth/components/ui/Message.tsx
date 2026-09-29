import { Box } from "@mui/material";

export default function Message({title, description}: {title: string, description: string}) {
    return (
        <>
            <h2>{ title }</h2>
            <Box>
                { description }
            </Box>
        </>
        
    )
}