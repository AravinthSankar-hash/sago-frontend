import {
  useShowCustomerNewForm,
  useUpdateShowCustomerNewForm,
  useUpdateShowCatalogBackBtn,
  useUpdateCatalogBackBtnTxt
} from '../../../store/store.js';
import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import CatalogNewCustForm from '../forms/CustomerForm.jsx';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import '../../../css/index.css';
import Button from '@mui/material/Button';
import SearchBox from '../../helper/SearchBox.jsx';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CustomerTable from '../catalogTables/CustomerTable.jsx';
import DateSelector from '../../helper/DateSelector.jsx';
import AddIcon from '@mui/icons-material/Add';
import CatalogCustomerDetails from '../CatalogCustomerDetails.jsx';
import { customerTableHeaders, customerTableColumns, RESPONSE_MSG } from '../catalog.const';
// Helper
import Toaster from '../../helper/Snackbar.jsx';
import { isNumeric } from '../../helper/helper.js';
// API
import CatalogService from 'services/catalog.api.js';
import { SERVICES } from '../../../services/api.const.js';

const Customer = () => {
  useEffect(() => {
    // By default invoke the fetch API with default limit and page
    invokeSearchAPI(searchPayload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
  }, []);

  // Store
  const updateShowCatalogBackBtn = useUpdateShowCatalogBackBtn();
  const updateCatalogBackBtnTxt = useUpdateCatalogBackBtnTxt(); // Back Button Text
  const showCustomerNewForm = useShowCustomerNewForm(); // Show Customer Add form
  const updateShowCustomerNewForm = useUpdateShowCustomerNewForm(); // Show Customer Dashboard
  // Internal State
  const [showCustomerDetailsSection, setShowCustomerDetailsSection] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);
  const [showFields, setShowFields] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [shouldShowToaster, setShouldShowToaster] = useState(false);
  const [toasterBackground, setToasterBackground] = useState(null);
  const [toasterMsg, setToasterMsg] = useState('Customer data saved');
  const [searchPayload, setSearchPayload] = useState({});
  const [totalCustomerDataCount, setTotalCustomerDataCount] = useState(0);
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(10);

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

  const chipStyle = (isSelected) => ({
    border: '2px solid #00b7ff',
    borderRadius: '8px',
    backgroundColor: isSelected ? '#00b7ff' : 'white',
    color: isSelected ? 'white' : '#00b7ff',
    ':hover': {
      background: '#00b7ff',
      color: 'white',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)'
    },
    cursor: 'pointer'
  });
  const handleChipSelect = (label) => {
    if (selectedChips.includes(label)) {
      setSelectedChips((prevSelectedChips) => prevSelectedChips.filter((chip) => chip !== label));
    } else {
      setSelectedChips((prevSelectedChips) => [prevSelectedChips, label]);
    }
  };

  const addNewCustomer = () => {
    console.log('Customer table SHOW FORM CLICKED');

    // Show Add Customer form - Store
    updateShowCustomerNewForm(true);
    // Show back btn - Store
    updateShowCatalogBackBtn(true);
    updateCatalogBackBtnTxt('Add New Customer');
  };

  const closeDetails = () => {
    setShowCustomerDetailsSection(false);
  };

  const onCustomerSave = (newAddedCustomer) => {
    invokeToaster();
    // Store
    updateShowCustomerNewForm(false);
    setCustomerData((customers) => [newAddedCustomer, ...customers]);
  };

  const onTableRowClick = (clickedRow) => {
    setSelectedCustomer(clickedRow);
    console.log(clickedRow);
    setShowCustomerDetailsSection(true);
    updateCatalogBackBtnTxt('Customer Details');
  };

  const customerPageChanged = (currentPageNo, rowsPerPage) => {
    setCurrentRowsPerPage(rowsPerPage);
    console.log('page changed - ', currentPageNo, rowsPerPage);
    invokeSearchAPI(searchPayload, `page=${currentPageNo + 1}&limit=${rowsPerPage}`);
  };

  // Called every time user changes input value in search, debounce 1 seconds.
  // If value is number phone search or name search, API call.
  const onSearchBoxValueChange = (currentInputValue) => {
    const isPhoneNumberSearch = isNumeric(currentInputValue);
    const payload = {
      ...(currentInputValue && { [isPhoneNumberSearch ? 'phone' : 'name']: currentInputValue })
    };
    setSearchPayload(payload);
    invokeSearchAPI(payload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
  };

  const invokeSearchAPI = (payload, query = null) => {
    CatalogService.getPartners(SERVICES.CATALOG.QUERY_PARAMS.CUSTOMER, payload, query)
      .then((response) => {
        setCustomerData(response.data.data);
        setTotalCustomerDataCount(response.data.totalCount);
        if (response.data?.data.length === 0) {
          invokeToaster(RESPONSE_MSG.NO_DATA_FOUND);
        }
      })
      .catch((error) => {
        console.log('Error in searching customer data', error);
        invokeToaster(RESPONSE_MSG.INVALID_SEARCH_TEXT, 'red');
      });
  };

  // Just a generic method to invoke toaster
  const invokeToaster = (msg, backgroundClr = '#4BB543') => {
    if (msg) {
      setToasterMsg(msg);
    }
    setToasterBackground(backgroundClr);
    setShouldShowToaster(Math.random());
  };
  return (
    <>
      {showCustomerNewForm ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <CatalogNewCustForm customerAdded={onCustomerSave} />
          </Col>
        </>
      ) : (
        <div>
          <Row>
            <Col lg={showCustomerDetailsSection ? 9 : 12}>
              <div style={{ padding: '0px 12px', margin: '0px 28px' }}>
                <div className="pt-3 pb-3 m-2" style={{ height: '120px' }}>
                  <Row style={{ display: 'flex' }}>
                    <Col lg="3">
                      <SearchBox
                        placeHolder={'Search Name / Phone no.'}
                        inputValueChanged={onSearchBoxValueChange}></SearchBox>
                    </Col>
                    {!showFields && (
                      <>
                        <Col lg="2">
                          <DateSelector size="smaller" customLabel="From"></DateSelector>
                        </Col>
                        <Col lg="2">
                          <DateSelector customLabel="To"></DateSelector>
                        </Col>
                      </>
                    )}
                    <Col
                      lg={showCustomerDetailsSection ? 6 : 7}
                      className="d-flex justify-content-end">
                      <IconButton size="small">
                        <IosShareIcon
                          fontSize="small"
                          style={{
                            wordSpacing: 1
                          }}
                        />
                        {showFields && 'Export Data'}
                      </IconButton>
                    </Col>
                    {showFields && (
                      <Col
                        lg={showCustomerDetailsSection ? 3 : 2}
                        className="d-flex justify-content-end">
                        <Button sx={buttonStyle} variant="outlined" onClick={addNewCustomer}>
                          <AddIcon fontSize="small" sx={{ color: '#00B7FF' }} />
                          New Customer
                        </Button>
                      </Col>
                    )}
                  </Row>
                  <Row className="mt-3">
                    <Stack direction="row" spacing={1}>
                      <p style={{ color: '#6B778C' }}>Filter by : </p>
                      <Chip
                        label="All"
                        sx={chipStyle(selectedChips.includes('All'))}
                        onClick={() => handleChipSelect('All')}
                      />
                      <Chip
                        label="Paid"
                        sx={chipStyle(selectedChips.includes('Paid'))}
                        onClick={() => handleChipSelect('Paid')}
                      />
                      <Chip
                        label="Unpaid"
                        sx={chipStyle(selectedChips.includes('Unpaid'))}
                        onClick={() => handleChipSelect('Unpaid')}
                      />
                    </Stack>
                  </Row>
                </div>
                <Row>
                  <Col className="d-flex flex-column justify-content-center">
                    {customerData.length ? (
                      <CustomerTable
                        tableData={customerData}
                        tableHeaders={customerTableHeaders}
                        tableColumns={customerTableColumns}
                        totalCustomerDataCount={totalCustomerDataCount}
                        hanldePageChange={customerPageChanged}
                        tableRowClicked={onTableRowClick}
                        rowsPerPage={10}
                        page={5}></CustomerTable>
                    ) : null}
                  </Col>
                </Row>
              </div>
            </Col>
            {showCustomerDetailsSection ? (
              <Col lg="3" style={{ paddingRight: '0px' }}>
                <CatalogCustomerDetails
                  customerDetails={selectedCustomer}
                  closeDetails={closeDetails}
                />
              </Col>
            ) : (
              <> </>
            )}
          </Row>
          <Toaster
            shouldOpen={shouldShowToaster}
            message={toasterMsg}
            backgroundColor={toasterBackground}></Toaster>
        </div>
      )}
    </>
  );
};

export default Customer;
