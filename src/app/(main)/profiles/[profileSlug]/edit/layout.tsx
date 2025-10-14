import { Box } from "@mui/material"
import SectionsDrawer from "./SectionsDrawer";
import { profileServerApi } from "@/lib/api/features/profile/server";
import { notFound } from "next/navigation";
import Profile from "@/types/profile";

const drawerWidth = 260;

export default async function Layout({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{profileSlug: string}>
}>) {
    const { profileSlug } = await params;
    
    const profile: Profile = await profileServerApi.getProfile(profileSlug)

    if (!profile)
        return notFound();

    return (
        <Box
            sx={{
                display: "flex"
            }}
        >
            <SectionsDrawer profile={profile}/>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.default' }}
            >
                {children}
            </Box>
        </Box>
    )
}