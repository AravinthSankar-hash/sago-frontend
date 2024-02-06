import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import InventoryStatsGraphTable from './InventoryStatsGraphTable.jsx';
import { inventoryStatsTableHeaders, inventoryStatsTableColumns } from './inventory.const.js';
import SearchBox from '../helper/SearchBox.jsx';
import DateSelector from '../helper/DateSelector.jsx';
import { RESPONSE_MSG } from '../../components/tapicoPurchase/tp.const.js';
import Toaster from '../../components/helper/Snackbar.jsx';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
// Graph Spec
import { areaGraphOptions, areaGraphDataPoints } from '../dashboard/graph-spec.js';
import '../../css/index.css';
// API
import InventoryService from 'services/inventory.api.js';
import { SERVICES } from '../../services/api.const.js';

const InventoryStatsGraph = ({ selectedinventory }) => {
  const [statsData, setStatsData] = useState([]);
  const [totalStatsDataCount, setTotalStatsDataCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchPayload, setSearchPayload] = useState({ product_name: selectedinventory });
  const [toasterBackground, setToasterBackground] = useState(null);
  const [toasterMsg, setToasterMsg] = useState('Inventory data saved');
  const [shouldShowToaster, setShouldShowToaster] = useState(false);

  const invokeInventoryStatsAPI = (payload, query = null) => {
    InventoryService.getData(SERVICES.INVENTORY.QUERY_PARAMS.INVENTORYLIST, payload, query)
      .then((response) => {
        // setCurrentRowsPerPage(currentRowsPerPage);
        setRowsPerPage(rowsPerPage);
        setStatsData(response.data.data.inventoryList);
        setTotalStatsDataCount(response.data.totalCount);
        // if (response.data?.data.length === 0) {
        //   invokeToaster(RESPONSE_MSG.NO_DATA_FOUND);
        // }
      })
      .catch((error) => {
        console.log('Error in searching Purchase data', error);
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
      setShouldShowToaster(Math.random());
    }
    // setShouldShowToaster(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    invokeInventoryStatsAPI(
      searchPayload,
      `page=${0 + 1}&limit=${parseInt(event.target.value, 10)}`
    );
  };

  const inventoryPageChanged = (event, currentPageNo) => {
    setPage(currentPageNo);
    invokeInventoryStatsAPI(searchPayload, `page=${currentPageNo + 1}&limit=${rowsPerPage}`);
  };

  const [selectedDDValue, setSelectedDDValue] = useState('All');
  const handleSelectChange = (event) => {
    setSelectedDDValue(event.target.value);
    setPage(0);
    let apiPayload = {
      ...searchPayload,
      category: event.target.value
    };
    setSearchPayload((existingPayload) => {
      return {
        ...existingPayload,
        category: event.target.value
      };
    });
    invokeInventoryStatsAPI(apiPayload, `page=${0 + 1}&limit=${rowsPerPage}`);
  };

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const onDateChange = (selectedDate, dateType) => {
    if (!selectedDate) {
      // If the date is not selected, reset the corresponding state
      if (dateType === 'from') {
        setFromDate(null);
      } else if (dateType === 'to') {
        setToDate(null);
      }
      setSearchPayload((existingPayload) => ({
        ...existingPayload,
        [`${dateType}_date`]: undefined
      }));
    } else {
      // If the date is selected, update the corresponding state
      setSearchPayload((existingPayload) => ({
        ...existingPayload,
        [`${dateType}_date`]: selectedDate
      }));
      if (dateType === 'from') {
        setFromDate(selectedDate);
      } else if (dateType === 'to') {
        setToDate(selectedDate);
      }
    }
  };

  useEffect(() => {
    let apiPayload = searchPayload;
    // Check if any fromDate and toDate are missing
    if (!fromDate || !toDate) {
      apiPayload = {
        ...searchPayload,
        from_date: undefined,
        to_date: undefined
      };
    }
    invokeInventoryStatsAPI(apiPayload, `page=${0 + 1}&limit=${rowsPerPage}`);
  }, [fromDate, toDate]);

  // useEffect(() => {
  //   invokeInventoryStatsAPI(searchPayload, `page=${0 + 1}&limit=${rowsPerPage}`);
  // }, []);

  return (
    <>
      <Container>
        <Row>
          <Col lg="6" className="d-flex flex-column">
            {/* Filters */}
            <div className="pt-3 pb-3 mt-2" style={{ height: '120px' }}>
              <Row style={{ display: 'flex' }}>
                <Col lg="4">
                  <FormControl
                    sx={{ m: 1, minWidth: 200, marginTop: '0px', backgroundColor: 'white' }}
                    size="small">
                    <InputLabel id="demo-select-small-label">Entry Type</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      onChange={handleSelectChange}
                      label="Entry Type"
                      value={selectedDDValue}>
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="sale">Sale</MenuItem>
                      <MenuItem value="produce">Produce</MenuItem>
                    </Select>
                  </FormControl>
                </Col>
                <Col lg="4">
                  <DateSelector
                    size="smaller"
                    dateChangeHanlder={onDateChange}
                    customLabel="From"></DateSelector>
                </Col>
                <Col lg="4">
                  <DateSelector customLabel="To" dateChangeHanlder={onDateChange}></DateSelector>
                </Col>
              </Row>
            </div>
            {/* Table */}
            <div>
              {statsData.length && (
                <InventoryStatsGraphTable
                  statsData={statsData}
                  tableHeaders={inventoryStatsTableHeaders}
                  tableColumns={inventoryStatsTableColumns}
                  totalDataCount={totalStatsDataCount}
                  handleChangePage={inventoryPageChanged}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  rowsPerPage={rowsPerPage}
                  page={page}
                />
              )}
            </div>
          </Col>
          <Col lg="6">
            <div className="pt-3 pb-3 mt-2" style={{ height: '120px' }}></div>
            <Chart
              options={areaGraphOptions}
              type="area"
              series={areaGraphDataPoints}
              height="630"
            />
          </Col>
        </Row>
        <Toaster
          shouldOpen={shouldShowToaster}
          message={toasterMsg}
          backgroundColor={toasterBackground}></Toaster>
      </Container>
    </>
  );
};

export default InventoryStatsGraph;
