import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import SearchBox from '../helper/SearchBox.jsx';
import DateSelector from '../helper/DateSelector.jsx';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CustomerTable from './catalogTables/CustomerTable.jsx';
import '../../css/index.css';
import { customerTableHeaders, customerTableColumns } from './catalog.const.js';
// API
import CatalogService from 'services/catalog.api.js';
import { SERVICES } from '../../services/api.const.js';

const CustomerDashboard = (props) => {
  const [customerData, setCustomerData] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);
  const [showFields, setShowFields] = useState(true);

  useEffect(() => {
    CatalogService.getPartners(SERVICES.CATALOG.QUERY_PARAMS.CUSTOMER)
      .then((response) => {
        setCustomerData(response.data);
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

  const gridRowClicked = () => {
    setShowFields(false);
    props.openDetails();
  };

  const addNewCustomer = () => {
    props.addFormBtnClick();
  };

  const customerPageChanged = () => {
    console.log('page changed');
  };

  return (
    <div>
      <div className="pt-3 pb-3 mt-2" style={{ height: '120px' }}>
        <Row style={{ display: 'flex' }}>
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
          <Col lg="2" className="d-flex justify-content-end">
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
            <Col lg="5" className="d-flex justify-content-end">
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
              hanldePageChange={customerPageChanged}
              rowsPerPage={10}
              page={5}></CustomerTable>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default CustomerDashboard;