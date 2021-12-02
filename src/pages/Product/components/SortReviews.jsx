import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SortReviews = (props) => {
  const { sort, handleSortChange } = props
  return (
    <Box sx={{ width: 200}} >
      <FormControl fullWidth>
        <InputLabel variant="filled" color="secondary">Sort By</InputLabel>
        <Select
          value={sort}
          label="Sort By"
          onChange={handleSortChange}
          variant="filled"
          color="secondary"
        >
          <MenuItem value={0}>Date: New to Old </MenuItem>
          <MenuItem value={1}>Rating: High to Low </MenuItem>
          <MenuItem value={2}>Rating: Low to High</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SortReviews
