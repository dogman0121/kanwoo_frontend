import { homeServerApi } from "@/lib/fetch/features/home/server";
import HomePageDesktop from "./_components/DesktopHomePage";
import HomePageMobile from "./_components/MobileHomePage";
import { serverFetch } from "@/lib/fetch/serverFetch";
import Home from "@/types/home";
import HomeProvider from "./_components/HomeProvider";

export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ viewport: string }>
}) {
    const { viewport } = await searchParams;

    const {data: home} = await serverFetch.get<Home>("/home")

    return (
        <HomeProvider home={home}>
            {viewport == "mobile" ?
                <HomePageMobile />
                :
                <HomePageDesktop/>
            }
        </HomeProvider>
    )
}