import AuthProfile from "@/types/authProfile";
import Collection from "@/types/collection/collection";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthProfileState {
    profile?: AuthProfile | null,
    collections: Collection[]
}

const initialState: AuthProfileState = {
    profile: undefined,
    collections: []
}

export const authProfileSlice = createSlice({
    name: "auth_profile",
    initialState,
    reducers: {
        setAuthProfile: (state, action) => {
            state.profile = action.payload
        },
        setAuthProfileCollections: (state, action) => {
            state.collections = action.payload
        },
        addAuthProfileCollection: (state, action) => {
            const newCollections = [...state.collections]
            newCollections.push(action.payload)

            state.collections = newCollections
        },
        updateAuthProfileCollection: (state, action) => {
            const collectionInd = state.collections.findIndex(val => val.id == action.payload.id)

            state.collections[collectionInd] = action.payload
        },
        addMangaIntoAuthProfileCollection: (state, action) => {
            console.log(state.collections)
            const { id, manga } = action.payload;
            const index = state.collections.findIndex(c => c.id === id);
            if (index !== -1) {
                state.collections[index] = {
                    ...state.collections[index],
                    manga: [...state.collections[index].manga, manga]
                };
            }
        },
        removeMangaFromAuthProfileCollection: (state, action) => {
            const { id, manga } = action.payload;
            const collectionIndex = state.collections.findIndex(c => c.id === id);
            if (collectionIndex !== -1) {
                // Заменяем массив manga на новый, отфильтрованный (без удаляемого элемента)
                state.collections[collectionIndex].manga = state.collections[collectionIndex].manga.filter(
                    m => m.id !== manga.id
                );
            }
        }
    }
})

export const { 
    setAuthProfile, 
    setAuthProfileCollections, 
    addAuthProfileCollection, 
    updateAuthProfileCollection,
    addMangaIntoAuthProfileCollection,
    removeMangaFromAuthProfileCollection
} = authProfileSlice.actions

export default authProfileSlice.reducer