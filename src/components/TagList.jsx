import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Box, CircularProgress, Grid, Typography} from '@mui/material';
import {fetchTags, selectAllTags, selectTagsStatus, selectHasMore} from '../store/tagsSlice';
import TagListUI from "./TagListUI";
import _debounce from "lodash/debounce";

const TagList = () => {
    const dispatch = useDispatch();
    const tags = useSelector(selectAllTags);
    const status = useSelector(selectTagsStatus);
    const morePages = useSelector(selectHasMore);
    const [pageSize, setPageSize] = useState(25);
    const [sortType, setSortType] = useState("popular");
    const [pageNumber, setPageNumber] = useState(1);
    const [searchValue, setSearchValue] = useState("");

    useEffect(async () => {
        const delayedFetchTags = _debounce(async () => {
            await fetchTagsData();
        }, 500);
        await delayedFetchTags();
        return delayedFetchTags.cancel;
    }, [searchValue]);

    useEffect(async () => {
        await fetchTagsData();
    }, [pageSize, pageNumber, sortType]);


    const fetchTagsData = async () => {
        try {
            await dispatch(fetchTags({
                page_size: pageSize,
                page_number: pageNumber,
                sort_type: sortType,
                search: searchValue,

            }));

        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPageNumber(1);
    };

    const handlePageNumberChange = (newPageNumber) => {
        setPageNumber(newPageNumber);
    };

    const handleSortTypeChange = (newSortType) => {
        setSortType(newSortType);
    };

    const handleSearchChange = (newValue) => {
        setSearchValue(newValue);
    };

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
        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                minHeight="80vh"
                color="error.main"
                p={2}
                borderRadius={4}
            >
                <Typography variant="body1">
                    Error loading tags. Please try again later.
                </Typography>
            </Box>
        );
    }


    return (
        <TagListUI
            tags={tags}
            pageSize={pageSize}
            pageNumber={pageNumber}
            hasMorePages={morePages}
            sortOptions={[
                { label: "Popular", value: "popular" },
                { label: "Name", value: "name" },
                { label: "New content", value: "activity" },

            ]}
            selectedSort={sortType}
            searchValue={searchValue}
            onSortChange={handleSortTypeChange}
            onPageSizeChange={handlePageSizeChange}
            onPageNumberChange={handlePageNumberChange}
            onSearchChange={handleSearchChange}
        />
    );
};

export default TagList;
