import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Box, CircularProgress, Grid, LinearProgress} from '@mui/material';
import TagListItem from './TagListItem';
import { fetchTags, selectAllTags, selectTagsStatus } from '../store/tagsSlice';
import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';


const TagList = () => {
    const dispatch = useDispatch();
    const tags = useSelector(selectAllTags);
    const status = useSelector(selectTagsStatus);

    useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    if (status === 'loading') {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <CircularProgress />
                </Grid>
            </Grid>
        );
    }

    if (status === 'failed') {
        return <div>Error loading tags.</div>;
    }
    const rows: GridRowsProp = tags.map((tag) => ({
        id: tag.name,
        col1: tag.name,
        col2: tag.count,
    }));
    // const rows: GridRowsProp = [
    //     { id: 1, col1: 'Hello', col2: 'World' },
    //     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    //     { id: 3, col1: 'MUI', col2: 'is Amazing' },
    // ];

    const columns: GridColDef[] = [
        { field: 'col1', headerName: 'Column 1', width: 300 },
        { field: 'col2', headerName: 'Column 2', width: 300 },
    ];

    return (
        <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                sx={{
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },
                }}/>

        </Box>
        // <Grid container spacing={2}>
        //     {tags.map((tag) => (
        //         <Grid item key={tag.name} xs={12} sm={6} md={4}>
        //             <TagListItem tag={tag} />
        //         </Grid>
        //     ))}
        // </Grid>
    );
};

export default TagList;
