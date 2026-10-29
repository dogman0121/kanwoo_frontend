import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Hero } from "../../types";
import { MangaShort } from "@/types/manga";
import { homeClientAPI } from "../../api/client.api";
import { ApiError } from "@/lib/fetch/api-response.types";
import { openSnackbar } from "@/features/global/states/app/slice";
import { HomeBlockData, HomePageMap } from "../../types/hero";

export interface HomeBlockState {
    hash: string,
    data?: HomeBlockData,
    status: string
}

const adapter = createEntityAdapter({
    selectId: (homeBlock: HomeBlockState) => homeBlock.hash
})

const initialState = adapter.getInitialState()

type RootState = {
    homePage: {page: typeof initialState}
}

export const loadBlocks = createAsyncThunk(
    "homePage/loadBlockStatus",
    async (blocks: string[], thunkAPI) => {
        thunkAPI.dispatch(setBlocksStatuses({blocksHash: blocks, status: "loading"}))

        try {
            const response = await homeClientAPI.getHomeBlocks(blocks)
            
            return {
                response
            }
        } catch (e) {
            let errorMessage = "нет доступа к интернету. Проверьте связь и обновите страницу."

            if (e instanceof ApiError) {
                errorMessage = "неизвестная ошибка. Попробуйте позже."
                thunkAPI.rejectWithValue(e)
            }

            thunkAPI.dispatch(setBlocksStatuses({blocksHash: blocks, status: "error"}))
            thunkAPI.dispatch(openSnackbar({type: 'error', message: `Произошла ошибка: ${errorMessage}`}))
            
            throw e
        }
    }
)

export const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        initializeMap: (state, action: PayloadAction<{map: HomePageMap}>) => {
            const {map} = action.payload

            for (let mapItem of map) {
                adapter.addOne(state, {
                    hash: mapItem.hash,
                    status: "idle",
                    data: undefined
                })
            }
        },

        setBlocksStatuses: (state, action: PayloadAction<{blocksHash: string[], status: string}>) => {
            const {blocksHash, status} = action.payload

            for (let hash of blocksHash) {
                state.entities[hash].status = status
            }
        }
    },
    extraReducers: (builder) => (builder
        .addCase(loadBlocks.fulfilled, (state, action) => {
            const blocksHash = action.meta.arg
            const { response } = action.payload

            for (let i = 0; i < blocksHash.length; i++) {
                state.entities[blocksHash[i]].data = response.data[i]
                state.entities[blocksHash[i]].status = "loaded"
            }
        })
    )
})

export const {
    initializeMap,
    setBlocksStatuses
} = homePageSlice.actions

export const {
    selectById: selectBlockByHash
} = adapter.getSelectors((state: RootState) => state.homePage.page)

export const selectBlockStatus = (state: RootState, hash: string) => {
    const block = selectBlockByHash(state, hash)

    if (!block) return null

    return block.status
}

export const selectBlocks = (state: RootState) => {
    return state.homePage.page.entities
}

export default homePageSlice.reducer