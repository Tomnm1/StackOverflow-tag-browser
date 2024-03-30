import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TagList from '../components/TagList';

const mockStore = configureStore([]);

const mockTags = [
    { id: 1, name: 'JavaScript', count: 1000 },
    { id: 2, name: 'React', count: 800 },
    { id: 3, name: 'HTML', count: 700 },
    { id: 4, name: 'Python', count: 1200 },
];

export default {
    title: 'TagList',
    component: TagList,
};

export const Default = () => {
    const store = mockStore({
        tags: {
            items: mockTags,
            status: 'idle',
            error: null,
            hasMore: false,
        },
    });

    return (
        <Provider store={store}>
            <TagList />
        </Provider>
    );
};

export const Loading = () => {
    const store = mockStore({
        tags: {
            items: [],
            status: 'loading',
            error: null,
            hasMore: false,
        },
    });

    return (
        <Provider store={store}>
            <TagList />
        </Provider>
    );
};

export const Error = () => {
    const store = mockStore({
        tags: {
            items: [],
            status: 'failed',
            error: 'Error loading tags. Please try again later.',
            hasMore: false,
        },
    });

    return (
        <Provider store={store}>
            <TagList />
        </Provider>
    );
};
