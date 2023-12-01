import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../css/index.css';
import CatalogCustomerDetails from '../CatalogCustomerDetails.jsx';
import CatalogStaffTable from '../CatalogStaffTable.jsx';
import CatalogNewStaff from '../forms/CatalogNewStaff.jsx';

const Staff = () => {
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
            <CatalogNewStaff showForm={showForm} />
          </Col>
        </>
      ) : (
        <div>
          {showDetails ? (
            <Row>
              <Col lg="9">
                <CatalogStaffTable showForm={showForm} openDetails={openDetails} />
              </Col>
              <Col lg="3" style={{ paddingRight: '0px' }}>
                <CatalogCustomerDetails closeDetails={closeDetails} />
              </Col>
            </Row>
          ) : (
            <>
              <CatalogStaffTable showForm={showForm} openDetails={openDetails} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Staff;
