import { styled } from "@mui/material";

const ReaderContainer = styled('main', { shouldForwardProp: (prop) => prop !== 'drawerOpen' })<{
    drawerOpen?: boolean;
}>(({ theme }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
    position: 'relative',
    variants: [
        {
        props: ({ drawerOpen }) => drawerOpen,
            style: {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginRight: 400,
            },
        },
    ],
}));

export default ReaderContainer;
