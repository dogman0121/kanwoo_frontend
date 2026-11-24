import { Privacy } from "@/components/PrivacySelect"
import { Box, SvgIcon, SxProps, Typography } from "@mui/material"
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';

export default function PrivacyLabel({
    privacy,
    sx
}: {
    privacy: Privacy,
    sx?: SxProps
}) {
    const map = {
        [Privacy.LINK]: {
            icon: <LinkRoundedIcon />,
            label: "по ссылке"
        },
        [Privacy.PRIVATE]: {
            icon: <LockRoundedIcon />,
            label: "приватный"
        },
        [Privacy.PUBLIC]: {
            icon: <PublicRoundedIcon />,
            label: "публичный"
        }
    }
    return (
        <Box
            component={"span"}
            sx={{
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",

                ...sx
            }}
        >
            <SvgIcon
                sx={{
                    fontSize: "18px"
                }}
            >
                {map[privacy].icon}
            </SvgIcon>
            <Typography color="textSecondary" sx={{ml: 0.4}}>
                {map[privacy].label}
            </Typography>
        </Box>
    )
}