import { homeServerApi } from "@/lib/api/features/home/server";
import HomePageDesktop from "./HomePageDesktop";
import HomePageMobile from "./HomePageMobile";

export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ viewport: string }>
}) {
    const { viewport } = await searchParams;

    const home = await homeServerApi.getHome()

    return (
        <>
            {viewport == "mobile" ?
                <HomePageMobile />
                :
                <HomePageDesktop home={home}/>
            }
        </>
    )
}