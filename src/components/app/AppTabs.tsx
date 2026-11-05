"use client"

import Tab, { TabProps } from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material';

export const AppTabContext = TabContext;

export const AppTab = ({...props}: TabProps) => {
    return <Tab 
        {...props}
        sx={{
            textTransform: "capitalize",
            color: "text.primary",
            padding: "10px 30px",
            "&.Mui-selected": {
                color: "text.primary"
            }
        }}
    />
}

export const AppTabList = TabList

export const AppTabPanel = styled(TabPanel)(({theme}) => ({
    padding: 0,
    marginTop: theme.spacing(3)
}))

