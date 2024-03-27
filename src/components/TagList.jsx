import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Grid } from '@mui/material';
import TagListItem from './TagListItem';
import { fetchTags, selectAllTags, selectTagsStatus } from '../store/tagsSlice';

const TagList = () => {
    const dispatch = useDispatch();
    const tags = useSelector(selectAllTags);
    const status = useSelector(selectTagsStatus);

    useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    if (status === 'loading') {
        return <CircularProgress />;
    }

    if (status === 'failed') {
        return <div>Error loading tags.</div>;
    }

    return (
        <Grid container spacing={2}>
            {tags.map((tag) => (
                <Grid item key={tag.name} xs={12} sm={6} md={4}>
                    <TagListItem tag={tag} />
                </Grid>
            ))}
        </Grid>
    );
};

export default TagList;
