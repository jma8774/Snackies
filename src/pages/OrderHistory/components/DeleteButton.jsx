import React, { useState } from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteButton = (props) => {
  const { handleDeleteOrder, order } = props
  const [confirm, setConfirm] = useState(false)
  return (
    <Button variant="contained" color={confirm ? "error" : "primary"} startIcon={confirm ? <DeleteIcon /> : ""} onClick={() => confirm ? handleDeleteOrder(order) : setConfirm(true)}>
      {confirm ? "Confirm" : "Cancel Order"}
    </Button>
  )
}

export default DeleteButton
