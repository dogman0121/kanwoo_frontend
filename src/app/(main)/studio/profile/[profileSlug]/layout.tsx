import EditLayout from "@/features/edit/components/EditLayout"
import StudioProfileProvider from "./_components/StudioProfileProvider";
import { notFound } from "next/navigation";
import { ApiError } from "@/lib/fetch/apiResponse";
import { studioServerApi } from "@/lib/fetch/features/studio/server";
import StudioProfileDrawer from "./_components/StudioProfileDrawer";
import { Box } from "@mui/material";

export default async function Layout({
    children,
    params
}: LayoutProps<"/studio/profile/[profileSlug]">) {

    try {
        const {profileSlug} = await params;

        const studioProfileInfo = await studioServerApi.getProfileInfo(profileSlug)

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