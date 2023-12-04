import React, { useState, useEffect } from 'react'
import { styled, TableCell, TableRow, TableContainer, Table, TableBody, TableHead, Paper, TablePagination, tableCellClasses } from '@mui/material';


const ProcurementTable = (props) => {
    const [tableRow, setTableRow] = useState([]);
    const { tableColumns, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } = props;
   
const Wrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    height: '650px',
    margin: '10px'
  });
  
  const TableWrapper = styled('div')({
    flex: 1,
    overflowY: 'auto',
  });

const StyledTableCell = styled(TableCell)(({ theme, Outstandings, approvalStatus }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: '#6B778C',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: Outstandings < 0 ? '#DE350B' : '#62728D',
    },

    '&.approval-status': {
        width: 'fit-content',
        padding: '0px 4px',
        borderRadius: '3px',
        // gap: '10px',
        display: 'flex',
        margin: '16px',
        // justifyContent: 'center'
        // alignItems: 'center',
      },
      '&.approved': {
        backgroundColor: '#00875A',
        color: '#FFFFFF',
        fontSize: 11,
      },
      '&.rejected': {
        backgroundColor: '#DE350B',
        color: '#FFFFFF',
        fontSize: 11,
      },
      '&.pending': {
        backgroundColor: '#00B7FF',
        color: '#FFFFFF',
        fontSize: 11,
      },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: '#F8F8F8',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    '& td, & th': {
        border: 0,
      },
  }));

  const StyledTablePaginationRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    position: 'sticky',
    bottom: 0,
    zIndex: 2,
  }));
  const StyledTableHead = styled(TableRow)(({ theme }) => ({
    position: 'sticky',
    bottom: 0,
    zIndex: 2,
  }));
  return (
    <Wrapper>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
        <TableRow>
           {Object.keys(props.tableColumns[0]).map((key,index) => ( // comment from here
    <StyledTableCell key={index}>{key}</StyledTableCell>
  ))}                                       {/* to here */}
          {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell>   Uncomment this set and run after that undo all the things and save the data will come but if you refresh again it will show error
          <StyledTableCell align="right">Calories</StyledTableCell>
          <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
          <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
          <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.tableColumns.map((row,index) => (    // comment from here 
          <StyledTableRow key={index}>

            <StyledTableCell align="left">{row['Purchase date']}</StyledTableCell>
            <StyledTableCell align="left" style={{color:'black'}}>{row['Purchase No']}</StyledTableCell>
            <StyledTableCell align="left" style={{color:'black'}}>{row['Supplier Name']}</StyledTableCell>
            <StyledTableCell align="left" style={{color:'black'}}>₹ {row['amount']}</StyledTableCell>
            <StyledTableCell align="left"  Outstandings={row['Outstandings']}> {row['Outstandings'] < 0 ? '₹ ' : ''}{row['Outstandings']}</StyledTableCell>
            <StyledTableCell align="left">{row['Last payment date']}</StyledTableCell>
            <StyledTableCell align="left" className={`approval-status ${row['Approval Status'].toLowerCase()}`}>{row['Approval Status'].toUpperCase()}</StyledTableCell>
          </StyledTableRow>

        ))}   {/* comment to here */}
      </TableBody>
     <TableBody>     {/* comment from here */}
          <StyledTablePaginationRow>
            <TableCell colSpan={Object.keys(props.tableColumns[0]).length}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tableColumns.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableCell>
          </StyledTablePaginationRow>
        </TableBody> {/* to here */}

   </Table>
      </TableContainer>
      </Wrapper>
  )
}

export default ProcurementTable