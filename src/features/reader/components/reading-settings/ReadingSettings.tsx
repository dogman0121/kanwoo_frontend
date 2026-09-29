"use client"

import { AppBackdropProps } from "@/components/AppBackdrop";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { Backdrop, Box, BoxProps, IconButton, ListItemButton, ListItemText, Paper, PaperProps, styled, Switch, ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps, Typography } from "@mui/material";
import { ChangeEvent, Children, MouseEvent, useState } from "react";
import ReportRoundedIcon from "@mui/icons-material/ReportRounded"
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { ShareMobile } from "@/components/Share";
import SwipePreview from "./SwipePreview";
import ClickPreview from "./ClickPreview";
import { openReportDialog } from "@/features/global/states/app/slice";
import { selectReadingSettings } from "../../states/reading-settings/selectors";
import { selectCurrentChapter } from "../../states/reader/selectors";
import { setAligment, setAutoSave, setInfinityChapter, setPageNumbers, setVariant } from "../../states/reading-settings/slice";
import useHorizontalCenter from "../../hooks/useHorizontalCenter";

function BackdropBody({sx, ...props}: PaperProps) {
    return (
        <Paper
            elevation={1}
            sx={{
                width: "100%",
                borderRadius: "16px",
                px: 3,
                py: 2,
                overflow: "hidden",

                ...sx
            }}
            {...props}
        />
    )
}

const BackdropListButton = styled(ListItemButton)(({theme}) => ({
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
}))

function SwitchSetting({children}: {children: React.ReactNode}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            {Children.map(children, c => c)}
        </Box>
    )
}

export default function ReadingSettings({open, onClose}: AppBackdropProps) {
    const dispatch = useAppDispatch()
    
    const settings = useAppSelector(selectReadingSettings)
    const leftStyles = useHorizontalCenter()

    const [shareOpen, setShareOpen] = useState(false);

    const currChapter = useAppSelector(selectCurrentChapter)

    if (!currChapter)
        return
    
    return (
        <>
            <Backdrop
                open={open}
                onClick={onClose}
                sx={{
                    zIndex: 10
                }}
            >
                <Box
                    onClick={(event) => event.stopPropagation()}
                    sx={{
                        position: "absolute",
                        maxWidth: "600px",
                        width: "100%",
                        bottom: "0",
                        left: leftStyles,
                        transform: "translate(-50%)",
                        transition: ".3s",
                        p: "10px",

                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    <BackdropBody>
                        <Typography fontWeight={600} textAlign={"center"}>Настройки</Typography>
                        <Box
                            sx={{
                                mt: "15px",
                                display: "flex",
                                flexDirection: "column",
                                gap: 2
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px"
                                }}
                            >
                                <Typography>Режим чтения</Typography>
                                <ToggleButtonGroup
                                    value={settings.aligment}
                                    exclusive
                                    onChange={(_event: MouseEvent<HTMLElement>, newAligment: string) => {
                                        if (newAligment)
                                            dispatch(setAligment(newAligment))
                                    }}
                                >
                                    <ToggleButton 
                                        value={"auto"} key={"auto"}>Авто</ToggleButton>
                                    <ToggleButton value={"vertical"} key={"vertical"}>Верт.</ToggleButton>
                                    <ToggleButton value={"horizontal"} key={"horizontal"}>Горизонт.</ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                             <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px"
                                }}
                            >
                                <Typography>Вариант</Typography>
                                <ToggleButtonGroup
                                    value={settings.variant}
                                    exclusive
                                    onChange={(_event: MouseEvent<HTMLElement>, newVariant: string) => {
                                        if (newVariant)
                                            dispatch(setVariant(newVariant))
                                    }}
                                >
                                    <ToggleButton 
                                        value={"swipe"} key={"swipe"}><SwipePreview /></ToggleButton>
                                    <ToggleButton value={"click"} key={"click"}><ClickPreview /></ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                            <SwitchSetting>
                                <Typography>
                                    Автосохранение
                                </Typography>
                                <Switch 
                                    checked={settings.autoSave}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        dispatch(setAutoSave(event.target.checked))
                                    }}
                                />
                            </SwitchSetting>
                            <SwitchSetting>
                                <Typography>
                                    Показывать номера страниц
                                </Typography>
                                <Switch 
                                    checked={settings.pageNumbers}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        dispatch(setPageNumbers(event.target.checked))
                                    }}
                                />
                            </SwitchSetting>
                            <SwitchSetting>
                                <Typography>
                                    Бесконечная глава
                                </Typography>
                                <Switch 
                                    checked={settings.infinityChapter}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        dispatch(setInfinityChapter(event.target.checked))
                                    }}
                                />
                            </SwitchSetting>
                        </Box>
                        <IconButton
                            sx={{
                                position: "absolute",
                                right: "15px",
                                top: "10px"
                            }}
                            onClick={onClose}   
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </BackdropBody>
                    <BackdropBody
                        sx={{
                            p: "0"
                        }}
                    >
                        <BackdropListButton
                            onClick={() => setShareOpen(true)}
                        >
                            <ListItemText>
                                Поделиться
                            </ListItemText>
                            <ReplyRoundedIcon />
                        </BackdropListButton>
                    </BackdropBody>
                    <BackdropBody
                        sx={{
                            p: "0"
                        }}
                    >
                        <BackdropListButton
                            onClick={() => dispatch(openReportDialog({"type": "chapter", entityID: currChapter.id}))}
                        >
                            <ListItemText>
                                Пожаловаться
                            </ListItemText>
                            <ReportRoundedIcon />
                        </BackdropListButton>
                    </BackdropBody>
                </Box>
            </Backdrop>
            <ShareMobile 
                link={`/chapters/${currChapter.id}`}
                open={shareOpen}
                onClose={() => setShareOpen(false)}
            />
        </>
    )
}