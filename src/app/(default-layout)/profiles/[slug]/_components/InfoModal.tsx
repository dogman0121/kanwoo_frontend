import { selectProfile } from "@/lib/state/features/profile-page/page/selectors";
import { useAppSelector } from "@/lib/state/hooks";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Link, List, styled, Typography, TypographyProps } from "@mui/material";
import LinkImage from "./LinkImage";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

export interface InfoModalProps {
    open: boolean,
    onClose: () => void
}

const MyTypography = ({sx, ...props}: TypographyProps) => {
    return (
        <Typography 
            variant="h3" 
            sx={{
                mt: 2,
                mb: 1
            }}
            {...props}
        />
    )
}

const OptionsItem = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(3)
}))

export default function InfoModal({
    open,
    onClose
}: InfoModalProps) {
    const profile = useAppSelector(selectProfile)

    if (!profile) return

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                Информация
                <IconButton
                    size="small"
                    onClick={onClose}
                >
                    <CloseRoundedIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent
                sx={{
                    height: "400px"
                }}
            >
                <MyTypography>Название</MyTypography>
                <Typography
                >
                    {profile.name}
                </Typography>
                <MyTypography>Описание</MyTypography>
                <Typography
                >
                    {profile.about}
                </Typography>
                <MyTypography variant="h3">Ссылки</MyTypography>
                <Box>
                    {profile.links.map(link => (
                        <Box
                            key={`profile_page_info_link_${link.name}`}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 2,
                                alignItems: "center"
                            }}
                        >
                            <LinkImage link={link.link}/>
                            <Box>
                                <Typography fontWeight={600}>{link.name}</Typography>
                                <Link href={link.link} >
                                    {link.link}
                                </Link>
                            </Box>
                        </Box>
                    ))}
                </Box>
                <MyTypography>Доп. информация</MyTypography>
                <List>
                    <OptionsItem>
                        <GroupRoundedIcon />
                        <Typography>Подписчики: {profile.subscribers_count}</Typography>
                    </OptionsItem>
                    <OptionsItem>
                        <CreateRoundedIcon />
                        <Typography>Дата создания: {new Date(profile.created_at).toLocaleDateString()}</Typography>
                    </OptionsItem>
                </List>
            </DialogContent>
        </Dialog>
    )
}