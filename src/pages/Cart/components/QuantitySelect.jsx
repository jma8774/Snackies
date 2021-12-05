import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux'
import { setCartCount } from '../../../redux/features/userSlice'


const QuantitySelect = (props) => {
  const { setSubtotal, price, itemId, size } = props
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [options, setOptions] = useState([0, 1, 2, 3, 4, 5, props.quantity])
  const [quantity, setQuantity] = useState(props.quantity)
  const [loading, setLoading] = useState(false)

  const handleChange = async (e) => {
    const newVal = e.target.value
    // Update subtotal
    const diff = newVal - quantity // negative if lower quantity, pos if higher quantity
    setSubtotal(prevState => Math.round((prevState + diff*price) * 100) / 100)
    setQuantity(newVal)
    // Update backend
    try{
      setLoading(true)
      const { data } = await axios.post(`/api/cart/add`, { userId: user.id, itemId: itemId, size: size, quantity: diff, price: price  });
      dispatch(setCartCount(data))
      setLoading(false)
    } catch(err) {
      console.log("Update Quantity Error:\n", err.response ? err.response.data : err)
    }
  }

  useEffect(() => {
    let newOptions = new Set(options)
    for(let i = -4; i <= 4; i ++) {
      newOptions.add(Math.max(0, quantity+i))
    }
    setOptions(Array.from(newOptions).sort((a, b) => a > b ? 1 : -1))
  }, [quantity])

  return (
    <Box sx={{ width: 125}} >
      <FormControl fullWidth disabled={loading}>
        <InputLabel variant="filled" color="primary"> Quantity </InputLabel>
        <Select
          value={quantity}
          label="Quantity"
          onChange={(e) => {handleChange(e)}}
          variant="filled"
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
