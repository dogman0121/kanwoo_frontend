import { createAsyncThunk } from "@reduxjs/toolkit"
import { collectionClientApi } from "../../api/client.api"
import { ApiError } from "@/lib/fetch/api-response.types"
import { openSnackbar } from "@/features/global/states/app/slice"

export const fetchCollections = createAsyncThunk(
    "fetchCollectionsStatus",
    async () => {
        const response = await collectionClientApi.getCollections("all")

        return {
            response: response
        }
    }
)

export const fetchCollectionManga = createAsyncThunk(
    "fetchCollectionMangaStatus",
    async (id: number) => {
        const response = await collectionClientApi.getCollectionManga(id)

        return {
            response: response
        }
    }
)

export const createCollection = createAsyncThunk(
    "createCollectionStatus",
    async (data: {name: string, privacyId: number}, thunkAPI) => {
        const response = await collectionClientApi.createCollection(data.name, data.privacyId)

        return {
            response: response
        }
    }
)

export const deleteCollection = createAsyncThunk(
    "deleteCollectionStatus",
    async (id: number, thunkAPI) => {
        const response = await collectionClientApi.deleteCollection(id)

        return {
            response: response
        }
    }
)

export const updateCollection = createAsyncThunk(
    "updateCollectionStatus",
    async (data: {collectionID: number, name: string, privacyID: number}, thunkAPI) => {
        const response = await collectionClientApi.updateCollection(data.collectionID, data.name, data.privacyID)

        return {
            collectionID: data.collectionID,
            response: response
        }
    }
)

export const addMangaIntoCollection = createAsyncThunk(
    "addMangaIntoCollectionStatus",
    async (data: {mangaId: number, collectionId: number}, thunkAPI) => {
        try {
            return await collectionClientApi.addMangaIntoCollection(data.collectionId, data.mangaId)
        } catch(e) {
            let errorMessage = "неизвестная ошибка";
            if (e instanceof ApiError) {
                if (e.code == "already_in_collection") {
                    errorMessage = "тайтл уже в коллекции"
                }
            }

            thunkAPI.dispatch(openSnackbar({type: "error", message: `Произошла ошибка: ${errorMessage}`}))
            return thunkAPI.rejectWithValue(e)
        }
    }
) 

export const removeMangaFromCollection = createAsyncThunk(
    "removeMangaFromCollectionStatus",
    async (data: {mangaId: number, collectionId: number}, thunkAPI) => {
        try{
            await collectionClientApi.removeMangaFromCollection(data.collectionId, data.mangaId)

            return {
                mangaId: data.mangaId,
                collectionId: data.collectionId
            }
        } catch(e) {
            let errorMessage = "неизвестная ошибка";

            thunkAPI.dispatch(openSnackbar({type: "error", message: `Произошла ошибка: ${errorMessage}`}))
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const saveCollection = createAsyncThunk(
    "saveCollectionStatus",
    async (collectionId: number, thunkAPI) => {
        try {
            return collectionClientApi.saveCollection(collectionId)
        } catch (e) {
            let errorMessage = "неизвестная ошибка";

            thunkAPI.dispatch(openSnackbar({type: "error", message: `Произошла ошибка: ${errorMessage}`}))
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const unsaveCollection = createAsyncThunk(
    "unsaveCollectionStatus",
    async (collectionId: number, thunkAPI) => {
        try {
            return collectionClientApi.unsaveCollection(collectionId)
        } catch (e) {
            let errorMessage = "неизвестная ошибка";

            thunkAPI.dispatch(openSnackbar({type: "error", message: `Произошла ошибка: ${errorMessage}`}))
            return thunkAPI.rejectWithValue(e)
        }
    }
)