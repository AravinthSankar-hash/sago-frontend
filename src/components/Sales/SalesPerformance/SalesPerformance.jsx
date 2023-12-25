import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import DateSelector from '../../../components/DateSelector.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import '../../../css/index.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import SpTable from './SpTable.jsx';
import SpDetails from './SpDetails.jsx';

function SalesPerformance() {
  const [procurementData, setProcurementData] = useState([]);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleShowDetails = (shouldShow, rowData) => {
    setRowData(rowData);
    setShowDetails(shouldShow);
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
                handleShowDetails(false);
              }}
              fontSize="medium"
            />
          ) : (
            ''
          )}
          <span>&nbsp;&nbsp;</span> {showDetails ? 'Purchase' : 'Procurement'}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          {showDetails ? (
            <SpDetails rowData={rowData} />
          ) : (
            <div style={{ padding: '0 12px', margin: '0 28px' }}>
              <div className="pt-3 mt-2" style={{ height: '90px', paddingLeft: '0px' }}>
                <Row>
                  <Col lg="2" style={{ paddingLeft: '0px' }}>
                    <DateSelector size="smaller" customLabel="From"></DateSelector>
                  </Col>
                  <Col lg="2">
                    <DateSelector customLabel="To"></DateSelector>
                  </Col>
                  <Col lg="7" style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
              </div>
              <div>
                {procurementData.length > 0 ? (
                  <SpTable
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
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default SalesPerformance;
