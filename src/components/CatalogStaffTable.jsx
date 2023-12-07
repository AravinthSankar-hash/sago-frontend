import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import AgGridTable from '../components/AgGridTable.jsx';
import SearchBox from '../components/SearchBox.jsx';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import '../css/index.css';
import {
  useUpdateCatalogTabIndex,
  useUpdateShowCatalogBackBtn,
  useUpdateShowCatalogTabHomePage
} from '../store/tableDataStore.js';

const CatalogStaffTable = (props) => {
  const updateShowBackBtn = useUpdateShowCatalogBackBtn();
  const updateCatalogTabIndex = useUpdateCatalogTabIndex();
  const updateShowCatalogTabHomePage = useUpdateShowCatalogTabHomePage();
  const [tableColumns, setTableColuns] = useState([]);

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

  const addNewStaff = () => {
    props.showForm(true);
    updateShowBackBtn(true);
    updateCatalogTabIndex(6);
    updateShowCatalogTabHomePage(false);
  };

  const gridRowClicked = () => {
    updateShowBackBtn(true);
    updateCatalogTabIndex(6);
  };

  return (
    <div>
      <div className="pt-3 pb-3 mt-2" style={{ height: '120px' }}>
        <Row style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Col lg="3">
            <SearchBox placeHolder={'Search Name / Phone no.'}></SearchBox>
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
          <Col lg="2" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
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
            <Button sx={buttonStyle} variant="outlined" onClick={addNewStaff}>
              <AddIcon fontSize="small" sx={{ color: '#00B7FF' }} />
              New Staff
            </Button>
          </Col>
        </Row>
      </div>
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          <AgGridTable
            propFromParent={gridRowClicked}
            columnDefs={[
              { field: 'make' },
              { field: 'model' },
              { field: 'price' },
              { field: 'location' },
              { field: 'pincode' }
            ]}
            rowData={tableColumns}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CatalogStaffTable;
