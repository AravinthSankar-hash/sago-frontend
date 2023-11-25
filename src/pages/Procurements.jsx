import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AgGridTable from '../components/AgGridTable';
import SearchBox from '../components/SearchBox.jsx';
import DateSelector from '../components/DateSelector';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CatalogNewCustForm from '../components/forms/CatalogNewCust.jsx';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import '../css/index.css';

function Procurements() {
  const [tableColumns, setTableColuns] = useState([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [chipsSelected, setChipsSelected] = React.useState(false);

  useEffect(() => {
    console.log(1);
    fetch('http://localhost:3001/columns')
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        setTableColuns(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const showForm = (shouldShow) => {
    setShowNewForm(shouldShow);
  };
  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row style={{ background: '#ffffff', height: '56px' }}>
        <Col>
          <ArrowBackIcon
            style={{ cursor: 'pointer' }}
            onClick={() => showForm(false)}
            fontSize="medium"
          />
          <text>
            {' '}
            <span>&nbsp;&nbsp;</span>Back
          </text>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          {showNewForm ? (
            <CatalogNewCustForm />
          ) : (
            <div>
              <div className="pt-3 pb-3 mt-2" style={{ height: '120px' }}>
                <Row>
                  <Col lg="3">
                    <SearchBox></SearchBox>
                  </Col>
                  <Col lg="2">
                    <DateSelector customLabel="From"></DateSelector>
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
                      New Procurement
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Stack direction="row" spacing={1}>
                    <p style={{ color: '#6B778C' }}>Filter by : </p>
                    <Chip
                      label="All"
                      color="primary"
                      variant={chipsSelected ? 'filled' : 'outlined'}
                      onClick={() => setChipsSelected((s) => !s)}
                      sx={{
                        border: '2px solid',
                        borderRadius: '8px'
                      }}
                    />
                    <Chip
                      label="Paid"
                      color="primary"
                      variant={chipsSelected ? 'filled' : 'outlined'}
                      sx={{
                        border: '2px solid',
                        borderRadius: '8px'
                      }}
                      onClick={() => setChipsSelected((s) => !s)}
                    />
                    <Chip
                      label="Unpaid"
                      color="primary"
                      variant={chipsSelected ? 'filled' : 'outlined'}
                      sx={{
                        border: '2px solid',
                        borderRadius: '8px'
                      }}
                      onClick={() => setChipsSelected((s) => !s)}
                    />
                  </Stack>
                </Row>
              </div>
              <div>
                <AgGridTable
                  columnDefs={[
                    { field: 'make' },
                    { field: 'model' },
                    { field: 'price' },
                    { field: 'location' },
                    { field: 'pincode' }
                  ]}
                  rowData={tableColumns}
                />
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Procurements;
