'use client';
import { Alert, Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useState } from 'react';
import './style.css'
import { NpmObject } from './model/npm-registry';

export default function searchNpmRegistryComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState<NpmObject[]>([])

  function searchTermHandler(event: any) {
    setSearchTerm(event?.target.value)
  }
  
  function formatDate(dateString: string){
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString([], options);
  }

  async function searchNpmRegistry(event: any) {
    event.preventDefault();   
    const res = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${searchTerm}`)
    console.log('res', res)
    setData(res.data.objects)
  }
  
  function SearchResults() {
    return data.map(pkg => {
      return (
        <div className='search-result-row'>
          <div className='search-result-row-top'>
            <div>{pkg.package.name}</div>
            <div>{formatDate(pkg.package.date)}</div>
          </div>
          <div>{pkg.package.author?.name}</div>
        </div>
      )
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Box
        component="form"
        sx={{ width: '100%', maxWidth: 500 }}
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
      <SearchResults />
    </main>
  )
}
