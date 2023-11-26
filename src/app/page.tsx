'use client';
import { Alert, Box, Button, Pagination, Snackbar, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useState } from 'react';
import './style.css'
import { NpmObject } from './model/npm-registry';
import { formatDate } from './helper';

// global variable
const resultsPerPage = 10

export default function searchNpmRegistryComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState<NpmObject[]>([])
  const [total, setTotal] = useState(0)
  const [toDisplayPage, setToDisplayPage] = useState(false)
  const [openErrorMsg, setOpenErrorMsg] = useState(false)
  const [page, setPage] = useState(1);

  function searchTermHandler(event: any) {
    setSearchTerm(event?.target.value)
  }

  async function searchNpmRegistry(event: any) {
    event.preventDefault();
    const res = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${searchTerm}&size=${resultsPerPage}&from=0`)
    console.log('res', res)
    setData(res.data.objects)
    setTotal(res.data.total)

    if (res.data.total > 0) {
      setToDisplayPage(true)
    } else {
      setOpenErrorMsg(true);
      setToDisplayPage(false)
    }
  }

  function SearchResults() {
    return data.map(pkg => {
      return (
        <div className='search-result-row' key={pkg.package.name}>
          <div className='search-result-row-top'>
            <div>
              <div>
                <span className='bold'>Package: </span>
                <span>{pkg.package.name}</span>
              </div>
              <div>
                <span className='bold'>Author: </span>
                <span className='italic'>{pkg.package.author?.name}</span>            
              </div>
            </div>
            <div>
              <div className='updated-date'>Updated date</div>
              <div className='italic'>{formatDate(pkg.package.date)}</div>
            </div>
          </div>
        </div>
      )
    })
  }

  async function handlePageChange (event: any, value: number) {
    setPage(value)
    const offset = resultsPerPage * (value - 1)
    const res = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${searchTerm}&size=${resultsPerPage}&from=${offset}`)  
    setData(res.data.objects)
    setTotal(res.data.total)
  }

  function Page() {
    const numOfPages = Math.ceil(total/resultsPerPage)
    if (toDisplayPage) {
      return (
        <Pagination page={page} className='pagination' count={numOfPages} onChange={handlePageChange} /> 
      )
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorMsg(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-20" style={{ marginBottom: '10px' }}>
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
      <Page />
      <Snackbar open={openErrorMsg} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          No npm packages were found!
        </Alert>
      </Snackbar>
    </main>
  )
}
