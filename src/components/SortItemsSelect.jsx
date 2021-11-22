import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SortItemsSelect = (props) => {
  const { sort, handleSortChange } = props
  return (
    <Box sx={{ width: 250}} >
      <FormControl fullWidth>
        <InputLabel variant="filled" color="secondary">Sort By</InputLabel>
        <Select
          value={sort}
          label="Sort By"
          onChange={handleSortChange}
          variant="filled"
          color="secondary"
        >
          <MenuItem value={0}>Rating: High to Low </MenuItem>
          <MenuItem value={1}>Rating: Low to High</MenuItem>
          <MenuItem value={2}>Price: High to Low</MenuItem>
          <MenuItem value={3}>Price: Low to High</MenuItem>
          <MenuItem value={4}>Name: A-Z</MenuItem>
          <MenuItem value={5}>Name: Z-A</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SortItemsSelect
