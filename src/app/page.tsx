import { Box, Button, TextField, Typography } from '@mui/material'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Box sx={{ width: '100%', maxWidth: 300 }}>
        <Typography variant="h6" gutterBottom>Search NPM registry</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth />
          <Button variant="contained" size="medium" style={{ marginLeft: '8px', backgroundColor: '#1565C0' }}>Submit</Button>
        </div>
      </Box>
    </main>
  )
}
