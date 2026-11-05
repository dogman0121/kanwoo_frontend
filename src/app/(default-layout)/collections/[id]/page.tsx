import { collectionServerAPI } from "@/features/collection/api/server.api";
import CollectionPageDesktop from "@/features/collection/pages/CollectionPageDesktop";
import CollectionPageMobile from "@/features/collection/pages/CollectionPageMobile";
import { notFound } from "next/navigation";

export async function generateMetadata({
    params
}: {
    params: Promise<{id: string}>
}) {
    const {id} = await params;

    try {
        const response = await collectionServerAPI.getCollection(parseInt(id))
        return {
        
        }
    } catch (e) {
        return notFound()
    }
}

export default async function Page({
    params,
    searchParams
}: {
    params: Promise<{id: string}>,
    searchParams: Promise<{ viewport: string }>
}) {
    const {id} = await params
    const {viewport} = await searchParams

    try {
        const response = await collectionServerAPI.getCollection(parseInt(id))

        return (
            <>
                {viewport == "desktop" && (
                    <CollectionPageDesktop 
                        collection={{
                            data: response.data,
                            context: response.context
                        }}
                    />
                )}
                {viewport != "desktop" && (
                    <CollectionPageMobile 
                        collection={{
                            data: response.data,
                            context: response.context
                        }}
                    />
                )}
            </>
        )
    } catch (e) {
        return notFound()
    }

    
}