import { CollectionBlock } from "@/features/collection"
import { selectCollections } from "@/features/collection/states/auth-profile-collections-page/slice"
import { useAppSelector } from "@/lib/state/hooks"
import { Collection } from "@/types/collection"
import { Grid, GridProps, Typography } from "@mui/material"

export default function CollectionsList({...props}: GridProps) {
    const collections: Collection[] = useAppSelector(selectCollections)

    if (collections.length == 0)
        return (
            <Typography
                color="textSecondary"
                textAlign={"center"}
                py={4}
            >
                У вас нет коллекций
            </Typography>
        )

    return (
        <Grid 
            container 
            columns={{
                lg: 5,
                md: 4,
                sm: 3,
                xs: 2
            }} 
            spacing={{
                lg: 3,
                xs: 2
            }} 
            {...props}
        >
            {collections.map(collection => (
                <Grid 
                    key={`collections_page_collection_${collection.id}`}
                    size={1}
                >
                    <CollectionBlock collection={collection} />
                </Grid>
            ))}
        </Grid>
    )
}