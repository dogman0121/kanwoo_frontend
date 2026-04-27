import { clientFetch } from "@/lib/fetch/clientFetch"
import Translation from "@/types/translation/translation";
import TranslationPermission from "@/types/translation/translationPermission";
import StudioTranslationProvider from "./_components/StudioTranslationProvider";
import { serverFetch } from "@/lib/fetch/serverFetch";
import StudioTranslationDrawer from "./_components/StudioTranslationDrawer";
import { Box } from "@mui/material";
import EditLayout from "@/features/edit/components/EditLayout";

interface TranslationInfo {
    translation: Translation,
    translationPermission: TranslationPermission
}

export default async function Layout({
    children,
    params
}: LayoutProps<"/studio/translations/[translationId]">) {
    const { translationId } = await params;

    const { data: translationData } = await serverFetch.get<TranslationInfo>(`/studio/translations/${translationId}`)
    
    return (
        <EditLayout>
            <StudioTranslationProvider
                translation={translationData.translation}
                translationPermission={translationData.translationPermission}
            >
                <StudioTranslationDrawer />
                <Box
                    sx={{
                        width: "100%"
                    }}
                >
                    {children}
                </Box>
            </StudioTranslationProvider>
        </EditLayout>
    )
}