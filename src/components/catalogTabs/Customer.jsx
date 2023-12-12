import {
  useShowCustomerNewForm,
  useUpdateShowCustomerNewForm,
  useUpdateShowCatalogBackBtn
} from '../../store/store.js';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CatalogNewCustForm from '../forms/CustomerForm.jsx';
import '../../css/index.css';
import CatalogCustomerDetails from '../CatalogCustomerDetails.jsx';
import CustomerDashboard from '../CustomerDashboard.jsx';

const Customer = () => {
  // Store
  const updateShowCatalogBackBtn = useUpdateShowCatalogBackBtn();
  const showCustomerNewForm = useShowCustomerNewForm(); // Show Customer Add form
  const updateShowCustomerNewForm = useUpdateShowCustomerNewForm(); // Show staff Dashboard
  const [showStaffDetailsSection, setShowStaffDetailsSection] = useState(false);

  const showForm = () => {
    console.log('Customer table SHOW FORM CLICKED');

    // Show Add staff form - Store
    updateShowCustomerNewForm(true);
    // Show back btn - Store
    updateShowCatalogBackBtn(true);
  };

  const openDetails = () => {
    setShowStaffDetailsSection(true);
  };

  const closeDetails = () => {
    setShowStaffDetailsSection(false);
  };
  return (
    <>
      {showCustomerNewForm ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <CatalogNewCustForm />
          </Col>
        </>
      ) : (
        <div>
          {showStaffDetailsSection ? (
            <Row>
              <Col lg="9">
                <CustomerDashboard addFormBtnClick={showForm} openDetails={openDetails} />
              </Col>
              <Col lg="3" style={{ paddingRight: '0px' }}>
                <CatalogCustomerDetails closeDetails={closeDetails} />
              </Col>
            </Row>
          ) : (
            <>
              <CustomerDashboard addFormBtnClick={showForm} openDetails={openDetails} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Customer;
