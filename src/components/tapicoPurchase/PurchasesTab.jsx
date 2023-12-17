import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import TPAddForm from './TPAddForm.jsx';
import TPDetails from './TPDetails.jsx';
import TPDashboard from './TPDashboard.jsx';

function Purchases() {
  const [showForm, setShowForm] = useState(false);
  const hanldeAddPurchaseFormClick = () => {
    setShowForm(true);
  };
  const mock = true;
  return (
    <>
      {showForm ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <TPAddForm />
          </Col>
        </>
      ) : (
        <div>
          {mock ? (
            <TPDetails />
          ) : (
            <>
              <TPDashboard showAddPurchaseForm={hanldeAddPurchaseFormClick} />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Purchases;
