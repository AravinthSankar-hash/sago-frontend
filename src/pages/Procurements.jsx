import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AgGridTable from '../components/AgGridTable';
import SearchBox from '../components/SearchBox.jsx';
import DateSelector from '../components/DateSelector';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Procurements() {
  const [tableColumns, setTableColuns] = useState([]);
  const [showNewForm, setShowNewForm] = useState(false);
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
      <Row style={{ background: 'grey', height: '56px' }}>
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
            <div>FORM COMES HERE</div>
          ) : (
            <div>
              <div className="p-3 mt-2" style={{ height: '120px' }}>
                <Row>
                  <Col lg="4">
                    <SearchBox></SearchBox>
                  </Col>
                  <Col lg="2">
                    <DateSelector customLabel="From"></DateSelector>
                  </Col>
                  <Col lg="2">
                    <DateSelector customLabel="To"></DateSelector>
                  </Col>
                  <Col lg="4">
                    <Button variant="outlined" onClick={() => showForm(true)}>
                      <AddIcon fontSize="small" />
                      New Procurement
                    </Button>
                  </Col>
                </Row>
                <Row></Row>
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
