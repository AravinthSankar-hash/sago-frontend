import React from 'react';
import {
  styled,
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableHead,
  tableCellClasses
} from '@mui/material';

function TPPurchases(props) {
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
    marginTop: '10px',
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
                <StyledTableCell key={index} style={{ padding: '16px', color: '#6B778C' }}>
                  {key}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.tableData?.map((row, index) => (
              <StyledTableRow key={index} style={{ color: '#62728D' }}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell key={index} style={{ color: '#62728D' }}>
                  {row['product_name']}
                </StyledTableCell>
                <StyledTableCell key={index} style={{ color: '#62728D' }}>
                  {row['ap']}
                </StyledTableCell>
                <StyledTableCell key={index} style={{ color: '#62728D' }}>
                  {row['tp']}
                </StyledTableCell>
                <StyledTableCell key={index} style={{ color: '#62728D' }}>
                  {row['p_rate']}
                </StyledTableCell>
                <StyledTableCell key={index} style={{ color: '#62728D' }}>
                  {row['tonnage']}
                </StyledTableCell>
                <StyledTableCell key={index} style={{ color: '#191C24' }}>
                  ₹ {row['total_bags']}
                </StyledTableCell>
                <StyledTableCell key={index} style={{ color: '#191C24' }}>
                  ₹ {row['total_rate']}
                </StyledTableCell>
              </StyledTableRow>
            ))}{' '}
          </TableBody>
        </Table>
      </Wrapper>
      <div className="m-2 d-flex justify-content-between">
        <div className="d-flex">
          <div style={{ marginTop: '10px', padding: '0 40px 0 10px' }}>
            <span style={{ color: '#5C9EB8' }}>Total Weight:</span>
            <span> {footerValues?.total_weight} kgs</span>
          </div>
          <div style={{ marginTop: '10px', padding: '0 40px 0 10px' }}>
            <span style={{ color: '#5C9EB8' }}>Vehicle weight :</span>
            <span> {footerValues?.vehicle_weight} kgs</span>
          </div>
          <div style={{ marginTop: '10px', padding: '0 40px 0 10px' }}>
            <span style={{ color: '#5C9EB8' }}>Net weight :</span>
            <span> {footerValues?.net_weight} kgs</span>
          </div>
          <div
            style={{ borderRight: '1px solid #EBEEF0', marginTop: '10px', height: '20px' }}></div>
          <div style={{ marginTop: '10px', padding: '0 40px 0 40px' }}>
            <span style={{ color: '#5C9EB8' }}>Sand Weight (5%) :</span>
            <span> {footerValues?.sand_weight} kgs</span>
          </div>
        </div>
        <div>
          <table style={tableWrapper}>
            <tbody>
              <tr>
                <td style={tableBody}>Sub Total:</td>
                <td>₹ 5,689.25</td>
              </tr>
              <tr>
                <td style={tableBody}>Labour charge (3%) :</td>
                <td>- ₹ {footerValues?.labour_charges}</td>
              </tr>
              <tr>
                <td style={tableBody}>Vehicle Rent :</td>
                <td>- ₹ {footerValues?.vehicle_rent}</td>
              </tr>
              <tr style={tableBody}></tr>
              <tr>
                <td style={tableBody}>purchase Total :</td>
                <td>- ₹ 500.25</td>
              </tr>
              <tr>
                <td style={tableBody}>Commision (10%)</td>
                <td>+ ₹ {footerValues?.commission}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #EBEEF0', color: '#6B778C' }}></tr>
              <tr>
                <td style={tableBody}>Grand total :</td>
                <td style={{ fontWeight: 'bold' }}>₹ {footerValues?.grand_total}</td>
              </tr>
            </tbody>
          </table>
          <div style={approvalStatus}>
            <div className="m-3">
              <span style={{ marginRight: '50px', color: '#62728D' }}>Approval Status:</span>
              <span style={{ marginRight: '0px', color: '#00B7FF' }}>pending</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TPPurchases;
