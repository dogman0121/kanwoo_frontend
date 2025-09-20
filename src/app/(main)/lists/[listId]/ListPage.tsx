"use client"

import { setList } from "@/lib/state/features/list/listSlice"
import { useAppStore } from "@/lib/state/hooks"
import List from "@/types/list"
import { Avatar, Box, Button, Chip, Typography } from "@mui/material"
import { useRef, useState } from "react"
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import ShareIcon from '@mui/icons-material/Share';
import theme from "@/theme"
import MangaItem from "@/components/MangaItem"
import { ShareDesktop, ShareMobile } from "@/components/Share"
import Link from "next/link"

export default function ListPage({list, viewport}: {list: List, viewport: string}) {
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        store.dispatch(setList(list))
        initialized.current = true
    }

    const [shareOpen, setShareOpen] = useState(false);

    return (
        <Box
            sx={{
                maxWidth: "1240px",
                px: "20px",
                mx: "auto",
                mt: "55px",

                display: "flex",
                flexDirection: "column",
                rowGap: "15px"
            }}
        >
            <Typography variant="h1">
                {list.name}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "10px",
                    alignItems: "center"
                }}
            >
                <Typography>Автор:</Typography>
                <Link
                    href={`/users/${list.creator?.login}`}
                >
                    <Chip avatar={<Avatar src={list.creator.avatar}/>} label={list.creator.login} />
                </Link>
            </Box>
            <Typography 
                variant="caption"
                sx={{
                    fontSize: "14px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <BookmarkBorderRoundedIcon 
                    sx={{
                        width: "22px",
                        height: "22px",
                        mr: "3px"
                    }}
                /> 
                {list.saves_count} сохранений
            </Typography>
            <Typography>
                {list.description}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "10px"
                }}
            >
                <Button variant="contained">Сохранить</Button>
                <Button 
                    onClick={() => setShareOpen(true)}
                    variant="contained"
                    sx={{
                        bgcolor: theme.vars?.palette.secondary.main
                    }}
                >
                    <ShareIcon 
                        sx={{
                            color: theme.typography.body1.color
                        }}
                    />
                </Button>
                {viewport == "desktop" ? 
                    <ShareDesktop open={shareOpen} onClose={() => setShareOpen(false)} link={`/lists/${list.id}`}/>
                    :
                    <ShareMobile open={shareOpen} onClose={() => setShareOpen(false)} link={`/lists/${list.id}`}/>
                }
            </Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: theme.spacing(2),
                }}
            >
                {list.manga?.map((m) => (
                    <MangaItem key={m.id} manga={m} form="square"/>
                ))}
            </Box>
        </Box>
    )
}