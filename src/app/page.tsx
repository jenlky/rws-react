'use client';
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';

const state = {
  searchTerm: ''
}

function searchTermHandler(event: any) {
  state.searchTerm = event?.target.value
}

async function searchNpmRegistry(event: any) {
  event.preventDefault(); 
  console.log('searchNpmRegistry')

  const res = await axios.get(`https://registry.npmjs.org/${state.searchTerm}`)
  console.log('res', res)
}

export default function searchNpmRegistryComponent() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Box
        component="form"
        sx={{ width: '100%', maxWidth: 300 }}
        noValidate
        autoComplete="off"
        onSubmit={searchNpmRegistry}
      >
        <Typography variant="h6" gutterBottom>NPM registry</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField id="outlined-basic" label="Search" variant="outlined" fullWidth onChange={searchTermHandler} />
          <Button 
            variant="contained" 
            size="medium" 
            style={{ marginLeft: '8px', backgroundColor: '#1565C0' }} 
            type='submit'
          >
            Submit
          </Button>
        </div>
      </Box>
    </main>
  )
}
