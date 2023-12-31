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
import { rawMaterialTableHeaders, rawMaterialTableColuns } from '../catalog.const';
// API
import CatalogService from 'services/catalog.api.js';
import { SERVICES } from '../../../services/api.const.js';

const RawMaterial = () => {
  useEffect(() => {
    CatalogService.getItems(SERVICES.CATALOG.QUERY_PARAMS.RAWMATERIALS)
      .then((response) => {
        setRawMaterialData(response.data);
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
  const [showNewForm, setShowNewForm] = useState(false);
  const [selectedChips, setSelectedChips] = useState([]);
  const [selectedRawMaterial, setSelectedRawMaterial] = useState();
  const [rawMaterialData, setRawMaterialData] = useState([]);
  const [showRawMaterialDetails, setShowRawMaterialDetails] = useState(false);

  const showForm = (shouldShow) => {
    setShowNewForm(shouldShow);
  };

  const onTableRowClick = (clickedRow) => {
    setSelectedRawMaterial(clickedRow);
    setShowRawMaterialDetails(true);
    console.log(clickedRow);
  };

  const rawMaterialPageChanged = () => {
    console.log('page changed');
  };
  return (
    <>
      {showNewForm ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <CatalogNewRawMaterialForm showForm={showForm} />
          </Col>
        </>
      ) : (
        <div>
          {showRawMaterialDetails ? (
            <RawMaterialItem />
          ) : (
            <>
              <div>
                <div className="pt-3 pb-3 mt-2" style={{ height: '120px' }}>
                  <Row style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Col lg="3">
                      <SearchBox placeHolder={'Search Here'}></SearchBox>
                    </Col>
                    <Col lg="2">
                      <DateSelector size="smaller" customLabel="From"></DateSelector>
                    </Col>
                    <Col lg="2">
                      <DateSelector customLabel="To"></DateSelector>
                    </Col>
                    <Col lg="2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                    <Col lg="3">
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
                      tableColumns={rawMaterialTableColuns}
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
        </div>
      )}
    </>
  );
};

export default RawMaterial;
