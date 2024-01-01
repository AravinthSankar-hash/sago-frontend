import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import SearchBox from '../../helper/SearchBox.jsx';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { staffTableHeaders, staffTableColumns } from '../catalog.const';
import Toaster from '../../helper/Snackbar.jsx';

// Components
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
import StaffTable from '../catalogTables/StaffTable.jsx';
// API
import CatalogService from 'services/catalog.api.js';
import { SERVICES } from '../../../services/api.const.js';

const Staff = () => {
  // Store
  const updateShowCatalogBackBtn = useUpdateShowCatalogBackBtn();
  const showStaffNewForm = useShowStaffNewForm(); // Show Add staff form
  const showStaffDetailsSection = useShowStaffDetailsSection(); // Show staff Dashboard
  const updateShowStaffNewForm = useUpdateShowStaffNewForm(); // Show staff Dashboard
  const updateShowStaffDetailsSection = useUpdateShowStaffDetailsSection(); // Show staff Dashboard
  const [staffData, setStaffData] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState();
  const [shouldShowToaster, setShouldShowToaster] = useState(false);

  useEffect(() => {
    CatalogService.getItems(SERVICES.CATALOG.QUERY_PARAMS.STAFFS)
      .then((response) => {
        setStaffData(response.data);
      })
      .catch((error) => {
        console.log('Error in getting customer data', error);
      });
  }, []);

  const buttonStyle = {
    borderColor: '#00B7FF',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '2px solid',
    color: '#00B7FF',
    font: '14px',
    textTransform: 'none',
    fontWeight: 'bold'
  };
  const showForm = (shouldShow) => {
    console.log('staff table SHOW FORM CLICKED');

    // Show Add staff form - Store
    updateShowStaffNewForm(shouldShow);
    // Show back btn - Store
    updateShowCatalogBackBtn(shouldShow);
  };

  const onTableRowClick = (clickedRow) => {
    setSelectedStaff(clickedRow);
    console.log('staff table row clicked');
    // Show details section - Store
    updateShowStaffDetailsSection(true);
    // Show back btn - Store
    updateShowCatalogBackBtn(true);
  };
  const staffPageChanged = () => {
    console.log('page changed');
  };
  const onStaffSave = (newAddedStaff) => {
    setShouldShowToaster(true);
    updateShowStaffNewForm(false);
    setStaffData((staffs) => [newAddedStaff, ...staffs]);
  };

  return (
    <>
      {showStaffNewForm ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <StaffForm showForm={showForm} staffAdded={onStaffSave} />
          </Col>
        </>
      ) : (
        <div>
          {showStaffDetailsSection ? (
            <StaffItem staffDetails={selectedStaff} />
          ) : (
            <>
              <div style={{ padding: '0px 12px', margin: '0px 28px' }}>
                <div className="pt-3 pb-3 m-2" style={{ height: '120px' }}>
                  <Row style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Col lg="3">
                      <SearchBox placeHolder={'Search Name / Phone no.'}></SearchBox>
                    </Col>
                    <>
                      <Col lg="4">
                        <FormControl
                          sx={{ m: 1, minWidth: 140, marginTop: '0px', backgroundColor: 'white' }}
                          size="small">
                          <InputLabel id="demo-select-small-label">Select Work</InputLabel>
                          <Select labelId="demo-select-small-label" label="Select Work">
                            <MenuItem value={10}>Wage</MenuItem>
                            <MenuItem value={20}>Cleaning</MenuItem>
                            <MenuItem value={30}>Manager</MenuItem>
                          </Select>
                        </FormControl>
                      </Col>
                    </>
                    <Col lg="3" className="d-flex justify-content-end">
                      <IconButton size="small">
                        <IosShareIcon
                          fontSize="small"
                          style={{
                            wordSpacing: 1
                          }}
                        />
                        Export Data
                      </IconButton>
                    </Col>
                    <Col lg="2" className="d-flex justify-content-end">
                      <Button sx={buttonStyle} variant="outlined" onClick={showForm}>
                        <AddIcon fontSize="small" sx={{ color: '#00B7FF' }} />
                        New Staff
                      </Button>
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col className="d-flex flex-column justify-content-center">
                    <StaffTable
                      tableData={staffData}
                      tableHeaders={staffTableHeaders}
                      tableColumns={staffTableColumns}
                      hanldePageChange={staffPageChanged}
                      tableRowClicked={onTableRowClick}
                      rowsPerPage={10}
                      page={5}
                    />
                  </Col>
                </Row>
              </div>{' '}
            </>
          )}
          <Toaster shouldOpen={shouldShowToaster} message="Raw-Material data saved"></Toaster>
        </div>
      )}
    </>
  );
};

export default Staff;
