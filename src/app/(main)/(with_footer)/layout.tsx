import Footer from "./_components/Footer"

export default async function Layout({children}: LayoutProps<"/">) {

    return (
        <>
            {children}
            <Footer />
        </>
    )
}