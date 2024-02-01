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
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(10);
  const [searchPayload, setSearchPayload] = useState({ product_name: selectedinventory });
  const [toasterBackground, setToasterBackground] = useState(null);
  const [toasterMsg, setToasterMsg] = useState('Inventory data saved');
  const [shouldShowToaster, setShouldShowToaster] = useState(false);

  useEffect(() => {
    invokeInventoryStatsAPI(searchPayload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
  }, []);

  const invokeInventoryStatsAPI = (payload, query = null) => {
    InventoryService.getData(SERVICES.INVENTORY.QUERY_PARAMS.INVENTORYLIST, payload, query)
      .then((response) => {
        // setCurrentRowsPerPage(currentRowsPerPage);
        setStatsData(response.data.data.inventoryList);
        setTotalStatsDataCount(response.data.data.totalCount);
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
    setCurrentRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    invokeInventoryStatsAPI(
      searchPayload,
      `page=${0 + 1}&limit=${parseInt(event.target.value, 10)}`
    );
  };

  const inventoryPageChanged = (event, currentPageNo) => {
    setPage(currentPageNo);
    invokeInventoryStatsAPI(searchPayload, `page=${currentPageNo + 1}&limit=${currentRowsPerPage}`);
  };

  const handleChangePage = () => {};
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
                    <Select labelId="demo-select-small-label" label="Entry Type">
                      <MenuItem value="sale">Sale</MenuItem>
                      <MenuItem value="produce">Produce</MenuItem>
                    </Select>
                  </FormControl>
                </Col>
                <Col lg="4">
                  <DateSelector size="smaller" customLabel="From"></DateSelector>
                </Col>
                <Col lg="4">
                  <DateSelector customLabel="To"></DateSelector>
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
                  hanldePageChange={inventoryPageChanged}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  rowsPerPage={currentRowsPerPage}
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
