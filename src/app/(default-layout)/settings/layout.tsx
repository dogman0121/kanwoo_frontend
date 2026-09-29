"use client"

import EditBody from "@/components/edit/EditBody"
import EditDrawer from "@/components/edit/EditDrawer"
import EditSectionsLinkButton from "@/components/edit/EditSectionsLinkButton"
import { ROUTES } from "@/constants/routes/main.routes"
import { ListItemIcon, ListItemText } from "@mui/material"
import { Children } from "react"
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded"
import EditDrawerContainer from "@/components/edit/EditDrawerContainer"
import useResources from "@/lib/use-resources.hook"
import EditLayout from "@/components/edit/EditLayout"

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    const { resources } = useResources()

    const section = resources[2]

    return (
        <EditLayout>
            <EditDrawer>
                <EditDrawerContainer>
                    <EditSectionsLinkButton
                        link={ROUTES.SETTINGS.SECUTIRY}
                        selected={section == "security"}
                    >
                        <ListItemIcon>
                            <SecurityRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Безопасность и вход
                        </ListItemText>
                    </EditSectionsLinkButton>
                </EditDrawerContainer>
            </EditDrawer>
            <EditBody>
                {Children.map(children, c => c)}
            </EditBody>
        </EditLayout>  
        
    )
}