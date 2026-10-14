import EditHeader from "@/components/edit/EditHeader";
import EditHeaderNav from "@/components/edit/EditHeaderNav";
import StudioList from "@/features/studio/components/List";
import { setCreateTranslationDialogOpen } from "@/features/studio/states/profile/page.slice";
import { useAppDispatch } from "@/lib/state/hooks";
import { Button } from "@mui/material";

export default function DesktopPage() {
    const dispatch = useAppDispatch()

    return (
        <>
            <EditHeader>Мои переводы</EditHeader>
            <EditHeaderNav 
                buttons={
                    <>
                        <Button
                            variant="contained"
                            onClick={() => dispatch(setCreateTranslationDialogOpen(true))}
                        >
                            Создать
                        </Button>
                    </>
                }
            />
            <StudioList>
                
            </StudioList>
        </>
    )
}