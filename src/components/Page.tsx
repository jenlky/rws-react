import Pagination from "@mui/material/Pagination"

export default function Page({ page, numOfPages, toDisplayPage, handlePageChange }: { page: number, numOfPages: number, toDisplayPage: boolean, handlePageChange: any }) {
  if (toDisplayPage) {
    return (
      <Pagination id='pagination' page={page} className='pagination' count={numOfPages} onChange={handlePageChange} /> 
    )
  }
}