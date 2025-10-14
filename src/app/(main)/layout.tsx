import StoreProvider from './_components/StoreProvider';
import MainLayout from './_components/MainLayout';

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