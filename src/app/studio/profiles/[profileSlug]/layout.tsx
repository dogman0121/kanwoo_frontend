import EditLayout from "@/features/edit/components/EditLayout"
import StudioProfileProvider from "./_components/StudioProfileProvider";
import { notFound } from "next/navigation";
import { ApiError } from "@/lib/fetch/apiResponse";
import StudioProfileDrawer from "./_components/StudioProfileDrawer";
import { Box } from "@mui/material";
import Profile from "@/types/profile/profile";
import ProfilePermission from "@/types/profile/profilePermission";
import { serverFetch } from "@/lib/fetch/serverFetch";

export default async function Layout({
    children,
    params
}: LayoutProps<"/studio/profiles/[profileSlug]">) {

    try {
        const {profileSlug} = await params;

        const studioProfileInfo = await serverFetch.get<
            {
                profile: Profile, 
                profilePermission: ProfilePermission
            }
        >(`/studio/profiles/${profileSlug}`)

        return (
            <EditLayout>
                <StudioProfileProvider
                    profile={studioProfileInfo.data.profile}
                    profilePermission={studioProfileInfo.data.profilePermission}
                >
                    <StudioProfileDrawer/>
                    <Box
                        sx={{
                            width: "100%"
                        }}
                    >
                        {children}
                    </Box>
                </StudioProfileProvider>
            </EditLayout>
        )
    } catch(e) {
        if (e instanceof ApiError){
            notFound();
        }

        throw e;
    }
}