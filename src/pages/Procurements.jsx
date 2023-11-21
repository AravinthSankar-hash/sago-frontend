import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AgGridTable from '../components/AgGridTable';
function Procurements() {
  const [tableColumns, setTableColuns] = useState([]);
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
  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row style={{ background: 'grey', height: '56px' }}>
        <Col>Pages Sub Header</Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          <div className="bg-info p-3 mt-2" style={{ height: '120px' }}>
            For filters
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
        </Col>
      </Row>
    </Container>
  );
}

export default Procurements;
