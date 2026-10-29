import { Metadata } from "next";
import { homeServerAPI } from "@/features/home/api/server.api";
import HomePageDesktop from "@/features/home/pages/HomePageDesktop";
import HomePageMobile from "@/features/home/pages/HomePageMobile";

export async function generateMetadata(): Promise<Metadata> {
    const title = `Kanwoo - лучший сайт по чтению манги`;
    const description = `
        Kanwoo — читать мангу онлайн на русском. Более 10 000 тайтлов, ежедневные обновления. 
        Удобный плеер, без рекламы и регистрации. Присоединяйся!
    `
    
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

    const {viewport} = await searchParams;

    const {data: homeMap} = await homeServerAPI.getHomeMap()

    return (
        <>
            {viewport == "desktop" && (
                <HomePageDesktop map={homeMap}/>
            )}
            {viewport != "desktop" && (
                <HomePageMobile  map={homeMap}/>
            )}
        </>
    )
}