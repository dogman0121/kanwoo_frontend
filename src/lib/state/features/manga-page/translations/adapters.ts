import { createEntityAdapter } from "@reduxjs/toolkit";
import { TranslationBlock } from "./state";

export const translationsAdapter = createEntityAdapter({
    selectId: (translation: TranslationBlock) => translation.translation.id,
})