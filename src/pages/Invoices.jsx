import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SearchBox from '../components/SearchBox.jsx';
import DateSelector from '../components/DateSelector.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import '../css/index.css';
import ProcurementTable from '../components/ProcurementTable.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import GsInvoiceDetails from 'components/Invoice/GsInvoiceDetails.jsx';

function Invoices() {
  const [procurementData, setProcurementData] = useState([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [selectedChips, setSelectedChips] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/procurement')
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        setProcurementData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const showForm = (shouldShow) => {
    setShowNewForm(shouldShow);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleShowDetails = (shouldShow, rowData) => {
    setRowData(rowData);
    setShowDetails(shouldShow);
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
  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row style={{ background: '#ffffff', height: '56px', alignItems: 'center' }}>
        <Col>
          {showDetails ? (
            <ArrowBackIcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                showForm(false);
                handleShowDetails(false);
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
          {showDetails ? (
            <GsInvoiceDetails rowData={rowData} />
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
                {procurementData.length > 0 ? (
                  <ProcurementTable
                    tableData={procurementData}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleShowDetails={handleShowDetails}
                  />
                ) : (
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
                )}

                {/* <AgGridTable
                columnDefs={[
                  { field: 'Purchase date' },
                  { field: 'Purchase No' },
                  { field: 'Supplier Name' },
                  { field: 'Outstandings' },
                  { field: 'Last payment date' },
                  { field: 'Approval Status' }
                ]}
                rowData={procurementData}
              /> */}
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Invoices;
