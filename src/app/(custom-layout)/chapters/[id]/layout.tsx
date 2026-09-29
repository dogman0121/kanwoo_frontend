import { CssBaseline, ThemeProvider } from "@mui/material";
import { chapterPageTheme } from "@/constants/themes/chapter-page.theme";

export default async function Layout({
    children
}: {
    children: React.ReactNode
}) {
    
    return (
        <> 
            <ThemeProvider
                theme={chapterPageTheme}
                defaultMode="dark"
            > 
                <CssBaseline />
                {children}
            </ThemeProvider>
        </>
    )
}