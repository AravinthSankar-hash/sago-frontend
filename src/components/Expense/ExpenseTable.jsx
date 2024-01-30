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
import dayjs from 'dayjs';

// import '../css/index.css';
import { TABLE_ROW_SIZE_OPTIONS } from '../tapicoPurchase/tp.const';

const ExpenseTable = (props) => {
  const { selectedTP } = props;
  const [rowsPerPage, setRowsPerPage] = useState(TABLE_ROW_SIZE_OPTIONS[0]);
  const [page, setPage] = useState(0);

  const {
    tableData,
    expenseTableHeaders,
    expenseTableColumns,
    totalExpenseDataCount,
    tableRowClicked,
    hanldePageChange
  } = props;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // Invoke parent
    hanldePageChange(newPage, rowsPerPage);
  };

  // This will be invoked whenver we change size of the page in the table
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    // Invoke parent
    hanldePageChange(0, parseInt(event.target.value));
  };

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

  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
            <TableRow>
              {expenseTableColumns.map((key, index) => (
                <StyledTableCell key={index}>{key}</StyledTableCell>
              ))}{' '}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((tableRow, index) => (
              <StyledTableRow key={index} onClick={() => tableRowClicked(tableRow)}>
                {expenseTableColumns.map((columnKey, colIdx) => {
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
                  } else if (columnKey === 'expense_date' || columnKey === 'payment_due_date') {
                    cellContent = dayjs(tableRow[columnKey]).format('DD MMM YY');
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
                          ? `${tableRow[columnKey] < 0 ? '-' : ''}${Math.abs(tableRow[columnKey])}`
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
            ))}{' '}
          </TableBody>
          <TableBody>
            {' '}
            <StyledTablePaginationRow>
              <TableCell colSpan={expenseTableHeaders.length}>
                <TablePagination
                  rowsPerPageOptions={TABLE_ROW_SIZE_OPTIONS}
                  component="div"
                  count={totalExpenseDataCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
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

export default ExpenseTable;
