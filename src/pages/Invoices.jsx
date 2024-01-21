import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SearchBox from '../components/helper/SearchBox.jsx';
import DateSelector from '../components/helper/DateSelector.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import '../css/index.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import GsInvoiceDetails from 'components/invoice/GsInvoiceDetails.jsx';
// import DcSalesInvoices from 'components/Invoice/DcInvoicesDetails.jsx';
import TsInvoiceDetails from '../components/invoice/TsInvoiceDetails.jsx';
import InvoiceTable from 'components/invoice/InvoiceTable.jsx';
import SaleService from 'services/sale.api.js';
import { SERVICES } from 'services/api.const.js';
import { useUpdateShowSalesBackBtn } from '../store/store.js';
import { invoiceTableColumns, invoiceTableHeaders } from 'components/sales/sale.const.js';
import DcDetails from 'components/sales/DcSales/DcDetails.jsx';
import TsDetails from 'components/sales/TS/TsDetails.jsx';
import GsDetails from 'components/sales/GS/GsDetails.jsx';

function Invoices() {
  const [salesInvoices, setsalesInvoices] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [showNewForm, setShowNewForm] = useState(false);
  const [selectedChips, setSelectedChips] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const updateShowSalesBackBtn = useUpdateShowSalesBackBtn(); // Method to update bool, if back btn is clicked
  const [selectedRowData, setSelectedRowData] = useState({});
  const [showSaleDetails, setShowSaleDetails] = useState(false);
  const [page, setPage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    // By default invoke the fetch API with default limit and page
    invokeSearchAPI({}, `page=${0 + 1}&limit=${10}`);
  }, []);

  const invokeSearchAPI = (payload, query = null) => {
    SaleService.getSales(SERVICES.SALE.SALE_TYPES.all, payload, query)
      .then((response) => {
        setsalesInvoices(response.data.data);
      })
      .catch((error) => {
        console.log('Error in searching sale invoices', error);
      });
  };
  const showForm = (shouldShow) => {
    setShowNewForm(shouldShow);
  };

  const chipStyle = (isSelected) => ({
    border: '2px solid #00b7ff',
    borderRadius: '8px',
    backgroundColor: isSelected ? '#00b7ff' : 'white',
    color: isSelected ? 'white' : '#00b7ff',
    ':hover': {
      background: '#00b7ff',
      color: 'white',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)'
    },
    cursor: 'pointer'
  });
  const handleChipSelect = (label) => {
    setSelectedChips([]);
    setSelectedChips([label]);
  };

  // Function to handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

  const invoicePageChanged = (currentPageNo, rowsPerPage) => {
    setPage(rowsPerPage);
    console.log('page changed - ', currentPageNo, rowsPerPage);
    invokeSearchAPI({}, `page=${currentPageNo + 1}&limit=${rowsPerPage}`);
  };

  const onTableRowClick = (clickedRow) => {
    setSelectedRowData(clickedRow);

    // Show back btn - Store
    updateShowSalesBackBtn(true);
    setShowSaleDetails(true);
  };

  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row style={{ background: '#ffffff', height: '56px', alignItems: 'center' }}>
        <Col>
          {showSaleDetails ? (
            <ArrowBackIcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setShowSaleDetails(false);
              }}
              fontSize="medium"
            />
          ) : (
            ''
          )}
          <span>&nbsp;&nbsp;</span> {showDetails ? 'Invoices' : 'Invoices history'}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          {showSaleDetails ? (
            selectedRowData.sale_type === 'dc' ? (
              <DcDetails selectedRowData={selectedRowData} />
            ) : selectedRowData.sale_type === 'tippi' ? (
              <TsDetails selectedRowData={selectedRowData} />
            ) : (
              <GsDetails selectedRowData={selectedRowData} />
            )
          ) : (
            <div style={{ padding: '0 12px', margin: '0 28px' }}>
              <div className="pt-3 pb-3 m-2" style={{ height: '120px' }}>
                <Row>
                  <Col lg="3">
                    <SearchBox placeHolder={'Search here'}></SearchBox>
                  </Col>
                  <Col lg="2">
                    <FormControl
                      sx={{ m: 1, minWidth: 220, marginTop: '0px', backgroundColor: 'white' }}
                      size="small">
                      <InputLabel id="demo-select-small-label">DC</InputLabel>
                      <Select labelId="demo-select-small-label" label="DC">
                        <MenuItem value={10}>Wage</MenuItem>
                        <MenuItem value={20}>Cleaning</MenuItem>
                        <MenuItem value={30}>Manager</MenuItem>
                      </Select>
                    </FormControl>
                  </Col>
                  <Col lg="2">
                    <DateSelector size="smaller" customLabel="From"></DateSelector>
                  </Col>
                  <Col lg="2">
                    <DateSelector customLabel="To"></DateSelector>
                  </Col>
                  <Col lg="3" style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <IconButton size="small">
                      <IosShareIcon
                        fontSize="small"
                        style={{
                          wordSpacing: 1
                        }}
                      />
                      Export Data
                    </IconButton>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Stack direction="row" spacing={1}>
                    <p style={{ color: '#6B778C' }}>Filter by : </p>
                    <Chip
                      label="All"
                      color={selectedChips.includes('Unpaid') ? 'primary' : 'default'}
                      onClick={() => handleChipSelect('All')}
                      sx={chipStyle(selectedChips.includes('All'))}
                    />
                    <Chip
                      label="Paid"
                      color={selectedChips.includes('Unpaid') ? 'primary' : 'default'}
                      onClick={() => handleChipSelect('Paid')}
                      sx={chipStyle(selectedChips.includes('Paid'))}
                    />
                    <Chip
                      label="Unpaid"
                      color={selectedChips.includes('Unpaid') ? 'primary' : 'default'}
                      onClick={() => handleChipSelect('UnPaid')}
                      sx={chipStyle(selectedChips.includes('UnPaid'))}
                    />
                  </Stack>
                </Row>
              </div>
              <div>
                {salesInvoices?.length > 0 ? (
                  <InvoiceTable
                    tableData={salesInvoices}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    tableHeaders={invoiceTableHeaders}
                    tableColumns={invoiceTableColumns}
                    totalDataCount={totalDataCount}
                    hanldePageChange={invoicePageChanged}
                    tableRowClicked={onTableRowClick}
                    rowsPerPage={rowsPerPage}
                    page={page}
                  />
                ) : (
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
                )}
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Invoices;
