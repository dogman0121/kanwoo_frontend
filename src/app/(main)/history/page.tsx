import MobileHistoryPage from "./_components/MobileHistoryPage";
import DesktopHistoryPage from "./_components/DesktopHistoryPage";

export default async function Page({searchParams}: {searchParams: Promise<{ viewport: string }>}) {
    const {viewport} = await searchParams

    return (
        <>
            {viewport == "mobile" ?
                <MobileHistoryPage />
                :
                <DesktopHistoryPage />
            }
        </>
    )
}