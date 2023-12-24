import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SearchBox from '../../SearchBox.jsx';
import DateSelector from '../../DateSelector.jsx';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import '../../../css/index.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DcDetails from './DcDetails.jsx';
import NewDcSalesForm from './NewDcSalesForm.jsx';
import DcTable from './DcTable.jsx';
import {
  useUpdateShowSalesBackBtn,
  useShowDCSalesNewForm,
  useUpdateShowDCSalesNewForm,
  useShowDCDetails,
  useUpdateShowDCDetails
} from '../../../store/store.js';

const DcSales = () => {
  const [procurementData, setProcurementData] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [rowData, setRowData] = useState({});

  // Store
  const updateShowSalesBackBtn = useUpdateShowSalesBackBtn(); // Method to update bool, if back btn is clicked
  const showDCSalesNewForm = useShowDCSalesNewForm(); // Show Sales Add form
  const updateShowDCSalesNewForm = useUpdateShowDCSalesNewForm(); // Show Sales Dashboard
  const showDCDetails = useShowDCDetails(); // Show DC Details Dashboard
  const updateShowDCDetails = useUpdateShowDCDetails(); // Show DC Details Dashboard

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
    // Show back btn - Store
    updateShowSalesBackBtn(true);

    // Show Add Sales form - Store
    updateShowDCSalesNewForm(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleShowDetails = (shouldShow, rowData) => {
    setRowData(rowData);

    // Show back btn - Store
    updateShowSalesBackBtn(true);
    // Store update
    updateShowDCDetails(true);
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
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          {showDCSalesNewForm ? (
            <NewDcSalesForm />
          ) : (
            <>
              {' '}
              {showDCDetails ? (
                <DcDetails rowData={rowData} />
              ) : (
                <div style={{ padding: '0 12px', margin: '0 28px' }}>
                  <div className="pt-3 pb-3 m-2" style={{ height: '120px' }}>
                    <Row>
                      <Col lg="3">
                        <SearchBox placeHolder={'Search here'}></SearchBox>
                      </Col>
                      <Col lg="2">
                        <DateSelector size="smaller" customLabel="From"></DateSelector>
                      </Col>
                      <Col lg="2">
                        <DateSelector customLabel="To"></DateSelector>
                      </Col>
                      <Col lg="2" style={{ display: 'flex', justifyContent: 'space-around' }}>
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
                      <Col lg="3">
                        <Button
                          sx={{
                            borderColor: '#00B7FF',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            border: '2px solid',
                            color: '#00B7FF',
                            font: '14px',
                            textTransform: 'none',
                            fontWeight: 'bold'
                          }}
                          variant="outlined"
                          onClick={() => showForm(true)}>
                          <AddIcon fontSize="small" sx={{ color: '#00B7FF' }} />
                          New DC Sales
                        </Button>
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
                      <DcTable
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
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DcSales;
