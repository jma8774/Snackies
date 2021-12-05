import React from 'react'
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import defaultImage from '../../../assets/icon.png';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const WishCard = (props) => {
  const history = useHistory()
  const { item, loading, handleRemove } = props

  return (
    <Paper variant="outlined" sx={{ px: 2, py: 2, mt: 2, mx: "auto", 
      width: {xs: "100%", sm: "75%", lg: "50%"},
      
    }}>
      <Box display="flex"> 
        <Typography variant="h6" flexGrow={1}> {item.name} </Typography> 
        <Box flexBasis="auto" > 
          <IconButton color="error" onClick={() => handleRemove(item._id)}> 
            <DeleteIcon color="error" /> 
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" mt={1}>
        <Rating name="read-only" value={item.rating} precision={0.5} readOnly /> 
        <Tooltip title={`${parseFloat(item.rating).toFixed(2)} stars`}>
          <Box component={Typography} variant="body1" color="text.secondary" sx={{ ml: 1}}> ({item.reviews.length}) </Box>
        </Tooltip>
      </Box>
      <Box display="flex" flexDirection="row" sx={{height: "150px", mt: 2}}>
        <Box flexGrow={1} sx={{ml :1}}> 
          <img alt={`${item.name}`} src={loading ? defaultImage : `/snacks${item.image}`} height="100%"/>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="flex-end"> 
          <Button
            variant="contained"
            onClick={() => history.push(`product/${item._id}`)}
            color="secondary" 
            sx={{mb: 1, mr: 1 }}
          > 
            View Item 
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default WishCard
