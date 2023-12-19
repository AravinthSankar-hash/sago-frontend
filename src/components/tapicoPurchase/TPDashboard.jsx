import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SearchBox from '../../components/SearchBox.jsx';
import DateSelector from '../../components/DateSelector.jsx';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import '../../css/index.css';
import MuiTable from '../../components/ProcurementTable.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function TPDashboard({ showAddPurchaseForm, showDetailsSection }) {
  const [tPData, setTPData] = useState([]);
  const buttonStyle = {
    borderColor: '#00B7FF',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '2px solid',
    color: '#00B7FF',
    font: '14px',
    textTransform: 'none',
    fontWeight: 'bold'
  };

  const addNewPurchase = () => {
    showAddPurchaseForm(true);
  };

  const onTableRowClick = () => {
    showDetailsSection();
  };

  useEffect(() => {
    fetch('http://localhost:3001/procurement')
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        setTPData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          <div>
            <div className="pt-3 pb-3 mt-2" style={{ height: '120px' }}>
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
                    onClick={addNewPurchase}>
                    <AddIcon fontSize="small" sx={{ color: '#00B7FF' }} />
                    New Purchase
                  </Button>
                </Col>
              </Row>
              <Row className="mt-3">
                <Stack direction="row" spacing={1}>
                  <p style={{ color: '#6B778C' }}>Filter by : </p>
                  <Chip label="All" color={'primary'} />
                  <Chip label="Paid" color={'default'} />
                  <Chip label="Unpaid" color={'default'} />
                </Stack>
              </Row>
            </div>
            <div>
              {tPData.length > 0 ? (
                <MuiTable tableData={tPData} hanleTableRowClick={onTableRowClick} />
              ) : (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default TPDashboard;
