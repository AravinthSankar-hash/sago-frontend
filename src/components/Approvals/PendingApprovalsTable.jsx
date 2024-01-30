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
import dayjs from 'dayjs';
import { TABLE_ROW_SIZE_OPTIONS } from '../tapicoPurchase/tp.const';

const PendingApprovalsTable = (props) => {
  const {
    tableData,
    pendingTableHeaders,
    pendingTableColumns,
    hanleTableRowClick,
    selectedChips,
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

  const onTableRowClick = (rowData) => {
    hanleTableRowClick(rowData);
  };

  return (
    <Wrapper>
      <TableContainer component={Paper} style={{ borderRadius: '15px' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
            <TableRow>
              {pendingTableHeaders?.map((key, index) => (
                <StyledTableCell key={index}>{key}</StyledTableCell>
              ))}{' '}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((tableRow, RowIdx) => {
              return (
                <StyledTableRow key={RowIdx} onClick={() => onTableRowClick(tableRow)}>
                  {pendingTableColumns?.map((columnKey, colIdx) => {
                    let approvalStyle = {};
                    let isNumber;
                    let cellContent;
                    let numberStyle;
                    if (columnKey === 'approval_status') {
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
                    } else if (columnKey === 'purchase_date') {
                      cellContent =
                        dayjs(tableRow['purchase_date']).format('DD MMM YY') ||
                        dayjs(tableRow['expense_date']).format('DD MMM YY');
                    } else if (columnKey === 'type') {
                      cellContent = selectedChips[0].toUpperCase();
                    } else if (columnKey === 'supplier_name') {
                      cellContent =
                        tableRow['supplier_name'] ||
                        tableRow['party_name'] ||
                        tableRow['broker_name'];
                    } else if (columnKey === 'sub_total') {
                      cellContent = tableRow['sub_total'] || tableRow['sum_total_rate'];
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
              <TableCell colSpan={pendingTableHeaders?.length}>
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
};

export default PendingApprovalsTable;
