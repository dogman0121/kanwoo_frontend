import HistoryPageDesktop from "@/features/history/pages/HistoryPageDesktop";
import HistoryPageMobile from "@/features/history/pages/HistoryPageMobile";

export default async function Page({searchParams}: {searchParams: Promise<{ viewport: string }>}) {
    const {viewport} = await searchParams;

    return (
        <>
            {viewport == "desktop" && (
                <HistoryPageDesktop />
            )}
            {viewport != "desktop" && (
                <HistoryPageMobile />
            )}
        </>
    )
}