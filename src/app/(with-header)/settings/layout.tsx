"use client"

import EditBody from "@/features/edit/components/EditBody"
import EditDrawer from "@/features/edit/components/EditDrawer"
import EditSectionsLinkButton from "@/features/edit/components/EditSectionsLinkButton"
import { ROUTES } from "@/routes"
import { ListItemIcon, ListItemText } from "@mui/material"
import { Children } from "react"
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded"
import EditDrawerContainer from "@/features/edit/components/EditDrawerContainer"
import useResources from "@/lib/useResources"
import EditLayout from "@/features/edit/components/EditLayout"

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