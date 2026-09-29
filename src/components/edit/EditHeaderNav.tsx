"use client"

import { Box, Divider } from "@mui/material"
import EditPageContainer from "./EditPageContainer"

export default function EditHeaderNav({
    buttons
}: {
    buttons?: React.ReactElement
}) {
    return (
        <Box
            sx={{
                position: "sticky",
                top: "54px",

                zIndex: 1001
            }}
        >
            <EditPageContainer
                sx={{
                    bgcolor: "background.default",

                    display: "flex",
                    justifyContent: "end",
                    
                }}
            >
                {buttons && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            columnGap: "10px",
                            py: "10px"
                        }}
                    >
                        {buttons}
                    </Box>
                )}
            </EditPageContainer>
            <Divider />
        </Box>
    )
}