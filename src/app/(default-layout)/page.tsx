import { Metadata } from "next";
import PPage from "./PPage";
import { homeServerAPI } from "@/features/home/api/server.api";

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

    const {data: homeMap} = await homeServerAPI.getHomeMap()

    return (
        <PPage homeMap={homeMap}/>
    )
}