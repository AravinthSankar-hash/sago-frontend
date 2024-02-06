import React from 'react';
import '../../css/catalogNewCust.css';
import {
  styled,
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableHead,
  tableCellClasses
} from '@mui/material';

const ExpenseTab = (props) => {
  const { footerValues } = props;

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
    paddingRight: '50px'
  };

  const tableWrapper = {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: '20px',
    marginBottom: '10px',
    paddingRight: '50px'
  };
  return (
    <>
      <Wrapper>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" className="mb-3">
          <TableHead style={tableHead}>
            <TableRow>
              <StyledTableCell style={{ padding: '10px' }}>S.No</StyledTableCell>
              {props?.tableHeading?.map((key, index) => (
                <StyledTableCell
                  key={index}
                  style={{ padding: '16px', color: '#6B778C', textAlign: 'right' }}>
                  {key}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.tableData?.map((row, index) => (
              <StyledTableRow key={index} style={{ color: '#62728D' }}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell key={index} style={{ color: '#62728D', textAlign: 'right' }}>
                  {row['description']}
                </StyledTableCell>
                <StyledTableCell key={index} style={{ color: '#191C24', textAlign: 'right' }}>
                  ₹ {row['amount']}
                </StyledTableCell>
              </StyledTableRow>
            ))}{' '}
          </TableBody>
        </Table>
      </Wrapper>
      <table style={tableWrapper}>
        <tbody>
          <tr>
            <td style={tableBody}>Sub Total:</td>
            <td>₹ {footerValues?.sub_total}</td>
          </tr>
          <tr>
            <td style={tableBody}>Labour charge (3%) :</td>
            <td>- ₹ {footerValues?.labour_charge}</td>
          </tr>
          <tr>
            <td style={tableBody}>Vehicle Rent:</td>
            <td>- ₹ {footerValues?.vehicle_rent}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C' }}></tr>
          <tr>
            <td style={tableBody}>Purchase total:</td>
            <td>- ₹ {footerValues?.purchase_total}</td>
          </tr>
          <tr>
            <td style={tableBody}>Commision (10%) :</td>
            <td style={{ fontWeight: 'bold' }}>+ ₹ {footerValues?.commission}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C' }}></tr>
          <tr>
            <td style={tableBody}>Grand total:</td>
            <td style={{ fontSize: '16px', fontWeight: 'bold' }}>₹ {footerValues?.grand_total}</td>
          </tr>
        </tbody>
      </table>
      <div style={approvalStatus}>
        <div className="m-3">
          <span style={{ marginRight: '50px', color: '#62728D' }}>Approval Status:</span>
          <span style={{ marginRight: '20px', color: '#00B7FF', fontWeight: 'bold' }}>
            {footerValues?.approval_status}
          </span>
        </div>
      </div>
    </>
  );
};

export default ExpenseTab;
