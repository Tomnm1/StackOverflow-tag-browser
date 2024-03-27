import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from './tagsSlice';

export default configureStore({
    reducer: {
        tags: tagsReducer,
    },
});
