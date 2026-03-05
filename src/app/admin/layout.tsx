"use client"

import { useAppSelector } from "@/lib/state/hooks"
import { AppBar, Avatar, Box, Button, List, ListItemIcon, ListItemText, Toolbar, Typography, useTheme } from "@mui/material"
import { notFound, useRouter } from "next/navigation"
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import EditLayout from "@/features/edit/components/EditLayout"
import EditBody from "@/features/edit/components/EditBody"
import EditDrawer from "@/features/edit/components/EditDrawer"
import EditDrawerContainer from "@/features/edit/components/EditDrawerContainer"
import EditSectionsLinkButton from "@/features/edit/components/EditSectionsLinkButton"
import { ROUTES } from "@/routes"
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SearchInputDesktop from "@/features/search/components/SearchInputDesktop"
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import { useEffect } from "react"
import useSection from "./_hooks/useSection"
import AddRoundedIcon from "@mui/icons-material/AddRounded"


function NavigationDrawer() {
    const { section } = useSection()

    useEffect(() => {console.log(section)}, [section])

    return (
        <EditDrawer>
            <EditDrawerContainer>
                <List>
                    <EditSectionsLinkButton 
                        link={ROUTES.ADMIN.MAIN}
                        selected={section == "main"}
                    >
                        <ListItemIcon>
                            <DashboardRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Дэшборд
                        </ListItemText>
                    </EditSectionsLinkButton>
                    <EditSectionsLinkButton 
                        link={ROUTES.ADMIN.MANGA.MAIN}
                        selected={section == "manga"}
                    >
                        <ListItemIcon>
                            <BookRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Манга
                        </ListItemText>
                    </EditSectionsLinkButton>
                    <EditSectionsLinkButton 
                        link={ROUTES.ADMIN.CHAPTERS}
                        selected={section == "chapters"}
                    >
                        <ListItemIcon>
                            <StickyNote2RoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Главы
                        </ListItemText>
                    </EditSectionsLinkButton>
                    <EditSectionsLinkButton 
                        link={ROUTES.ADMIN.PROFILES}
                        selected={section == "profiles"}
                    >
                        <ListItemIcon>
                            <PersonRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Пользователи
                        </ListItemText>
                    </EditSectionsLinkButton>
                    <EditSectionsLinkButton 
                        link={ROUTES.ADMIN.REPORTS}
                        selected={section == "reports"}
                    >
                        <ListItemIcon>
                            <ReportProblemRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Жалобы
                        </ListItemText>
                    </EditSectionsLinkButton>
                    <EditSectionsLinkButton 
                        link={ROUTES.ADMIN.FEEDBACK}
                        selected={section == "feedback"}
                    >
                        <ListItemIcon>
                            <MessageRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Обратная связь
                        </ListItemText>
                    </EditSectionsLinkButton>
                </List>
            </EditDrawerContainer>
        </EditDrawer>
    )
}

function Header() {
    const theme = useTheme()

    const authProfile = useAppSelector(state => state.authProfile.profile)

    const router = useRouter()

    return (
        <AppBar
            component="nav"
            sx={[
                {
                    zIndex: theme.zIndex.drawer + 1
                },
                theme.applyStyles("dark", {
                    backgroundColor: "#06090E"
                }),
                theme.applyStyles("light", {
                    backgroundColor: "#FFF1AA"
                })
            ]}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",

                    gap: "15px"
                }}
            >
                <Button
                    variant="contained"
                    startIcon={<WestRoundedIcon />}
                    onClick={() => router.push(ROUTES.HOME)}
                    sx={{
                        bgcolor: "background.paper",
                        color: theme.typography.body1.color
                    }}
                >
                    На сайт
                </Button>
                <SearchInputDesktop 
                    sx={{
                        width: "600px",
                        bgcolor: "background.paper"
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: theme.spacing(2),
                        alignItems: "center"
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={
                            <AddRoundedIcon />
                        }
                        sx={{
                            bgcolor: "background.paper",
                            color: theme.typography.body1.color
                        }}
                    >
                        Добавить контент
                    </Button>
                    <Avatar 
                        src={authProfile?.avatar}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    )
}


export default function Layout({children}: {children: React.ReactNode}) {

    const authProfile = useAppSelector(state => state.authProfile.profile)

    if (authProfile && (authProfile.role < 10))
        return notFound()

    if (!authProfile)
        return null;

    return (
        <>
            <Header />
            <Toolbar />
            <EditLayout>     
                <NavigationDrawer />
                <EditBody>
                    {children}
                </EditBody>
            </EditLayout>  
        </>
    )
}