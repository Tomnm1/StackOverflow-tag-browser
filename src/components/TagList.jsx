import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress, Grid } from '@mui/material';
import { fetchTags, selectAllTags, selectTagsStatus, selectHasMore } from '../store/tagsSlice';
import TagListUI from "./TagListUI";

const TagList = () => {
    const dispatch = useDispatch();
    const tags = useSelector(selectAllTags);
    const status = useSelector(selectTagsStatus);
    const morePages = useSelector(selectHasMore);
    const [pageSize, setPageSize] = useState(25);
    const [sortType, setSortType] = useState("popular");
    const [pageNumber, setPageNumber] = useState(1);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        fetchTagsData();
    }, [pageSize, pageNumber, sortType]);

    const fetchTagsData = async () => {
        try {
            await dispatch(fetchTags({
                page_size: pageSize,
                page_number: pageNumber,
                sort_type: sortType,
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
        return <div>Error loading tags.</div>;
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
