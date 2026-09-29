import PPage from "./PPage";

export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ viewport: string }>
}) {

    const { viewport } = await searchParams;

    return (
        <PPage deviceType={viewport} />
    )
}