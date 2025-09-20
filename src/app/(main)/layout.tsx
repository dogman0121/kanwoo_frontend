import StoreProvider from './StoreProvider';
import MainLayout from './MainLayout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <MainLayout>
        {children}
      </MainLayout>
    </StoreProvider>
  );
}