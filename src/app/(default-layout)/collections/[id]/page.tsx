import { collectionServerAPI } from "@/features/collection/api/server.api";
import PPage from "./PPage";

export async function generateMetadata({
    params
}: {
    params: Promise<{id: string}>
}) {
    const {id} = await params;

    const response = await collectionServerAPI.getCollection(parseInt(id))

    return {
        
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

    const response = await collectionServerAPI.getCollection(parseInt(id))
    
    return (
        <PPage 
            deviceType={viewport} 
            collection={response.data}
            collectionContext={response.context}
        />
    )
}