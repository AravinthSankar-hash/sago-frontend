import { useState, useEffect } from 'react';
import TPAddForm from './TPAddForm.jsx';
import TPDetails from './TPDetails.jsx';
import TPDashboard from './TPDashboard.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import SearchBox from '../helper/SearchBox.jsx';
import DateSelector from '../helper/DateSelector.jsx';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import '../../css/index.css';
import TPPurchaseTable from './TPPurchaseTable';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {
  useShowTPPurchaseNewForm,
  useUpdateShowTPPurchaseNewForm,
  useShowPurhcaseDetails,
  useUpdateShowTPBackBtn,
  useUpdateShowPurhcaseDetails
} from '../../store/store';
import { tpTableHeaders, tpTableColumns, RESPONSE_MSG } from './tp.const.js';
// API
import TPService from 'services/tp.api.js';
import { isNumeric } from '../helper/helper.js';
import Toaster from '../helper/Snackbar.jsx';
import GenericService from '../../services/generic.api';

function Purchases() {
  const [tPData, setTPData] = useState([]);
  const [totalTpDataCount, setTotalTpDataCount] = useState(0);
  // const [rowData, setRowData] = useState({});
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(10);
  const [selectedTP, setSelectedTP] = useState();
  const [toasterBackground, setToasterBackground] = useState(null);
  const [toasterMsg, setToasterMsg] = useState('Tp data saved');
  const [shouldShowToaster, setShouldShowToaster] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');

  useEffect(() => {
    TPService.getData('TP')
      .then((response) => {
        setTPData(response.data);
        console.log(response.data.length, 'eadataaaa');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
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

  // Store
  const showTPPurchaseNewForm = useShowTPPurchaseNewForm(); // Show TP Add form
  const updateShowTPPurchaseNewForm = useUpdateShowTPPurchaseNewForm();
  const updateShowTPBackBtn = useUpdateShowTPBackBtn(); // Bool to show/hide the back TP btn
  const showPurhcaseDetails = useShowPurhcaseDetails();
  const updateShowPurhcaseDetails = useUpdateShowPurhcaseDetails();

  const hanldeAddPurchaseFormClick = () => {
    GenericService.getInvoiceNo('TP')
      .then((response) => {
        setInvoiceNumber(response.data.invoiceNumber);
      })
      .catch((error) => {
        console.log('Error in getting customer data', error);
      });

    updateShowTPPurchaseNewForm(true);
    updateShowTPBackBtn(true);
  };

  const showForm = (shouldShow) => {
    console.log('staff table SHOW FORM CLICKED');

    // Show Add staff form - Store
    updateShowTPPurchaseNewForm(shouldShow);
    // updateCatalogBackBtnTxt('Add Staff');
    // Show back btn - Store
    updateShowTPBackBtn(shouldShow);
  };

  const onTableRowClick = (clickedRow) => {
    setSelectedTP(clickedRow);
    console.log('TP Purchase table row clicked');
    updateShowTPBackBtn(true);
    // Show details section - Store
    updateShowPurhcaseDetails(true);
    // Show back btn - Store
  };

  const tpPageChanged = (currentPageNo, rowsPerPage) => {
    // setCurrentRowsPerPage(rowsPerPage);
    // console.log('page changed - ', currentPageNo, rowsPerPage);
    // invokeSearchAPI(searchPayload, `page=${currentPageNo + 1}&limit=${rowsPerPage}`);
  };

  const onTPSave = (newAddedTp) => {
    invokeToaster();
    updateShowTPPurchaseNewForm(false);
    updateShowTPBackBtn(false);
    setTPData((tp) => [newAddedTp, ...tp]);
  };

  // const onSearchBoxValueChange = (currentInputValue) => {
  //   const isPhoneNumberSearch = isNumeric(currentInputValue);
  //   const payload = {
  //     ...(currentInputValue && { [isPhoneNumberSearch ? 'phone' : 'name']: currentInputValue })
  //   };
  //   TPService.getData('TP', payload)
  //     .then((response) => {
  //       setTPData(response.data);
  //       if (response.data?.length === 0) {
  //         invokeToaster(RESPONSE_MSG.NO_DATA_FOUND);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('Error in searching Purchase data', error);
  //       invokeToaster(RESPONSE_MSG.INVALID_SEARCH_TEXT, 'red');
  //     });
  // };

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
      {showTPPurchaseNewForm ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <TPAddForm showForm={showForm} tpAdded={onTPSave} tpInvoiceNo={invoiceNumber} />
          </Col>
        </>
      ) : (
        <div>
          {showPurhcaseDetails ? (
            <TPDetails tpDetails={selectedTP} />
          ) : (
            <>
              {/* <TPDashboard
                showAddPurchaseForm={hanldeAddPurchaseFormClick}
                showDetailsSection={onTableRowClick}
              /> */}
              <Container style={{ background: '#EBEEF0' }}>
                <Row>
                  <Col className="d-flex flex-column justify-content-center">
                    <div>
                      <div className="pt-3 pb-3 m-2" style={{ height: '120px' }}>
                        <Row>
                          <Col lg="3">
                            <SearchBox placeHolder={'Search here'}></SearchBox>
                          </Col>
                          <Col lg="2">
                            <DateSelector size="smaller" customLabel="From"></DateSelector>
                          </Col>
                          <Col lg="2">
                            <DateSelector customLabel="To"></DateSelector>
                          </Col>
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
                          <Col lg="2">
                            <Button
                              sx={{
                                borderColor: '#00B7FF',
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                border: '2px solid',
                                color: '#00B7FF',
                                font: '14px',
                                textTransform: 'none',
                                fontWeight: 'bold'
                              }}
                              variant="outlined"
                              onClick={() => hanldeAddPurchaseFormClick(true)}>
                              <AddIcon fontSize="small" sx={{ color: '#00B7FF' }} />
                              New Purchase
                            </Button>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Stack direction="row" spacing={1}>
                            <p style={{ color: '#6B778C' }}>Filter by : </p>
                            <Chip label="All" color={'primary'} />
                            <Chip label="Paid" color={'default'} />
                            <Chip label="Unpaid" color={'default'} />
                          </Stack>
                        </Row>
                      </div>
                      <div>
                        {tPData.length == 3 ? (
                          <TPPurchaseTable
                            tableData={tPData}
                            tpTableHeaders={tpTableHeaders}
                            tpTableColumns={tpTableColumns}
                            totalTpDataCount={totalTpDataCount}
                            hanldePageChange={tpPageChanged}
                            tableRowClicked={onTableRowClick}
                            rowsPerPage={10}
                            page={5}
                          />
                        ) : (
                          <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                          </Box>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </>
          )}{' '}
          <Toaster
            shouldOpen={shouldShowToaster}
            message={toasterMsg}
            backgroundColor={toasterBackground}></Toaster>
        </div>
      )}
    </>
  );
}

export default Purchases;
