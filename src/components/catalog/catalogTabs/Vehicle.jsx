import React from 'react';
import { Col } from 'react-bootstrap';
import '../../../css/index.css';
import VehicleDashboard from '../VehicleDashboard.jsx';
import VehicleItem from '../catalogItems/VehicleItem.jsx';
import VehicleForm from '../forms/VehicleForm.jsx';
import {
  useUpdateShowCatalogBackBtn,
  useShowVehicleNewForm,
  useShowVehicleDetailsSection,
  useUpdateShowVehicleNewForm,
  useUpdateShowVehicleDetailsSection
} from '../../../store/store.js';

const Vehicle = () => {
  // Store
  const updateShowCatalogBackBtn = useUpdateShowCatalogBackBtn();
  const showVehicleNewForm = useShowVehicleNewForm(); // Show Add Vehicle form
  const showVehicleDetailsSection = useShowVehicleDetailsSection(); // Show Vehicle Dashboard
  const updateShowVehicleNewForm = useUpdateShowVehicleNewForm(); // Show Vehicle Dashboard
  const updateShowVehicleDetailsSection = useUpdateShowVehicleDetailsSection(); // Show Vehicle Dashboard

  const showForm = () => {
    console.log('Vehicle table SHOW FORM CLICKED');

    // Show Add Vehicle form - Store
    updateShowVehicleNewForm(true);
    // Show back btn - Store
    updateShowCatalogBackBtn(true);
  };

  const onTableRowClick = () => {
    console.log('Vehicle table row clicked');

    // Show details section - Store
    updateShowVehicleDetailsSection(true);
    // Show back btn - Store
    updateShowCatalogBackBtn(true);
  };
  return (
    <>
      {showVehicleNewForm ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <VehicleForm />
          </Col>
        </>
      ) : (
        <div>
          {showVehicleDetailsSection ? (
            <VehicleItem />
          ) : (
            <>
              <VehicleDashboard addFormBtnClick={showForm} showDetailsSection={onTableRowClick} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Vehicle;
