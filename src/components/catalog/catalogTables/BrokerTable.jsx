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
import '../../../css/index.css';
import TableSortLabel from '@mui/material/TableSortLabel';
import { TABLE_ROW_SIZE_OPTIONS } from '../catalog.const.js';

const BrokerTable = (props) => {
  const [rowsPerPage, setRowsPerPage] = useState(TABLE_ROW_SIZE_OPTIONS[0]);
  const [page, setPage] = useState(0);
  const {
    tableData,
    tableHeaders,
    tableColumns,
    hanldePageChange,
    tableRowClicked,
    totalBrokerDataCount
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

  // Sorting
  const [sortOrder, setSortOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(null);
  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const sortData = (data, order, orderByColumn) => {
    if (!['broker_name', 'address'].includes(orderByColumn)) {
      return data;
    }
    return data.sort((a, b) => {
      let aData = a[orderByColumn];
      let bData = b[orderByColumn];

      if (aData < bData) {
        return order === 'asc' ? -1 : 1;
      }
      if (aData > bData) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  return (
    <Wrapper>
      <TableContainer component={Paper} style={{ borderRadius: '15px' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
            <TableRow>
              {/* {tableHeaders?.map((key, index) => (
                <StyledTableCell key={index}>{key}</StyledTableCell>
              ))} */}
              {tableHeaders.map((headerObj, index) => {
                let sortDirection = 'asc';
                if (headerObj.sortKey === orderBy) {
                  sortDirection = sortOrder;
                }
                return (
                  <StyledTableCell
                    key={index}
                    sortDirection={orderBy === headerObj.sortKey ? sortDirection : false}>
                    <TableSortLabel
                      hideSortIcon={headerObj?.sortEnabled ? false : true}
                      active={headerObj.sortEnabled || false}
                      direction={orderBy === headerObj.sortKey ? sortOrder : 'asc'}
                      onClick={() => handleSortRequest(headerObj.sortKey)}>
                      {headerObj.headerKey}
                    </TableSortLabel>
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortData(tableData, sortOrder, orderBy).map((tableRow, RowIdx) => {
              return (
                <StyledTableRow key={RowIdx} onClick={() => tableRowClicked(tableRow)}>
                  {tableColumns?.map((columnKey, colIdx) => {
                    return (
                      <StyledTableCell key={colIdx} align="left">
                        {tableRow[columnKey]}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
          <TableBody>
            <StyledTablePaginationRow>
              <TableCell colSpan={tableHeaders.length}>
                <TablePagination
                  rowsPerPageOptions={TABLE_ROW_SIZE_OPTIONS}
                  component="div"
                  count={totalBrokerDataCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
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

export default BrokerTable;
