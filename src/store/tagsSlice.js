import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchTagsFromApi} from '../api/stackOverflowApi';

export const fetchTags = createAsyncThunk('tags/fetchTags', async (props) => {
    return await fetchTagsFromApi({
        page_size: props.page_size,
        page_number: props.page_number,
        sort_type: props.sort_type,
    });
});

const tagsSlice = createSlice({
    name: 'tags',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        hasMore: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.items;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectAllTags = (state) => state.tags.items;
export const selectTagsStatus = (state) => state.tags.status;
export const selectHasMore = (state) => state.tags.hasMore;

export default tagsSlice.reducer;
