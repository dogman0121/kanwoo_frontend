"use client"

import { Collection, CollectionContext } from "@/types/collection"
import DesktopPage from "./DesktopPage"
import MobilePage from "./MobilePage"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { addManga, selectAddMangaDialogOpen, selectCollection, selectEditDialogOpen, setAddMangaDialogOpen, setCollection, setEditDialogOpen } from "@/features/collection/states/collection-page/slice"
import EditDialog from "@/features/collection/components/EditDialog"
import AddMangaDialog from "./components/AddMangaDialog"
import { fetchCollectionManga } from "@/features/collection/states/lib/thunks"

export default function PPage({
    deviceType,
    collection,
    collectionContext
}: {
    deviceType: string,
    collection: Collection,
    collectionContext: CollectionContext
}) {
    const dispatch = useAppDispatch()

    const editDialogOpen = useAppSelector(selectEditDialogOpen)
    const addMangaDialogOpen = useAppSelector(selectAddMangaDialogOpen)

    useEffect(() => {
        dispatch(setCollection({collection: collection, context: collectionContext}))
        dispatch(fetchCollectionManga(collection.id))
    }, [collection])

    const stateCollection = useAppSelector(selectCollection)

    if (!stateCollection) return

    return (
        <>
            {deviceType == "desktop" ?
                <DesktopPage />
                :
                <MobilePage />
            }
            <EditDialog 
                collection={collection}
                open={editDialogOpen}
                onClose={() => dispatch(setEditDialogOpen(false))}
            />
            <AddMangaDialog
                open={addMangaDialogOpen}
                onClose={() => dispatch(setAddMangaDialogOpen(false))}
                onAdd={(manga) => dispatch(addManga(manga))}
                context={{
                    collectionID: stateCollection.id
                }}
            />
        </>
    )
}