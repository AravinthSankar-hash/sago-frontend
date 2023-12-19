import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import TPAddForm from './TPAddForm.jsx';
import TPDetails from './TPDetails.jsx';
import TPDashboard from './TPDashboard.jsx';
import {
  useShowTPPurchaseNewForm,
  useUpdateShowTPPurchaseNewForm,
  useShowPurhcaseDetails,
  useUpdateShowTPBackBtn,
  useUpdateShowPurhcaseDetails
} from '../../store/store';

function Purchases() {
  // Store
  const showTPPurchaseNewForm = useShowTPPurchaseNewForm(); // Show TP Add form
  const updateShowTPPurchaseNewForm = useUpdateShowTPPurchaseNewForm();
  const updateShowTPBackBtn = useUpdateShowTPBackBtn(); // Bool to show/hide the back TP btn
  const showPurhcaseDetails = useShowPurhcaseDetails();
  const updateShowPurhcaseDetails = useUpdateShowPurhcaseDetails();
  const hanldeAddPurchaseFormClick = () => {
    updateShowTPPurchaseNewForm(true);
    updateShowTPBackBtn(true);
  };
  const onTableRowClick = () => {
    console.log('TP Purchase table row clicked');
    updateShowTPBackBtn(true);
    // Show details section - Store
    updateShowPurhcaseDetails(true);
    // Show back btn - Store
  };
  return (
    <>
      {showTPPurchaseNewForm ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <TPAddForm />
          </Col>
        </>
      ) : (
        <div>
          {showPurhcaseDetails ? (
            <TPDetails />
          ) : (
            <>
              <TPDashboard
                showAddPurchaseForm={hanldeAddPurchaseFormClick}
                showDetailsSection={onTableRowClick}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Purchases;
