import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../../css/index.css';
import RawMaterialItem from '../CatalogRawMaterialDetails.jsx';
import RawMaterialTable from '../catalogTables/RawMaterialTable';
import CatalogNewRawMaterialForm from '../forms/CatalogNewRawMaterial.jsx';
import Button from '@mui/material/Button';
import SearchBox from '../../helper/SearchBox.jsx';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import DateSelector from '../../helper/DateSelector.jsx';
import AddIcon from '@mui/icons-material/Add';
import { rawMaterialTableHeaders, rawMaterialTableColumns, RESPONSE_MSG } from '../catalog.const';
import Toaster from '../../helper/Snackbar.jsx';
import { isNumeric } from '../../helper/helper.js';

// Store
import {
  useUpdateShowCatalogBackBtn,
  useShowRawMaterialNewForm,
  useShowRawMaterialDetailsSection,
  useUpdateShowRawMaterialNewForm,
  useUpdateShowRawMaterialDetailsSection,
  useUpdateCatalogBackBtnTxt
} from '../../../store/store.js';
// API
import CatalogService from 'services/catalog.api.js';
import { SERVICES } from '../../../services/api.const.js';

const RawMaterial = () => {
  //State
  const [selectedChips, setSelectedChips] = useState([]);
  const [selectedRawMaterial, setSelectedRawMaterial] = useState();
  const [rawMaterialData, setRawMaterialData] = useState([]);
  const [shouldShowToaster, setShouldShowToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState('Raw-material data saved');
  const [toasterBackground, setToasterBackground] = useState(null);
  // Store
  const updateShowCatalogBackBtn = useUpdateShowCatalogBackBtn();
  const updateCatalogBackBtnTxt = useUpdateCatalogBackBtnTxt(); // Back Button Text
  const showRawMaterialNewForm = useShowRawMaterialNewForm(); // Show Add RawMaterial form
  const showRawMaterialDetailsSection = useShowRawMaterialDetailsSection(); // Show RawMaterial Dashboard
  const updateShowRawMaterialNewForm = useUpdateShowRawMaterialNewForm(); // Show RawMaterial Dashboard
  const updateShowRawMaterialDetailsSection = useUpdateShowRawMaterialDetailsSection(); // Show RawMaterial Dashboard

  useEffect(() => {
    CatalogService.getItems(SERVICES.CATALOG.QUERY_PARAMS.RAWMATERIALS)
      .then((response) => {
        setRawMaterialData(response?.data?.data);
      })
      .catch((error) => {
        console.log('Error in getting customer data', error);
      });
  }, []);

  // CSS
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

  const showForm = (shouldShow) => {
    updateShowRawMaterialNewForm(shouldShow);
    updateShowCatalogBackBtn(true);
    updateCatalogBackBtnTxt('Add Raw-Material');
  };

  const onTableRowClick = (clickedRow) => {
    setSelectedRawMaterial(clickedRow);
    updateShowRawMaterialDetailsSection(true);
    console.log(clickedRow);
    // Show back btn - Store
    updateShowCatalogBackBtn(true);
    updateCatalogBackBtnTxt('Raw-Materials Details');
  };

  const rawMaterialPageChanged = () => {
    console.log('page changed');
  };
  const onRawMaterialSave = (newAddedRawMaterial) => {
    invokeToaster();
    updateShowRawMaterialNewForm(false);
    updateShowCatalogBackBtn(false);
    setRawMaterialData((rawMaterials) => [newAddedRawMaterial, ...rawMaterials]);
  };

  // Called every time user changes input value in search, debounce 1 seconds.
  // If value is number phone search or name search, API call.
  const onSearchBoxValueChange = (currentInputValue) => {
    const isPhoneNumberSearch = isNumeric(currentInputValue);
    const payload = {
      ...(currentInputValue && { [isPhoneNumberSearch ? 'phone' : 'name']: currentInputValue })
    };
    CatalogService.getItems(SERVICES.CATALOG.QUERY_PARAMS.RAWMATERIALS, payload)
      .then((response) => {
        setRawMaterialData(response?.data?.data);
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
      {showRawMaterialNewForm ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <CatalogNewRawMaterialForm rawMaterialAdded={onRawMaterialSave} />
          </Col>
        </>
      ) : (
        <div>
          {showRawMaterialDetailsSection ? (
            <RawMaterialItem />
          ) : (
            <>
              <div style={{ padding: '0px 12px', margin: '0px 28px' }}>
                <div className="pt-3 pb-3 m-2" style={{ height: '120px' }}>
                  <Row style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Col lg="3">
                      <SearchBox
                        placeHolder={'Search Here'}
                        inputValueChanged={onSearchBoxValueChange}></SearchBox>
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
                    <Col lg="2" className="d-flex justify-content-end">
                      <Button sx={buttonStyle} variant="outlined" onClick={() => showForm(true)}>
                        <AddIcon fontSize="small" sx={{ color: '#00B7FF' }} />
                        New Entry
                      </Button>
                    </Col>
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
                    <RawMaterialTable
                      tableData={rawMaterialData}
                      tableHeaders={rawMaterialTableHeaders}
                      tableColumns={rawMaterialTableColumns}
                      hanldePageChange={rawMaterialPageChanged}
                      tableRowClicked={onTableRowClick}
                      rowsPerPage={10}
                      page={5}
                    />
                  </Col>
                </Row>
              </div>
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

export default RawMaterial;
