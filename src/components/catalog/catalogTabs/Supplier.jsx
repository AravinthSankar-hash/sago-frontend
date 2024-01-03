import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../../css/index.css';
import CatalogNewSupplierForm from '../forms/CatalogNewSupplier.jsx';
import CatalogSupplierDetails from '../CatalogSupplierDetails.jsx';
import AgGridTable from '../../helper/AgGridTable.jsx';
import SearchBox from '../../helper/SearchBox.jsx';
import DateSelector from '../../helper/DateSelector.jsx';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { supplierTableHeaders, supplierTableColumns } from '../catalog.const';
import Toaster from '../../helper/Snackbar.jsx';

// API
import CatalogService from 'services/catalog.api.js';
import { SERVICES } from '../../../services/api.const.js';
import SupplierTable from '../catalogTables/SupplierTable';
// Store
import {
  useShowSupplierNewForm,
  useUpdateShowSupplierNewForm,
  useUpdateShowCatalogBackBtn
} from '../../../store/store.js';

const Supplier = () => {
  const [selectedSupplier, setSelectedSupplier] = useState();
  const [selectedChips, setSelectedChips] = useState([]);
  const [showFields, setShowFields] = useState(true);
  const [supplierData, setSupplierData] = useState([]);
  const [showSupplierDetailsSection, setShowSupplierDetailsSection] = useState(false);
  const [shouldShowToaster, setShouldShowToaster] = useState(false);
  // Store
  const updateShowCatalogBackBtn = useUpdateShowCatalogBackBtn();
  const showSupplierNewForm = useShowSupplierNewForm(); // Show Supplier Add form
  const updateShowSupplierNewForm = useUpdateShowSupplierNewForm(); // Show Supplier Dashboard

  useEffect(() => {
    CatalogService.getPartners(SERVICES.CATALOG.QUERY_PARAMS.SUPPLIER)
      .then((response) => {
        console.log(response.data, 'dataaaaa');
        setSupplierData(response.data);
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
  const showForm = (shouldShow) => {
    updateShowSupplierNewForm(shouldShow);
    // Show back btn - Store
    updateShowCatalogBackBtn(true);
  };
  const addNewBroker = () => {
    console.log('Supplier table SHOW FORM CLICKED');
    showForm(true);
  };

  const closeDetails = () => {
    setShowSupplierDetailsSection(false);
  };

  const onSupplierSave = (newAddedSupplier) => {
    setShouldShowToaster(true);
    setSupplierData((suppliers) => [newAddedSupplier, ...suppliers]);
  };

  const onTableRowClick = (clickedRow) => {
    setSelectedSupplier(clickedRow);
    console.log(clickedRow);
    setShowSupplierDetailsSection(true);
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
                      <SearchBox placeHolder={'Search Name / Phone no.'}></SearchBox>
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
                        <Button sx={buttonStyle} variant="outlined" onClick={addNewBroker}>
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
                        hanldePageChange={brokerPageChanged}
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
          <Toaster shouldOpen={shouldShowToaster} message="Broker data saved"></Toaster>
        </div>
      )}
    </>
  );
};

export default Supplier;
