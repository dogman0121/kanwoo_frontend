import { BoxProps, styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext } from "react";
import SearchContext from "../context/SearchContext";
import SearchSection from "../types/searchSection";

const SectionToggleGroup = styled(ToggleButtonGroup)(({theme}) => ({
    columnGap: theme.spacing(1),
}))

const SectionToggleButton = styled(ToggleButton)(({theme}) => ({
    padding: `3px ${theme.spacing(2)}`,
    textTransform: "none",
    border: "none",
    borderRadius: "6px",
    lineHeight: "1.4",

    "&.MuiToggleButtonGroup-firstButton": {
        borderRight: "inherit",
        borderTopRightRadius: "inherit",
        borderBottomRightRadius:"inherit",
    },

    "&.MuiToggleButtonGroup-lastButton": {
        borderLeft: "inherit",
        borderTopLeftRadius: "inherit",
        borderBottomLeftRadius: "inherit",
    },
}))

function SearchSectionSelector({ sx }: BoxProps) {
    const { section, setSection } = useContext(SearchContext);

    const handleChoose = (_event: React.MouseEvent<HTMLElement>, newValue: SearchSection) => {
        if (newValue !== null)
            setSection(newValue);
    }

    return (
        <SectionToggleGroup
            value={section}
            onChange={handleChoose}
            exclusive
            sx={{
                ...sx
            }}
        >
            <SectionToggleButton value={SearchSection.MANGA}>манга</SectionToggleButton>
            <SectionToggleButton value={SearchSection.PROFILE}>профили</SectionToggleButton>
        </SectionToggleGroup>
    )
}

export default SearchSectionSelector;