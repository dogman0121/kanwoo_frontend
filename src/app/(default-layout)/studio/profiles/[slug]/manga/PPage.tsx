import { selectDeviceType } from "@/features/global/states/app/slice"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import DesktopPage from "./DesktopPage"
import MobilePage from "./MobilePage"
import CreateMangaDialog from "@/features/studio/components/CreateMangaDialog"
import { selectCreateMangaDialogOpen, setCreateMangaDialogOpen } from "@/features/studio/states/profile/page.slice"
import { Manga } from "@/features/manga/types"
import { addManga } from "@/features/studio/states/profile/manga.slice"
import { StudioManga } from "@/features/studio/types/studio-manga.type"

export default function PPage() {
    const dispatch = useAppDispatch()

    const createMangaDialogOpen = useAppSelector(selectCreateMangaDialogOpen)

    const deviceType = useAppSelector(selectDeviceType)

    const handleCreateManga = (manga: StudioManga) => {
        dispatch(addManga({
            data: manga
        }))
        dispatch(setCreateMangaDialogOpen(false))
    }

    return (
        <>
            {deviceType == "desktop" ?
                <DesktopPage />
                :
                <MobilePage />
            }
            <CreateMangaDialog 
                open={createMangaDialogOpen}
                onCreate={handleCreateManga}
                onClose={() => dispatch(setCreateMangaDialogOpen(false))}
            />
        </>
    )
}