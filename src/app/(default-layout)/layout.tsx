import { headers } from 'next/headers';
import Layout from "./_layouts/desktop/Layout"
import DesktopLayout from './_layouts/desktop/Layout';
import MobileLayout from './_layouts/mobile/Layout';
import { Box } from '@mui/material';


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const device = (await headers()).get("X-Device-Type")
    
    return (
        <Box
            sx={{
                height: "100vh"
            }}
        >
            { device == "mobile" ? 
                <MobileLayout>
                    {children}
                </MobileLayout>
                :
                <DesktopLayout>
                    {children}
                </DesktopLayout>
            }
        </Box>  
    )
}