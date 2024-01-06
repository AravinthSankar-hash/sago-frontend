import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../../css/index.css';
import CatalogNewBrokerForm from '../forms/CatalogNewBroker.jsx';
import CatalogBrokerDetails from '../CatalogBrokerDetails.jsx';
import SearchBox from '../../helper/SearchBox.jsx';
import DateSelector from '../../helper/DateSelector.jsx';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import BrokerTable from '../catalogTables/BrokerTable';
import { brokerTableHeaders, brokerTableColumns, RESPONSE_MSG } from '../catalog.const';
import CatalogService from 'services/catalog.api.js';
import { SERVICES } from '../../../services/api.const.js';
import Toaster from '../../helper/Snackbar.jsx';
import { isNumeric } from '../../helper/helper.js';
// Store
import {
  useShowBrokerNewForm,
  useUpdateShowBrokerNewForm,
  useUpdateShowCatalogBackBtn,
  useUpdateCatalogBackBtnTxt
} from '../../../store/store.js';

const Broker = () => {
  const [selectedChips, setSelectedChips] = useState([]);
  const [showFields, setShowFields] = useState(true);
  const [brokerData, setBrokerData] = useState([]);
  const [selectedBroker, setSelectedBroker] = useState([]);
  const [showBrokerDetailsSection, setShowBrokerDetailsSection] = useState(false);
  const [shouldShowToaster, setShouldShowToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState('Broker data saved');
  const [toasterBackground, setToasterBackground] = useState(null);
  // Store
  const updateShowCatalogBackBtn = useUpdateShowCatalogBackBtn();
  const updateCatalogBackBtnTxt = useUpdateCatalogBackBtnTxt(); // Back Button Text
  const showBrokerNewForm = useShowBrokerNewForm(); // Show Broker Add form
  const updateShowBrokerNewForm = useUpdateShowBrokerNewForm(); // Show Broker Dashboard

  useEffect(() => {
    CatalogService.getPartners(SERVICES.CATALOG.QUERY_PARAMS.BROKER)
      .then((response) => {
        setBrokerData(response.data.data);
      })
      .catch((error) => {
        console.log('Error in getting customer data', error);
      });
  }, []);

  const showForm = (shouldShow) => {
    updateShowBrokerNewForm(shouldShow);
    // Show back btn - Store
    updateShowCatalogBackBtn(true);
    updateCatalogBackBtnTxt('Add Broker');
  };

  const openDetails = () => {
    setShowBrokerDetailsSection(true);
  };

  const closeDetails = () => {
    setShowBrokerDetailsSection(false);
  };

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
  const brokerPageChanged = () => {
    console.log('page changed');
  };

  const onBrokerSave = (newAddedCustomer) => {
    invokeToaster();
    setBrokerData((brokers) => [newAddedCustomer, ...brokers]);
  };

  const onTableRowClick = (clickedRow) => {
    setSelectedBroker(clickedRow);
    setShowBrokerDetailsSection(true);
    updateCatalogBackBtnTxt('Broker Details');
  };

  // Called every time user changes input value in search, debounce 1 seconds.
  // If value is number phone search or name search, API call.
  const onSearchBoxValueChange = (currentInputValue) => {
    const isPhoneNumberSearch = isNumeric(currentInputValue);
    const payload = {
      ...(currentInputValue && { [isPhoneNumberSearch ? 'phone' : 'name']: currentInputValue })
    };
    CatalogService.getPartners(SERVICES.CATALOG.QUERY_PARAMS.BROKER, payload)
      .then((response) => {
        setBrokerData(response.data);
        if (response.data?.length === 0) {
          invokeToaster(RESPONSE_MSG.NO_DATA_FOUND);
        }
      })
      .catch((error) => {
        console.log('Error in searching customer data', error);
        invokeToaster(RESPONSE_MSG.INVALID_SEARCH_TEXT, 'red');
      });
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
      {showBrokerNewForm ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <CatalogNewBrokerForm showForm={showForm} brokerAdded={onBrokerSave} />
          </Col>
        </>
      ) : (
        <div>
          <Row>
            <Col lg={showBrokerDetailsSection ? 9 : 12}>
              <div style={{ padding: '0px 12px', margin: '0px 28px' }}>
                <div className="pt-3 pb-3 m-2" style={{ height: '120px' }}>
                  <Row style={{ display: 'flex', justifyContent: 'flex-start' }}>
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
                      lg={showBrokerDetailsSection ? 6 : 7}
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
                        lg={showBrokerDetailsSection ? 3 : 2}
                        className="d-flex justify-content-end">
                        <Button sx={buttonStyle} variant="outlined" onClick={() => showForm(true)}>
                          <AddIcon fontSize="small" sx={{ color: '#00B7FF' }} />
                          New Broker
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
                    {brokerData.length ? (
                      <BrokerTable
                        tableData={brokerData}
                        tableHeaders={brokerTableHeaders}
                        tableColumns={brokerTableColumns}
                        hanldePageChange={brokerPageChanged}
                        tableRowClicked={onTableRowClick}
                        rowsPerPage={10}
                        page={5}></BrokerTable>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
            {showBrokerDetailsSection ? (
              <Col lg="3" style={{ paddingRight: '0px' }}>
                <CatalogBrokerDetails brokerDetails={selectedBroker} closeDetails={closeDetails} />
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

export default Broker;
