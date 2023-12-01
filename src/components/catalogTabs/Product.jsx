import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../css/index.css';
import CatalogCustomerDetails from '../CatalogCustomerDetails.jsx';
import CatalogProductTable from '../CatalogProductTable.jsx';
import CatalogNewProduct from '../forms/CatalogNewProduct.jsx';

const Product = () => {
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
            <CatalogNewProduct showForm={showForm} />
          </Col>
        </>
      ) : (
        <div>
          {showDetails ? (
            <Row>
              <Col lg="9">
                <CatalogProductTable showForm={showForm} openDetails={openDetails} />
              </Col>
              <Col lg="3" style={{ paddingRight: '0px' }}>
                <CatalogCustomerDetails closeDetails={closeDetails} />
              </Col>
            </Row>
          ) : (
            <>
              <CatalogProductTable showForm={showForm} openDetails={openDetails} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Product;
