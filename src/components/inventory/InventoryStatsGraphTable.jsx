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
import dayjs from 'dayjs';

function InventoryStatsGraphTable(props) {
  const {
    statsData,
    tableHeaders,
    tableColumns,
    totalDataCount,
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
      color: Outstandings < 0 ? '#DE350B' : '#62728D'
    },

    '&.approval-status': {
      width: 'fit-content',
      padding: '0px 4px',
      borderRadius: '3px',
      display: 'flex',
      margin: '16px'
    },
    '&.approved': {
      backgroundColor: '#00875A',
      color: '#FFFFFF',
      fontSize: 11
    },
    '&.rejected': {
      backgroundColor: '#DE350B',
      color: '#FFFFFF',
      fontSize: 11
    },
    '&.pending': {
      backgroundColor: '#00B7FF',
      color: '#FFFFFF',
      fontSize: 11
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
      <TableContainer component={Paper} style={{ borderRadius: '15px' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
            <TableRow>
              {tableHeaders?.map((key, index) => (
                <StyledTableCell key={index}>{key}</StyledTableCell>
              ))}{' '}
            </TableRow>
          </TableHead>
          <TableBody>
            {statsData?.map((tableRow, RowIdx) => {
              return (
                <StyledTableRow key={RowIdx}>
                  {tableColumns?.map((columnKey, colIdx) => {
                    let isNumber;
                    let cellContent;
                    let numberStyle;
                    if (columnKey === 'entry_date') {
                      cellContent =
                        // <span>
                        dayjs(tableRow[columnKey]).format('DD MMM YY');

                      //   {/* {Math.abs(outstandingValue)} */}
                      // // </span>
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
              <TableCell colSpan={tableHeaders?.length}>
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
          </TableBody>{' '}
        </Table>
      </TableContainer>
    </Wrapper>
  );
}

export default InventoryStatsGraphTable;
