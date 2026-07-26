import { 
    Accordion, 
    AccordionActions, 
    AccordionActionsProps, 
    AccordionDetails, 
    AccordionDetailsProps, 
    AccordionProps, 
    AccordionSummary, 
    AccordionSummaryProps, 
    useTheme
} from "@mui/material";
import ExpandModeRoundedIcon from "@mui/icons-material/ExpandMoreRounded"

export function AdminAccordionActions({sx, ...props}: AccordionActionsProps) {
    return (
        <AccordionActions 
            sx={{
                ...sx
            }}
            {...props}
        />
    )
}

export function AdminAccordionDetails({sx, ...props}: AccordionDetailsProps) {
    return (
        <AccordionDetails 
            sx={{
                px: "20px",
                pt: "20px",
                borderTop: "1px solid",
                borderColor: "divider"
            }}
            {...props}
        />
    )
}

export function AdminAccordionSummary({sx, ...props}: AccordionSummaryProps) {
    const theme = useTheme()

    return (
        <AccordionSummary 
            expandIcon={<ExpandModeRoundedIcon />}
            sx={{
                border: "none",
                px: theme.spacing(3),
                ...sx
            }}
            {...props}
        />
    )
} 

export function AdminAccordion({sx, ...props}: AccordionProps) {
    return (
        <Accordion 
            disableGutters
            elevation={0}
            sx={{
                boxShadow: "none",
                bgcolor: "secondary.main",
                borderRadius: "12px",

                "&:first-of-type, &:last-of-type": {
                    borderRadius: "12px"
                },
                "&::not(:last-child)": {
                    borderBottom: 0
                },
                "&::before": {
                    display: "none"
                },
                ...sx
            }}
            {...props}
        />
    )
}