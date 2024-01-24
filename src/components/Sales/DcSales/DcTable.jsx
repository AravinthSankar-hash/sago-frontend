import {
  styled,
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  Paper,
  TablePagination,
  tableCellClasses
} from '@mui/material';
import '../../../css/index.css';
import { useState } from 'react';
import { TABLE_ROW_SIZE_OPTIONS } from '../sale.const.js';

const DcTable = (props) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const {
    tableData,
    tableHeaders,
    tableColumns,
    hanldePageChange,
    tableRowClicked,
    totalDataCount
  } = props;

  const Wrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    height: '650px',
    margin: '10px'
  });

  const StyledTableCell = styled(TableCell)(({ theme, Outstandings }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: '#6B778C'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: Outstandings < 0 ? '#DE350B' : '#62728D'
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

  const StyledTablePaginationRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    position: 'sticky',
    bottom: 0,
    zIndex: 2
  }));

  // This will be invoked whenver we change size of the page in the table
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    // Invoke parent
    hanldePageChange(0, parseInt(event.target.value));
  };

  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
            <TableRow>
              {tableHeaders.map((key, index) => (
                <StyledTableCell key={index}>{key}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((tableRow, RowIdx) => {
              return (
                <StyledTableRow key={RowIdx} onClick={() => tableRowClicked(tableRow)}>
                  {tableColumns.map((columnKey, colIdx) => {
                    let paymentStyle = {};
                    let isNumber;
                    let cellContent;
                    let numberStyle;
                    if (columnKey === 'outstandings') {
                      // Your existing logic for the "Outstanding" column
                      const outstandingValue = tableRow[columnKey];
                      const outstandingStyle = {
                        color: outstandingValue < 0 ? '#DE350B' : '#62728D'
                      };
                      cellContent = (
                        <span style={outstandingStyle}>
                          {outstandingValue < 0 ? '- ₹ ' : ' ₹ '}
                          {Math.abs(outstandingValue)}
                        </span>
                      );
                    } else if (columnKey === 'payment_status') {
                      // Logic for the "Approval Status" column
                      const paymentStatus = tableRow[columnKey];
                      switch (paymentStatus) {
                        case 'PAID':
                          paymentStyle = {
                            backgroundColor: '#E3FCEF',
                            color: '#006644'
                          };
                          break;
                        case 'NOT_PAID':
                          paymentStyle = {
                            backgroundColor: '#FFEBE6',
                            color: '#BF2600'
                          };
                          break;
                        default:
                          // paymentStyle = {
                          //   backgroundColor: '#00B7FF',
                          //   color: '#FFFFFF'
                          // };
                          break;
                      }
                      cellContent = (
                        <div
                          style={{
                            width: 'fit-content',
                            padding: '0px 4px',
                            borderRadius: '3px',
                            display: 'flex',
                            margin: '8px',
                            fontSize: 11,
                            ...paymentStyle
                          }}>
                          {tableRow[columnKey] && tableRow[columnKey] == 'NOT_PAID'
                            ? 'UNPAID'
                            : tableRow[columnKey]}
                        </div>
                      );
                    } else {
                      // Common logic for formatting numbers
                      isNumber = typeof tableRow[columnKey] === 'number';
                      numberStyle = {
                        color: isNumber
                          ? tableRow[columnKey] < 0
                            ? '#DE350B'
                            : '#62728D'
                          : 'inherit'
                      };
                      cellContent = (
                        <span style={numberStyle}>
                          {isNumber
                            ? `${tableRow[columnKey] < 0 ? '-' : ''}${Math.abs(
                                tableRow[columnKey]
                              )}`
                            : tableRow[columnKey]}
                        </span>
                      );
                    }

                    return (
                      <StyledTableCell key={colIdx} align="left">
                        {cellContent}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
          <TableBody>
            {' '}
            <StyledTablePaginationRow>
              <TableCell colSpan={tableHeaders.length}>
                <TablePagination
                  rowsPerPageOptions={TABLE_ROW_SIZE_OPTIONS}
                  component="div"
                  count={totalDataCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={hanldePageChange}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableCell>
            </StyledTablePaginationRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

export default DcTable;
