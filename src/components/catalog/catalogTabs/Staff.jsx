import React from 'react';
import { Col } from 'react-bootstrap';

// Components
import StaffDashboard from '../StaffDashboard.jsx';
import StaffItem from '../catalogItems/StaffItem.jsx';
import StaffForm from '../forms/AddStaffForm.jsx';

// Store & Dtos & Custom Css
import '../../../css/index.css';
import {
  useUpdateShowCatalogBackBtn,
  useShowStaffNewForm,
  useShowStaffDetailsSection,
  useUpdateShowStaffNewForm,
  useUpdateShowStaffDetailsSection
} from '../../../store/store.js';

const Staff = () => {
  // Store
  const updateShowCatalogBackBtn = useUpdateShowCatalogBackBtn();
  const showStaffNewForm = useShowStaffNewForm(); // Show Add staff form
  const showStaffDetailsSection = useShowStaffDetailsSection(); // Show staff Dashboard
  const updateShowStaffNewForm = useUpdateShowStaffNewForm(); // Show staff Dashboard
  const updateShowStaffDetailsSection = useUpdateShowStaffDetailsSection(); // Show staff Dashboard

  const showForm = () => {
    console.log('staff table SHOW FORM CLICKED');

    // Show Add staff form - Store
    updateShowStaffNewForm(true);
    // Show back btn - Store
    updateShowCatalogBackBtn(true);
  };

  const onTableRowClick = () => {
    console.log('staff table row clicked');
    // Show details section - Store
    updateShowStaffDetailsSection(true);
    // Show back btn - Store
    updateShowCatalogBackBtn(true);
  };

  return (
    <>
      {showStaffNewForm ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <StaffForm />
          </Col>
        </>
      ) : (
        <div>
          {showStaffDetailsSection ? (
            <StaffItem />
          ) : (
            <>
              <StaffDashboard addFormBtnClick={showForm} showDetailsSection={onTableRowClick} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Staff;
