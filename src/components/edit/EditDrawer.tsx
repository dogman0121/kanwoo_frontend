import theme from "@/constants/themes/main.theme";
import { useAppSelector } from "@/lib/state/hooks";
import { Box, Drawer, DrawerProps, IconButton, styled } from "@mui/material";
import { Children } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { selectDeviceType } from "@/features/global/states/app/slice";

const drawerWidth = 280;


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function EditDrawer({children, onClose, open, ...props}: DrawerProps) {
    const deviceType = useAppSelector(selectDeviceType)

    const handleDrawerClose = () => {
        onClose?.({}, "escapeKeyDown")
    }

    return (
        <Drawer
            elevation={0}
            open={open}
            onClose={onClose}
            variant={deviceType == "desktop" ? "permanent" : "temporary"}
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': { 
                    width: drawerWidth, 
                    boxSizing: 'border-box',
                    bgcolor: "background.default",
                },
            }}
            {...props}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            {Children.map(children, c => c)}
        </Drawer>
    )
}