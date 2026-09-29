"use client"

import { Backdrop, Box, Button, Dialog, DialogContent, DialogTitle, Divider, List, ListItemButton, ListItemIcon, ListItemText, Modal, OutlinedInput, Paper, SvgIcon, SxProps, Typography, useTheme } from "@mui/material";
import { TelegramShareButton } from "react-share";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import theme from "@/constants/themes/main.theme";
import { useAppSelector } from "@/lib/state/hooks";
import { selectDeviceType } from "@/features/global/states/app/slice";

interface ShareProps {
    open: boolean,
    link: string,
    onClose: () => void
}

function ShareIcon({children, title}: {children: React.ReactElement, title: string}) {
    const theme = useTheme()
    
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(1),
                alignItems: "center"
            }}
        >
            <SvgIcon
                sx={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%"
                }}
            >
                {children}
            </SvgIcon>
            <Typography fontSize={"12px"}>{title}</Typography>
        </Box>
        
    )
}

function ShareIconsCarousel({sx, link}: {sx?: SxProps, link: string}) {
    return (
        <Box
            sx={{...sx}}
        >
            {/* <VKShareButton url={link}>
                <ShareIcon title="Вконтакте">
                    <svg width="101" height="100" viewBox="0 0 101 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_2_40)">
                    <path d="M0.5 48C0.5 25.3726 0.5 14.0589 7.52944 7.02944C14.5589 0 25.8726 0 48.5 0H52.5C75.1274 0 86.4411 0 93.4706 7.02944C100.5 14.0589 100.5 25.3726 100.5 48V52C100.5 74.6274 100.5 85.9411 93.4706 92.9706C86.4411 100 75.1274 100 52.5 100H48.5C25.8726 100 14.5589 100 7.52944 92.9706C0.5 85.9411 0.5 74.6274 0.5 52V48Z" fill="#0077FF"/>
                    <path d="M53.7085 72.042C30.9168 72.042 17.9169 56.417 17.3752 30.417H28.7919C29.1669 49.5003 37.5834 57.5836 44.25 59.2503V30.417H55.0004V46.8752C61.5837 46.1669 68.4995 38.667 70.8329 30.417H81.5832C79.7915 40.5837 72.2915 48.0836 66.9582 51.1669C72.2915 53.6669 80.8336 60.2086 84.0836 72.042H72.2499C69.7082 64.1253 63.3754 58.0003 55.0004 57.1669V72.042H53.7085Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_2_40">
                    <rect width="100" height="100" fill="white" transform="translate(0.5)"/>
                    </clipPath>
                    </defs>
                    </svg>
                </ShareIcon>
            </VKShareButton>  */}
            <TelegramShareButton url={link}>
                <ShareIcon title="Телеграм">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 240.1 240.1">
                    <linearGradient id="Oval_1_" gradientUnits="userSpaceOnUse" x1="-838.041" y1="660.581" x2="-838.041" y2="660.3427" gradientTransform="matrix(1000 0 0 -1000 838161 660581)">
                    <stop offset="0" style={{stopColor:"#2AABEE"}}/>
                    <stop offset="1" style={{stopColor:"#229ED9"}}/>
                    </linearGradient>
                    <circle fillRule="evenodd" clipRule="evenodd" fill="url(#Oval_1_)" cx="120.1" cy="120.1" r="120.1"/>
                    <path fillRule="evenodd" clipRule="evenodd" fill="#FFFFFF" d="M54.3,118.8c35-15.2,58.3-25.3,70-30.2 c33.3-13.9,40.3-16.3,44.8-16.4c1,0,3.2,0.2,4.7,1.4c1.2,1,1.5,2.3,1.7,3.3s0.4,3.1,0.2,4.7c-1.8,19-9.6,65.1-13.6,86.3 c-1.7,9-5,12-8.2,12.3c-7,0.6-12.3-4.6-19-9c-10.6-6.9-16.5-11.2-26.8-18c-11.9-7.8-4.2-12.1,2.6-19.1c1.8-1.8,32.5-29.8,33.1-32.3 c0.1-0.3,0.1-1.5-0.6-2.1c-0.7-0.6-1.7-0.4-2.5-0.2c-1.1,0.2-17.9,11.4-50.6,33.5c-4.8,3.3-9.1,4.9-13,4.8 c-4.3-0.1-12.5-2.4-18.7-4.4c-7.5-2.4-13.5-3.7-13-7.9C45.7,123.3,48.7,121.1,54.3,118.8z"/>
                    </svg>
                </ShareIcon>    
            </TelegramShareButton> 
        </Box>
    )
}

export function ShareMobile({open, onClose, link}: ShareProps) {
    return (
        <Backdrop
            open={open}
            onClick={onClose}
            sx={{
                zIndex: theme.zIndex.drawer + 1,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    bottom: "10px",
                    px: 3,
                    width: "100%"
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        borderRadius: 2,
                        p: 3,

                        maxWidth: "600px",
                        mx: "auto"
                    }}
                >
                    <Typography fontSize={"16px"}>Поделиться</Typography>
                    <Box
                        sx={{
                            mt: 2
                        }}
                    >
                        <ShareIconsCarousel 
                            link={process.env.NEXT_PUBLIC_SITE_URL + link} 
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 3
                            }}/>
                    </Box>
                    <Divider 
                        sx={{
                            mt: 3
                        }}
                    />
                    <List
                        onClick={() => {navigator.clipboard.writeText(process.env.NEXT_PUBLIC_SITE_URL + link); onClose?.()}}
                        sx={{
                            mt: 2,
                            display: "flex",
                            flexDirection: "row",
                            gap:3,
                            alignItems: "center"
                        }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <ContentCopyRoundedIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Скопировать ссылку
                            </ListItemText>
                        </ListItemButton>
                    </List>
                </Paper>
            </Box>
        </Backdrop>
    )
}

export function ShareDesktop({open, onClose, link}: ShareProps) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Поделиться</DialogTitle>
            <DialogContent>
                <ShareCopyLinkInput link={process.env.NEXT_PUBLIC_SITE_URL + link}/>
                <ShareIconsCarousel sx={{mt: "20px"}} link={process.env.NEXT_PUBLIC_SITE_URL + link}/>
            </DialogContent>
        </Dialog>
    )
}

export default function Share({...props}: ShareProps) {
    const deviceType = useAppSelector(selectDeviceType)

    return (
        <>
            {deviceType == "desktop" ?
                <ShareDesktop {...props}/>
                :
                <ShareMobile {...props}/>
            }
        </>
    )
}

function ShareCopyLinkInput({link}: {link: string}){
    return (
        <OutlinedInput 
            disabled
            value={link}
            fullWidth
            endAdornment={
                <Button 
                    variant="contained"
                    onClick={() => {
                        navigator.clipboard.writeText(link)
                    }}
                    sx={{
                        textTransform: "lowercase",
                        px: theme.spacing(1),
                        minWidth: "auto"
                    }}
                >
                    Скопировать
                </Button>
            }
            sx={{
                borderRadius: "30px",
                padding: `${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(3)}`, 
                "& input": {
                    padding: "10px 0",
                    lineHeight: "20px",
                    height: "auto",
                    fontSize: "16px"
                }
            }}
        />
    )
}