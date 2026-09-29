import { createAsyncThunk } from "@reduxjs/toolkit"
import { collectionClientApi } from "../../api/client.api"

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
        const response = await collectionClientApi.getManga(id)

        return {
            response: response
        }
    }
)

export const createCollection = createAsyncThunk(
    "addCollectionStatus",
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
    async (data: {mangaSlug: string, collectionId: number}, thunkAPI) => {
        await collectionClientApi.addManga(data.collectionId, data.mangaSlug)

        return {
            mangaSlug: data.mangaSlug,
            collectionId: data.collectionId
        }
    }
) 

export const removeMangaFromCollection = createAsyncThunk(
    "removeMangaFromCollectionStatus",
    async (data: {mangaSlug: string, collectionId: number}, thunkAPI) => {
        await collectionClientApi.removeManga(data.collectionId, data.mangaSlug)

        return {
            mangaSlug: data.mangaSlug,
            collectionId: data.collectionId
        }
    }
)