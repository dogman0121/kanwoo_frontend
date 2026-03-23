import { homeServerApi } from "@/lib/fetch/features/home/server";
import HomePageDesktop from "./_components/DesktopHomePage";
import HomePageMobile from "./_components/MobileHomePage";
import { serverFetch } from "@/lib/fetch/serverFetch";
import Home from "@/types/home";
import HomeProvider from "./_components/HomeProvider";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const title = `Kanwoo - лучший сайт по чтению манги`;
    const description = "Kanwoo — читать мангу онлайн на русском. Более 10 000 тайтлов, ежедневные обновления. Удобный плеер, без рекламы и регистрации. Присоединяйся!"
    
    return {
        title:  title,
        description: description,
        openGraph: {
            type: "website",
            url: `https://kanwoo.ru/`,
            title: title,
            description: description,
            siteName: "Kanwoo"
        },
    }
}

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