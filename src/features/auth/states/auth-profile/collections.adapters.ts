import { CollectionContext } from "@/features/collection/types";
import { Collection } from "@/features/collection/types/collection.type";
import { Entity } from "@/lib/types/Entity.type";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const collectionsAdapter = createEntityAdapter({
    selectId: (collection: Entity<Collection, CollectionContext>) => collection.data.id
})