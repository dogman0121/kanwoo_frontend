import { serverFetch } from "@/lib/api/serverFetch";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ListPage from "./ListPage";

export async function generateMetadata({
    params 
}: {
    params: Promise<{listId: string}>
}): Promise<Metadata> {
    const { listId } = await params;

    const {data: list} = await serverFetch.get(`/lists/${listId}`)

    if (!list){
        return notFound();
    }
 
    return {
        title: `Коллекция ${list.name} | kanwoo`,
        description: list.description,
        openGraph: {
            url: `https://kanwoo.ru/lists/${listId}`,
            title: `Коллекция ${list.name} | kanwoo`,
            description: list.description,
            siteName: "Kanwoo"
        },
    }
}

export default async function Page({
    params,
    searchParams
}: {
    params: Promise<{listId: string}>,
    searchParams: Promise<{ viewport: string }>
}) { 
    const { listId } = await params;

    const { viewport } = await searchParams;

    const {data: list} = await serverFetch.get(`/lists/${listId}`)

    if (!list){
        return notFound();
    }

    return (
        <ListPage list={list} viewport={viewport}/>
    )
}