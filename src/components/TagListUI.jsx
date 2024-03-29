import React from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Select,
    MenuItem,
    IconButton,
    InputAdornment, TextField,
} from "@mui/material";
import {ArrowBack, ArrowForward, Search} from '@mui/icons-material';

const TagListUI = (props) => {
    const {
        tags,
        pageSize,
        hasMorePages,
        pageNumber,
        onPageSizeChange,
        onPageNumberChange,
        onSortChange,
        onSearchChange,
        sortOptions,
        selectedSort,
        searchValue,
    } = props;

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

    const handleSortChange = (event) => {
        const newSort = event.target.value;
        onSortChange(newSort);
    };

    const handleSearchChange = (event) => {
        const newValue = event.target.value;
        onSearchChange(newValue);
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
                        label="Sort by"
                        value={selectedSort}
                        onChange={handleSortChange}
                    >
                        {sortOptions.map((option, index) => (
                            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </Box>
            </Box>
            <Box flex="1">
                <TableContainer style={{ maxHeight: 'calc(100vh - 240px)', overflow: 'auto' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tag Name</TableCell>
                                <TableCell>Post Count</TableCell>
                            </TableRow>
                        </TableHead>
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
                        label="Records per page"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                    >
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </Box>
                <Box>
                    <IconButton disabled={pageNumber === 1} onClick={handlePrevPage}>
                        <ArrowBack />
                    </IconButton>
                    <IconButton disabled={pageNumber === hasMorePages} onClick={handleNextPage}>
                        <ArrowForward />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default TagListUI;
