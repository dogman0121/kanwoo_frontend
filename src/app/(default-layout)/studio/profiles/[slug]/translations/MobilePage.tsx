import AppPageHeader from "@/components/AppPageHeader";
import { setDrawerOpen } from "@/features/studio/states/studio-page.slice";
import { useAppDispatch } from "@/lib/state/hooks";
import { IconButton } from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { setCreateTranslationDialogOpen } from "@/features/studio/states/profile/page.slice";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import StudioList from "@/features/studio/components/List";

export default function MobilePage() {
    const dispatch = useAppDispatch()

    return (
        <>
            <AppPageHeader 
                startAdornment={
                    <IconButton
                        onClick={() => dispatch(setDrawerOpen(true))}
                    >
                        <MenuRoundedIcon />
                    </IconButton>
                }
                endAdornment={
                    <IconButton onClick={() => dispatch(setCreateTranslationDialogOpen(true))}>
                        <AddRoundedIcon />
                    </IconButton>
                }
                label="Переводы"
            />
            <StudioList>
                
            </StudioList>
        </>
    )
}