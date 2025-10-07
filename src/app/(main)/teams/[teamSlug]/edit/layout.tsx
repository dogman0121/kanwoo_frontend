import { Box } from "@mui/material"
import SectionsDrawer from "./SectionsDrawer";
import Team from "@/types/team";
import { teamServerApi } from "@/lib/api/features/team/server";
import { notFound } from "next/navigation";

const drawerWidth = 260;

export default async function Layout({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{teamSlug: string}>
}>) {
    const { teamSlug } = await params;
    
    const team: Team = await teamServerApi.getTeam(teamSlug)

    if (!team)
        return notFound();

    return (
        <Box
            sx={{
                display: "flex"
            }}
        >
            <SectionsDrawer team={team}/>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.default' }}
            >
                {children}
            </Box>
        </Box>
    )
}