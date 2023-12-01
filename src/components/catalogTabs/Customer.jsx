import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CatalogNewCustForm from '../forms/CatalogNewCust.jsx';
import '../../css/index.css';
import CatalogCustomerDetails from '../CatalogCustomerDetails.jsx';
import CatalogCustomerTable from '../CatalogCustomerTable.jsx';

const Customer = () => {
  const [showNewForm, setShowNewForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const showForm = (shouldShow) => {
    setShowNewForm(shouldShow);
  };

  const openDetails = () => {
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };
  return (
    <>
      {showNewForm ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <CatalogNewCustForm showForm={showForm} />
          </Col>
        </>
      ) : (
        <div>
          {showDetails ? (
            <Row>
              <Col lg="9">
                <CatalogCustomerTable showForm={showForm} openDetails={openDetails} />
              </Col>
              <Col lg="3" style={{ paddingRight: '0px' }}>
                <CatalogCustomerDetails closeDetails={closeDetails} />
              </Col>
            </Row>
          ) : (
            <>
              <CatalogCustomerTable showForm={showForm} openDetails={openDetails} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Customer;
