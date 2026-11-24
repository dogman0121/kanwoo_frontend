import { Box, SvgIcon, Toolbar, Tooltip, Typography } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import { Privacy } from "@/components/PrivacySelect";
import React from "react";


function Status({
    tooltipTitle,
    label,
    icon
}: {
    tooltipTitle: string,
    label: string,
    icon: React.ReactNode
}) {
    return (
        <Tooltip
            title={tooltipTitle}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: 'row',
                    alignItems: "center"
                }}
            >
                <SvgIcon fontSize="small">
                    {icon}
                </SvgIcon>
                <Typography
                    sx={{
                        ml: 1
                    }}
                >
                    {label}
                </Typography>
            </Box>
        </Tooltip>
    )
}

export default function StudioPrivacyStatus({
    privacy
}: {
    privacy: Privacy
}) {
    return (
        <>
            {privacy == Privacy.PUBLIC && (
                <Status 
                    icon={<PublicIcon />}
                    tooltipTitle="Данный ресурс доступен все пользователям"
                    label="публичный"
                />
            )}
            {privacy == Privacy.LINK && (
                <Status 
                    icon={<LinkIcon />}
                    tooltipTitle="Данный ресурс доступен по прямому переходу по ссылке"
                    label="по ссылке"
                />
            )}
            {privacy == Privacy.PRIVATE && (
                <Status 
                    icon={<LockIcon />}
                    tooltipTitle="Данный ресурс доступен только вам"
                    label="приватный"
                />
            )}
        </>
    )
}