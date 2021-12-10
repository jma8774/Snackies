import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ShippingAddress from './components/ShippingAddress';
import PaymentMethod from './components/PaymentMethod';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Shipping Address',
  'Payment Method',
  'Order Summary',
];

const Checkout = () => {
  const [step, setStep] = useState(0)
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    apt: '',
    city: '',
    state: '',
    zip: ''
  })

  useEffect(() => { 
    const fetchAddress = async () => {
      try{
        const {data} = await axios.get('api/user/address')
        setAddress(data)
      } catch(err) {
        console.log("Get Address Error", err.response ? err.response.data : err)
      }
    }
    fetchAddress()
  }, [])

  // useEffect(() => {
  //   console.log(address)
  // }, [address])

  const handleShippingAddress = async (e, setError) => {
    e.preventDefault();
    let proceed = true
    // Check not empty first name, last name, street and city
    const keys = ['firstName', 'lastName', 'street', 'city']
    keys.forEach((key) => {
      if(address[key] === '')
        proceed = false
      setError(prevState => ({...prevState, [key]: address[key] === ''}))
    })
    // Test State
    const reState = /^((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))$/
    const stateOK = reState.test(address.state)
    setError(prevState => ({...prevState, state: !stateOK}))
    // Test ZIP code
    const reZIP = /^\d{5}(?:[-\s]\d{4})?$/ 
    const zipOK = reZIP.test(address.zip)
    setError(prevState => ({...prevState, zip: !zipOK}))

    proceed = proceed && stateOK && zipOK
    if(!proceed) return

    setAddress(address)

    try{
      await axios.post('api/user/address', { newAddress: address })
    } catch(err) {
      console.log("Update Address Error", err.response ? err.response.data : err)
    }
    setStep(1)
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={7}> 
        <Paper variant="outlined" sx={{px: 2, py: 2}}>
          <Box sx={{ width: '100%', mt: 3, mb: 5}}>
            <Stepper activeStep={step} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          {step === 0 && <ShippingAddress address={address} setAddress={setAddress} handleShippingAddress={handleShippingAddress}/>}
          {step === 1 && <PaymentMethod setStep={setStep} />}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Checkout
