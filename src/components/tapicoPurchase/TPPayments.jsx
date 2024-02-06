import React, { useEffect, useState } from 'react';
import '../../css/catalogNewCust.css';
import {
  styled,
  TableRow,
  Table,
  TableBody,
  TableHead,
  TableCell,
  tableCellClasses
} from '@mui/material';
function TPPayments(props) {
  const { tableHeaders, tableData, footerValues } = props;
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: '#6B778C'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(even)': {
      backgroundColor: '#F8F8F8'
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    },
    '& td, & th': {
      border: 0
    }
  }));

  const Wrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    margin: '10px 12px',
    borderBottom: '2px solid #EBEEF0'
  });

  const tableHead = {
    position: 'sticky',
    top: 0,
    zIndex: 2
  };

  const tableBody = {
    padding: '10px 50px 10px 10px',
    textAlign: 'right',
    color: '#5C9EB8'
  };

  const approvalStatus = {
    borderTop: '2px solid #EBEEF0',
    textAlign: 'right',
    paddingRight: '10px'
  };

  const tableHeadingCell = {
    padding: '16px',
    color: '#6B778C',
    textAlign: 'center'
  };

  const AmountCol = {
    color: '#191C24',
    display: 'flex',
    justifyContent: 'center'
  };
  return (
    <>
      <Wrapper>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" className="mb-3">
          <TableHead style={tableHead}>
            <TableRow>
              <StyledTableCell style={{ padding: '10px' }}>S.No</StyledTableCell>
              {tableHeaders?.map((key, index) => (
                <StyledTableCell key={index} style={tableHeadingCell}>
                  {key}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((row, index) => (
              <StyledTableRow key={index} style={{ color: '#62728D' }}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell key={index} style={{ color: '#62728D', textAlign: 'center' }}>
                  {row['payment_date']}
                </StyledTableCell>
                <StyledTableCell key={index} style={AmountCol}>
                  ₹ {row['amount_paid']}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Wrapper>
      <table
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          marginBottom: '10px',
          paddingRight: '10px'
        }}>
        <tbody>
          <tr>
            <td style={tableBody}>purchase Total :</td>
            <td style={{ fontWeight: 'bold' }}>₹ {footerValues.amount_paid}</td>
          </tr>
        </tbody>
      </table>
      <div style={approvalStatus}>
        <div className="m-3">
          <span style={{ marginRight: '50px', color: '#62728D' }}>Approval Status:</span>
          <span style={{ color: '#00B7FF' }}>{footerValues.payment_status}</span>
        </div>
      </div>
    </>
  );
}

export default TPPayments;
