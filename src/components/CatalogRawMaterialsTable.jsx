import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import AgGridTable from '../components/AgGridTable.jsx';
import SearchBox from '../components/SearchBox.jsx';
import DateSelector from '../components/DateSelector';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import '../css/index.css';

const CatalogRawMaterialsTable = (props) => {
  const [tableColumns, setTableColuns] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);
  const [showFields, setShowFields] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/columns')
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        setTableColuns(response.data);
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

  const hideChanges = () => {
    setShowFields(false);
    props.openDetails();
  };

  return (
    <div>
      <div className="pt-3 pb-3 mt-2" style={{ height: '120px' }}>
        <Row style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Col lg="3">
            <SearchBox></SearchBox>
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
          <Col lg="2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
            <Col lg="3">
              <Button sx={buttonStyle} variant="outlined" onClick={() => props.showForm(true)}>
                <AddIcon fontSize="small" sx={{ color: '#00B7FF' }} />
                New Entry
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
          <div onClick={() => hideChanges()}>
            <AgGridTable
              columnDefs={[
                { field: 'make' },
                { field: 'model' },
                { field: 'price' },
                { field: 'location' },
                { field: 'pincode' }
              ]}
              rowData={tableColumns}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CatalogRawMaterialsTable;
