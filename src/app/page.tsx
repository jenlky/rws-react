'use client';
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useState } from 'react';

interface npmObject {
  flags?: object
  package: Package
  score?: object
  searchScore?: string
}

interface Author {
  name: string
}

interface Package {
  author: Author
  date: string
  description?: string
  keywords?: string[]
  links?: object
  maintainers?: object[]
  name: string
  publisher?: object
  scope?: string
  version?: string
}

export default function searchNpmRegistryComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState<npmObject[]>([])

  function searchTermHandler(event: any) {
    setSearchTerm(event?.target.value)
  }
  
  async function searchNpmRegistry(event: any) {
    event.preventDefault(); 
    console.log('searchNpmRegistry')
  
    const res = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${searchTerm}`)
    console.log('res', res)
    setData(res.data.objects)
  }
  
  function SearchResults() {
    return data.map(pkg => {
      return (
        <div>
          {pkg.package.name}
          {pkg.package.date}
          {pkg.package.author?.name}
        </div>
      )
    })
  }

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
      <SearchResults />
    </main>
  )
}
