import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import '../../css/index.css';
import CatalogStaffTable from '../CatalogStaffTable.jsx';
import StaffItem from '../catalogItems/staffItem.jsx';
import CatalogNewStaff from '../forms/CatalogNewStaff.jsx';
import { useCurrentSelectedRowData, useShowCatalogTabHomePage } from '../../store/tableDataStore';

const Staff = () => {
  const currentRowData = useCurrentSelectedRowData();
  const showCatalogTabHomePage = useShowCatalogTabHomePage();
  const [showNewForm, setShowNewForm] = useState(false);

  const showForm = (shouldShow) => {
    setShowNewForm(shouldShow);
  };

  return (
    <>
      {showNewForm && !showCatalogTabHomePage ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <CatalogNewStaff showForm={showForm} />
          </Col>
        </>
      ) : (
        <div>
          {Object.keys(currentRowData).length ? (
            <StaffItem />
          ) : (
            <>
              <CatalogStaffTable showForm={showForm} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Staff;
