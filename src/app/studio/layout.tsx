import { headers } from "next/headers";
import MobileLayout from "../_layouts/MobileLayout";
import DesktopLayout from "../_layouts/DesktopLayout";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const device = (await headers()).get("X-Device-Type")
  
  return (
      <>
          { device == "mobile" ? 
              <MobileLayout>
                  {children}
              </MobileLayout>
              :
              <DesktopLayout>
                  {children}
              </DesktopLayout>
          }
      </>  
  )
}