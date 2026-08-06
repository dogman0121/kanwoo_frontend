import { CssBaseline, ThemeProvider, Toolbar } from "@mui/material";
import { chapterTheme } from "./theme";

export default async function Layout({
    children
}: {
    children: React.ReactNode
}) {
    
    return (
        <> 
            <ThemeProvider
                theme={chapterTheme}
            >
                <CssBaseline />
                {children}
            </ThemeProvider>
        </>
    )
}