'use client';
import { Alert, Box, Button, Pagination, Snackbar, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useState } from 'react';
import './style.css'
import { NpmObject } from './model/npm-registry';
import SearchResults from '@/components/SearchResults';
import Page from '@/components/Page';

// global variable
const resultsPerPage = 10

export default function SearchNpmRegistryComponent() {
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
    setData(res.data.objects)
    setTotal(res.data.total)

    if (res.data.total > 0) {
      setToDisplayPage(true)
    } else {
      setOpenErrorMsg(true);
      setToDisplayPage(false)
    }
  }

  async function handlePageChange (event: any, value: number) {
    setPage(value)
    const offset = resultsPerPage * (value - 1)
    const res = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${searchTerm}&size=${resultsPerPage}&from=${offset}`)  
    setData(res.data.objects)
    setTotal(res.data.total)
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorMsg(false);
  };

  const numOfPages = Math.ceil(total/resultsPerPage)

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
            id="submit-btn"
          >
            Submit
          </Button>
        </div>
      </Box>
      <SearchResults data={data} />
      <Page page={page} numOfPages={numOfPages} toDisplayPage={toDisplayPage} handlePageChange={handlePageChange} />
      <Snackbar open={openErrorMsg} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          No npm packages were found!
        </Alert>
      </Snackbar>
    </main>
  )
}
