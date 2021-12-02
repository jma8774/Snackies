import React from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const brands = ["All", "Lays", "Pringles", "KitKat", "Doritos", "Pocky", "Nature Valley", "Cheetos", "Snickers", "Oreo", "Hershey"]

const BrandChips = (props) => {
  const {filterBrand, handleFilterChange} = props
  return (
    <Box>
      <Stack direction="row" spacing={1}>
        {brands.map((brand) => {
          return (
            <Chip key={brand} label={brand} variant="filled" color={filterBrand === brand ? "success" : "default"} onClick={handleFilterChange} />
          )
        })}
      </Stack>
    </Box>
  )
}

export default BrandChips
