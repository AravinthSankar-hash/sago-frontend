import { useState } from 'react';
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
import '../../css/index.css';
import { TABLE_ROW_SIZE_OPTIONS } from '../tapicoPurchase/tp.const';

const ProcurementTable = (props) => {
  const { selectedTP } = props;

  const {
    tableData,
    proTableHeaders,
    proTableColumns,
    totalproDataCount,
    tableRowClicked,
    hanldePageChange,
    handleChangeRowsPerPage,
    rowsPerPage,
    page
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
      color: '#191C24'
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

  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
            <TableRow>
              {proTableColumns?.map((key, index) => (
                <StyledTableCell key={index}>{key}</StyledTableCell>
              ))}{' '}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.length > 0
              ? tableData.map((tableRow, index) => (
                  <StyledTableRow key={index} onClick={() => tableRowClicked(tableRow)}>
                    {proTableColumns?.map((columnKey, colIdx) => {
                      let approvalStyle = {};
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
                            {outstandingValue < 0 ? '- ₹ ' : '₹ '}
                            {Math.abs(outstandingValue)}
                          </span>
                        );
                      } else if (columnKey === 'approval_status') {
                        // Logic for the "Approval Status" column
                        const approvalStatus = tableRow[columnKey];
                        switch (approvalStatus) {
                          case 'APPROVED':
                            approvalStyle = {
                              backgroundColor: '#00875A',
                              color: '#FFFFFF'
                            };
                            break;
                          case 'PENDING':
                            approvalStyle = {
                              backgroundColor: '#00B7FF',
                              color: '#FFFFFF'
                            };
                            break;
                          case 'REJECTED':
                            approvalStyle = {
                              backgroundColor: '#DE350B',
                              color: '#FFFFFF'
                            };
                            break;
                          default:
                            approvalStyle = {
                              backgroundColor: '#00B7FF',
                              color: '#FFFFFF'
                            };
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
                              ...approvalStyle
                            }}>
                            {tableRow[columnKey] ? tableRow[columnKey] : 'PENDING'}
                          </div>
                        );
                      } else if (columnKey === 'amount') {
                        cellContent = (
                          <span>
                            {tableRow.product_details[columnKey]}
                            {/* {Math.abs(outstandingValue)} */}
                          </span>
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
                    })}{' '}
                  </StyledTableRow>
                ))
              : ''}
          </TableBody>
          <TableBody>
            {' '}
            <StyledTablePaginationRow>
              <TableCell colSpan={proTableHeaders?.length}>
                <TablePagination
                  rowsPerPageOptions={TABLE_ROW_SIZE_OPTIONS}
                  component="div"
                  count={totalproDataCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={hanldePageChange}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableCell>
            </StyledTablePaginationRow>
          </TableBody>{' '}
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

export default ProcurementTable;
