import React from 'react';
import { Paper, Typography } from '@mui/material';

const TagListItem = ({ tag }) => {
    return (
        <Paper elevation={3}>
            <Typography variant="h6">{tag.name}</Typography>
            <Typography variant="body2">Count: {tag.count}</Typography>
        </Paper>
    );
};

export default TagListItem;
