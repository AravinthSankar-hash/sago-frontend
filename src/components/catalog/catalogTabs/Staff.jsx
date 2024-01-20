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
import { staffTableHeaders, staffTableColumns, RESPONSE_MSG } from '../catalog.const';
import Toaster from '../../helper/Snackbar.jsx';
import { isNumeric } from '../../helper/helper.js';

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
  useUpdateShowStaffDetailsSection,
  useUpdateCatalogBackBtnTxt
} from '../../../store/store.js';
import StaffTable from '../catalogTables/StaffTable.jsx';
// API
import CatalogService from 'services/catalog.api.js';
import { SERVICES } from '../../../services/api.const.js';

const Staff = () => {
  useEffect(() => {
    // By default invoke the fetch API with default limit and page
    invokeSearchAPI(searchPayload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
  }, []);

  // Store
  const updateShowCatalogBackBtn = useUpdateShowCatalogBackBtn(); // Bool to show/hide back button
  const updateCatalogBackBtnTxt = useUpdateCatalogBackBtnTxt(); // Back Button Text
  const showStaffNewForm = useShowStaffNewForm(); // Show Add staff form
  const showStaffDetailsSection = useShowStaffDetailsSection(); // Show staff Dashboard
  const updateShowStaffNewForm = useUpdateShowStaffNewForm(); // Show staff Dashboard
  const updateShowStaffDetailsSection = useUpdateShowStaffDetailsSection(); // Show staff Dashboard
  const [staffData, setStaffData] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState();
  const [shouldShowToaster, setShouldShowToaster] = useState(false);
  const [toasterBackground, setToasterBackground] = useState(null);
  const [toasterMsg, setToasterMsg] = useState('Staff data saved');
  const [totalStaffDataCount, setTotalStaffDataCount] = useState(0);
  const [searchPayload, setSearchPayload] = useState({});
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(10);

  useEffect(() => {
    CatalogService.getItems(SERVICES.CATALOG.QUERY_PARAMS.STAFFS)
      .then((response) => {
        setStaffData(response.data.data);
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
    updateCatalogBackBtnTxt('Add Staff');
    // Show back btn - Store
    updateShowCatalogBackBtn(shouldShow);
  };

  const invokeSearchAPI = (payload, query = null) => {
    CatalogService.getItems(SERVICES.CATALOG.QUERY_PARAMS.STAFFS, payload, query)
      .then((response) => {
        setStaffData(response.data.data);
        setTotalStaffDataCount(response.data.totalCount);
        if (response.data?.data.length === 0) {
          invokeToaster(RESPONSE_MSG.NO_DATA_FOUND);
        }
      })
      .catch((error) => {
        console.log('Error in searching Broker data', error);
        invokeToaster(RESPONSE_MSG.INVALID_SEARCH_TEXT, 'red');
      });
  };

  const onTableRowClick = (clickedRow) => {
    setSelectedStaff(clickedRow);
    // Show details section - Store
    updateShowStaffDetailsSection(true);
    updateCatalogBackBtnTxt('Staff Details');
    // Show back btn - Store
    updateShowCatalogBackBtn(true);
  };
  const staffPageChanged = (currentPageNo, rowsPerPage) => {
    setCurrentRowsPerPage(rowsPerPage);
    console.log('page changed - ', currentPageNo, rowsPerPage);
    invokeSearchAPI(searchPayload, `page=${currentPageNo + 1}&limit=${rowsPerPage}`);
  };
  const onStaffSave = (newAddedStaff) => {
    invokeToaster();
    updateShowStaffNewForm(false);
    updateShowCatalogBackBtn(false);
    setStaffData((staffs) => [newAddedStaff, ...staffs]);
  };

  const onSearchBoxValueChange = (currentInputValue) => {
    const isPhoneNumberSearch = isNumeric(currentInputValue);
    const payload = {
      ...(currentInputValue && { [isPhoneNumberSearch ? 'phone' : 'name']: currentInputValue })
    };
    setSearchPayload(payload);
    invokeSearchAPI(payload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
  };

  // Just a generic method to invoke toaster
  const invokeToaster = (msg, backgroundClr = null) => {
    if (msg) {
      setToasterMsg(msg);
    }
    if (backgroundClr) {
      setToasterBackground(backgroundClr);
    }
    setShouldShowToaster(true);
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
                      <SearchBox
                        placeHolder={'Search Name / Phone no.'}
                        inputValueChanged={onSearchBoxValueChange}></SearchBox>
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
                    {staffData.length ? (
                      <StaffTable
                        tableData={staffData}
                        tableHeaders={staffTableHeaders}
                        tableColumns={staffTableColumns}
                        totalStaffDataCount={totalStaffDataCount}
                        hanldePageChange={staffPageChanged}
                        tableRowClicked={onTableRowClick}
                        rowsPerPage={10}
                        page={5}
                      />
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </div>{' '}
            </>
          )}
          <Toaster
            shouldOpen={shouldShowToaster}
            message={toasterMsg}
            backgroundColor={toasterBackground}></Toaster>
        </div>
      )}
    </>
  );
};

export default Staff;
