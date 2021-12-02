import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const QuantitySelect = (props) => {
  const { quantity, setQuantity } = props
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <Box sx={{ width: 100}} >
      <FormControl fullWidth>
        <InputLabel variant="outlined" color="primary"> Quantity </InputLabel>
        <Select
          value={quantity}
          label="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
          variant="outlined"
          color="primary"
        >
          { options.map((option) => {
            return <MenuItem key={option} value={option}> {option} </MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default QuantitySelect
