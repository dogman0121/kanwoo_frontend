import theme from "@/theme";
import { Box, Drawer, DrawerProps, Toolbar } from "@mui/material";

const drawerWidth = 260;

export default function EditSections({children, ...props}: DrawerProps) {
    return (
        <Drawer
            variant="permanent"
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
            <Toolbar />
            {children}
        </Drawer>
    )
}