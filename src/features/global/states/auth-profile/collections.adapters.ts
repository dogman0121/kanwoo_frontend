import { Collection } from "@/types/collection";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const collectionsAdapter = createEntityAdapter({
    selectId: (collection: Collection) => collection.id
})