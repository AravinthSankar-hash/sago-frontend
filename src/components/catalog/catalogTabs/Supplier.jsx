import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../../css/index.css';
import CatalogNewSupplierForm from '../forms/CatalogNewSupplier.jsx';
import CatalogSupplierDetails from '../CatalogSupplierDetails.jsx';
import SearchBox from '../../helper/SearchBox.jsx';
import DateSelector from '../../helper/DateSelector.jsx';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { supplierTableHeaders, supplierTableColumns, RESPONSE_MSG } from '../catalog.const';
import Toaster from '../../helper/Snackbar.jsx';
import { isNumeric } from '../../helper/helper.js';

// API
import CatalogService from 'services/catalog.api.js';
import { SERVICES } from '../../../services/api.const.js';
import SupplierTable from '../catalogTables/SupplierTable';
// Store
import {
  useShowSupplierNewForm,
  useUpdateShowSupplierNewForm,
  useUpdateShowCatalogBackBtn,
  useUpdateCatalogBackBtnTxt
} from '../../../store/store.js';

const Supplier = () => {
  useEffect(() => {
    // By default invoke the fetch API with default limit and page
    invokeSearchAPI(searchPayload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
  }, []);

  const [selectedSupplier, setSelectedSupplier] = useState();
  const [selectedChips, setSelectedChips] = useState([]);
  const [showFields, setShowFields] = useState(true);
  const [supplierData, setSupplierData] = useState([]);
  const [showSupplierDetailsSection, setShowSupplierDetailsSection] = useState(false);
  const [shouldShowToaster, setShouldShowToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState('Supplier data saved');
  const [toasterBackground, setToasterBackground] = useState(null);
  const [totalSupplierDataCount, setTotalSupplierDataCount] = useState(0);
  const [searchPayload, setSearchPayload] = useState({});
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(10);

  // Store
  const updateShowCatalogBackBtn = useUpdateShowCatalogBackBtn();
  const updateCatalogBackBtnTxt = useUpdateCatalogBackBtnTxt(); // Back Button Text
  const showSupplierNewForm = useShowSupplierNewForm(); // Show Supplier Add form
  const updateShowSupplierNewForm = useUpdateShowSupplierNewForm(); // Show Supplier Dashboard

  useEffect(() => {
    CatalogService.getPartners(SERVICES.CATALOG.QUERY_PARAMS.SUPPLIER)
      .then((response) => {
        setSupplierData(response.data.data);
      })
      .catch((error) => {
        console.log('Error in getting Supplier data', error);
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

  const supplierPageChanged = (currentPageNo, rowsPerPage) => {
    setCurrentRowsPerPage(rowsPerPage);
    console.log('page changed - ', currentPageNo, rowsPerPage);
    invokeSearchAPI(searchPayload, `page=${currentPageNo + 1}&limit=${rowsPerPage}`);
  };

  const invokeSearchAPI = (payload, query = null) => {
    CatalogService.getPartners(SERVICES.CATALOG.QUERY_PARAMS.SUPPLIER, payload, query)
      .then((response) => {
        setSupplierData(response.data.data);
        setTotalSupplierDataCount(response.data.totalCount);
        if (response.data?.data.length === 0) {
          invokeToaster(RESPONSE_MSG.NO_DATA_FOUND);
        }
      })
      .catch((error) => {
        console.log('Error in searching Supplier data', error);
        invokeToaster(RESPONSE_MSG.INVALID_SEARCH_TEXT, 'red');
      });
  };

  const showForm = (shouldShow) => {
    updateShowSupplierNewForm(shouldShow);
    // Show back btn - Store
    updateShowCatalogBackBtn(true);
    updateCatalogBackBtnTxt('Add Supplier');
  };
  const addNewSupplier = () => {
    console.log('Supplier table SHOW FORM CLICKED');
    showForm(true);
  };

  const closeDetails = () => {
    setShowSupplierDetailsSection(false);
  };

  const onSupplierSave = (newAddedSupplier) => {
    invokeToaster();
    updateShowCatalogBackBtn(false);
    setSupplierData((suppliers) => [newAddedSupplier, ...suppliers]);
  };

  const onTableRowClick = (clickedRow) => {
    setSelectedSupplier(clickedRow);
    setShowSupplierDetailsSection(true);
    updateCatalogBackBtnTxt('Supplier Details');
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
      {showSupplierNewForm ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <CatalogNewSupplierForm showForm={showForm} supplierAdded={onSupplierSave} />
          </Col>
        </>
      ) : (
        <div>
          <Row>
            <Col lg={showSupplierDetailsSection ? 9 : 12}>
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
                      lg={showSupplierDetailsSection ? 6 : 7}
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
                        lg={showSupplierDetailsSection ? 3 : 2}
                        className="d-flex justify-content-end">
                        <Button sx={buttonStyle} variant="outlined" onClick={addNewSupplier}>
                          <AddIcon fontSize="small" sx={{ color: '#00B7FF' }} />
                          New Supplier
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
                    {supplierData.length ? (
                      <SupplierTable
                        tableData={supplierData}
                        tableHeaders={supplierTableHeaders}
                        tableColumns={supplierTableColumns}
                        totalSupplierDataCount={totalSupplierDataCount}
                        hanldePageChange={supplierPageChanged}
                        tableRowClicked={onTableRowClick}
                        rowsPerPage={10}
                        page={5}></SupplierTable>
                    ) : null}
                  </Col>
                </Row>
              </div>{' '}
            </Col>
            {showSupplierDetailsSection ? (
              <Col lg="3" style={{ paddingRight: '0px' }}>
                <CatalogSupplierDetails
                  closeDetails={closeDetails}
                  supplierDetails={selectedSupplier}
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

export default Supplier;
