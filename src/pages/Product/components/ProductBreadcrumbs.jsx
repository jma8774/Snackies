import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function ProductBreadcrumbs(props) {
  const { item } = props
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link component={RouterLink} 
        to={{ pathname: `/` }} 
        underline="hover" 
        color="inherit" 
      >
        Home
      </Link>
      <Link
        component={RouterLink}
        to={{ pathname: `/`, toBrandFilter: item.brand }} 
        underline="hover"
        color="inherit"
      >
        { item.brand }
      </Link>
      <Typography color="text.primary"> {item.name} </Typography>
    </Breadcrumbs>
  )
}

export default ProductBreadcrumbs
