import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTagsFromApi } from '../api/stackOverflowApi';

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
    const response = await fetchTagsFromApi({
        page_size : 100,
        page_number : 1,
    });
    return response.items;
});

const tagsSlice = createSlice({
    name: 'tags',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectAllTags = (state) => state.tags.items;
export const selectTagsStatus = (state) => state.tags.status;

export default tagsSlice.reducer;
