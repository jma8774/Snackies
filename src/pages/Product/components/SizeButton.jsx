import React from 'react'
import Button from '@mui/material/Button';

function SizeButton(props) {
  const { size, sizeSelected, setSizeSelected, index } = props
  return (
    <Button 
      variant={sizeSelected === index ? "contained" : "outlined"} 
      onClick={() => setSizeSelected(index)}
      color="secondary" 
      sx={{mr: 2, textTransform: "lowercase" }}
    > 
      {size.size} 
    </Button>
  )
}

export default SizeButton
