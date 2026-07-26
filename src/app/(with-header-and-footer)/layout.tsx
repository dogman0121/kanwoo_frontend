import { headers } from 'next/headers';
import MobileLayout from '../_layouts/MobileLayout';
import DesktopLayout from '../_layouts/DesktopLayout';
import Footer from '../_layouts/Footer';

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
                  <Footer />
              </MobileLayout>
              :
              <DesktopLayout>
                  {children}
                  <Footer />
              </DesktopLayout>
          }
      </>  
  )
}