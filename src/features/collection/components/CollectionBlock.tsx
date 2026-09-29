import PostersStack from "@/components/poster/PostersStack";
import WrappedText from "@/components/WrapperTypography";
import { Collection } from "@/types/collection";
import { Box, Icon, Paper, SvgIcon, Typography } from "@mui/material";
import React from "react";
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import Link from "next/link";
import { routes, toHref } from "@/constants/routes/main.routes";

function CollectionStat({
    icon,
    label
}: {
    icon: React.ReactElement,
    label: string
}) {
    return (
        <Box
            sx={{
                
            }}
        >
            <Typography 
                variant="caption" 
                color="textSecondary" 
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                
                    px: 0.4
                }}
            >
                <SvgIcon
                    sx={{
                        color: "textSecondary",
                        fontSize: "12px"
                    }}
                >
                    {icon}
                </SvgIcon>
                {label}
            </Typography>
        </Box>
    )
}

export default function CollectionBlock({
    collection
}: {collection: Collection}) {
    return (
        <Link href={toHref(routes.collections.item, {id: collection.id.toString()})}>
            <Paper
                elevation={1}
                sx={[
                    {
                        "&:hover": {
                            cursor: "pointer"
                        },
                        height: "210px"
                    },
                    (theme) => theme.applyStyles("light", {
                        backgroundColor: "rgba(255, 255, 255, 0.65)"
                    })
                ]}
            >
                <Box
                    sx={{
                        position: "relative",
                        height: "60%",

                        px: 3,
                        pt: 4,
                        zIndex: 1,
                    }}
                >
                    <PostersStack 
                        width={"100px"}
                        middleSrc={collection.preview[0]?.medium}
                        leftSrc={collection.preview[1]?.medium}
                        rightSrc={collection.preview[2]?.medium}
                    />
                </Box>
                <Paper
                    elevation={3}
                    sx={{
                        height: "40%",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: 'column',

                        position: "relative",
                        zIndex: 100,

                        borderRadius: 0,
                        borderBottomRightRadius: "6px",
                        borderBottomLeftRadius: "6px",
                        p: 2
                    }}
                >
                    <Box>
                        <CollectionStat icon={<GridViewRoundedIcon />} label={`${collection.manga_count} манг`}/>
                    </Box>
                    <WrappedText
                        variant="h3"
                        lines={2}
                        textAlign={"center"}
                    >
                        {collection.name}
                    </WrappedText>
                </Paper>
            </Paper>
        </Link>
    )
}