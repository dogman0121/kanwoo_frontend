import { headers } from 'next/headers';
import StoreProvider from '../_components/StoreProvider';
import MainLayout from './_components/MainLayout';
import MobileLayout from './_components/MobileLayout';
import DesktopLayout from './_components/DesktopLayout';
import Footer from './_components/Footer';

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