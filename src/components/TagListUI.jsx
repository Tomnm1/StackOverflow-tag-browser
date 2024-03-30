import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, IconButton, InputAdornment, TextField, Typography,} from "@mui/material";
import {ArrowBack, ArrowForward, Search} from '@mui/icons-material';

const TagListUI = (props) => {
    const {
        tags, pageSize, hasMorePages, pageNumber, onPageSizeChange, onPageNumberChange, onSortChange, onSearchChange, sortOptions, selectedSort, searchValue,} = props;
    const handlePageSizeChange = (event) => {
        const newSize = parseInt(event.target.value);
        onPageSizeChange(newSize);
    };

    const handlePrevPage = () => {
        onPageNumberChange(pageNumber - 1);
    };

    const handleNextPage = () => {
        onPageNumberChange(pageNumber + 1);
    };

    const handleSortChange = (e) => {
            onSortChange(e.target.value);
    };

    const handleSearchChange = (e) => {
        onSearchChange(e.target.value);
    };

    return (
        <Box height="100%" display="flex" flexDirection="column">
            <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <TextField
                        label="Search"
                        value={searchValue}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box>
                    <Select
                        value={selectedSort}
                        onChange={handleSortChange}>
                        {sortOptions.map((option, index) => (
                            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </Box>
            </Box>
            <Box flex="1">

                <TableContainer style={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Tag Name</strong></TableCell>
                                <TableCell><strong>Post Count</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        {!tags.length && (
                            <TableRow
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                minHeight="20vh">
                                <Typography variant="p" color="textSecondary">
                                    No tags found.
                                </Typography>
                            </TableRow>
                        )}
                        <TableBody>
                            {tags.map((tag) => (
                                <TableRow key={tag.name}>
                                    <TableCell>{tag.name}</TableCell>
                                    <TableCell>{tag.count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box p={2} borderTop="1px solid #ccc" display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <Select
                        value={pageSize}
                        onChange={handlePageSizeChange}>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </Box>
                <Box>
                    <IconButton disabled={pageNumber === 1} onClick={handlePrevPage}>
                        <ArrowBack />
                    </IconButton>
                    <IconButton disabled={pageNumber === hasMorePages || !tags.length} onClick={handleNextPage}>
                        <ArrowForward />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default TagListUI;
