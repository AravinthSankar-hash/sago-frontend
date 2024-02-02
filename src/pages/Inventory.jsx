import { useEffect, useState } from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap';
import SearchBox from '../components/helper/SearchBox.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DateSelector from '../components/helper/DateSelector.jsx';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import InventoryTable from 'components/inventory/InventoryTable.jsx';
import {
  inventoryTableHeaders,
  inventoryTableColumns
} from '../components/inventory/inventory.const.js';
import sago_icon from '../assets/images/sago_inventory.svg';
import broken_icon from '../assets/images/broken_inventory.svg';
import starch_inventory from '../assets/images/starch_inventory.svg';
import wet_thippi_inventory from '../assets/images/wet_thippi_inventory.svg';
import dry_thippi_inventory from '../assets/images/dry_thippi_inventory.svg';
import chart_icon from '../assets/images/chart_icon_inventory.svg';
import InventoryNewForm from 'components/inventory/InventoryNewForm.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InventoryStatsGraph from 'components/inventory/InventoryStatsGraph.jsx';
import { RESPONSE_MSG } from '../components/tapicoPurchase/tp.const.js';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
// Store
import {
  useShowInventoryDetails,
  useShowInventoryNewForm,
  useShowInventoryCharts,
  useUpdateShowInvetoryDetails,
  useUpdateShowInventoryNewForm,
  useUpdateShowInventoryCharts,
  useShowInventoryBackBtn,
  useUpdateShowInventoryBackBtn
} from '../store/store.js';
// API
import InventoryService from 'services/inventory.api.js';
import { SERVICES } from '../services/api.const.js';

import { isNumeric } from '../components/helper/helper.js';
import Toaster from '../components/helper/Snackbar.jsx';
import GenericService from '../services/generic.api';

function Inventory() {
  const [inventoryDataList, setInventoryDataList] = useState([]);
  const [inventoryAvailableStocks, setInventoryAvailableStocks] = useState([]);
  const [totalInventoryDataCount, setTotalInventoryDataCount] = useState(0);
  const [searchPayload, setSearchPayload] = useState({});
  const [toasterBackground, setToasterBackground] = useState(null);
  const [toasterMsg, setToasterMsg] = useState('Inventory data saved');
  const [shouldShowToaster, setShouldShowToaster] = useState(false);
  const [selectedinventoryList, setSelectedinventoryList] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  // Store
  const showInventoryBackBtn = useShowInventoryBackBtn();
  const showInventoryDetails = useShowInventoryDetails();
  const showInventoryNewForm = useShowInventoryNewForm();
  const showInventoryCharts = useShowInventoryCharts();
  const updateShowInventoryBackBtn = useUpdateShowInventoryBackBtn();
  const updateShowInvetoryDetails = useUpdateShowInvetoryDetails();
  const updateShowInventoryNewForm = useUpdateShowInventoryNewForm();
  const updateShowInventoryCharts = useUpdateShowInventoryCharts();

  const invokeInventoryListAPI = (payload, query = null) => {
    InventoryService.getData(SERVICES.INVENTORY.QUERY_PARAMS.INVENTORYLIST, payload, query)
      .then((response) => {
        // setCurrentRowsPerPage(currentRowsPerPage);
        setInventoryDataList(response.data.data.inventoryList);
        setInventoryAvailableStocks(response.data.data.productAvailableStocks);
        setTotalInventoryDataCount(response.data.totalCount);
        if (response.data?.data.length === 0) {
          invokeToaster(RESPONSE_MSG.NO_DATA_FOUND);
        }
      })
      .catch((error) => {
        console.log('Error in searching Purchase data', error);
        invokeToaster(RESPONSE_MSG.INVALID_SEARCH_TEXT, 'red');
      });
  };

  const inventoryPageChanged = (event, currentPageNo) => {
    setPage(currentPageNo);
    invokeInventoryListAPI(searchPayload, `page=${currentPageNo + 1}&limit=${rowsPerPage}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    invokeInventoryListAPI(
      searchPayload,
      `page=${0 + 1}&limit=${parseInt(event.target.value, 10)}`
    );
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

  const onInventoryDataSave = (newAddedInventory) => {
    invokeToaster();
    updateShowInventoryNewForm(false);
    setInventoryDataList((inventory) => [newAddedInventory, ...inventory]);
    invokeInventoryListAPI(searchPayload, `page=${0 + 1}&limit=${rowsPerPage}`);
  };
  const handleTableClick = () => {
    updateShowInvetoryDetails(true);
    updateShowInventoryBackBtn(true);
  };
  const addNewInventoryDataHanlder = () => {
    updateShowInventoryNewForm(true);
    updateShowInventoryBackBtn(true);
  };
  const viewChat = (itemName) => {
    setSelectedinventoryList(itemName);
    updateShowInventoryCharts(true);
    updateShowInventoryBackBtn(true);
  };
  const onBackBtnClick = () => {
    updateShowInventoryCharts(false);
    updateShowInventoryNewForm(false);
    updateShowInvetoryDetails(true);
    updateShowInventoryBackBtn(false);
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

  useEffect(
    () => {
      let apiPayload = searchPayload;
      // Check if any fromDate and toDate are missing
      if (!fromDate || !toDate) {
        apiPayload = {
          ...searchPayload,
          from_date: undefined,
          to_date: undefined
        };
      }
      invokeInventoryListAPI(apiPayload, `page=${0 + 1}&limit=${rowsPerPage}`);
    },
    [fromDate, toDate],
    [inventoryDataList]
  );

  const boldNumbers = { fontSize: '18px' };

  const fontHeader = { font: 'Roboto', color: '#62728D', fontSize: '12px' };
  const fontValue = { font: 'Roboto', fontSize: '12px' };
  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row style={{ background: '#ffffff', height: '56px', alignItems: 'center' }}>
        {showInventoryBackBtn ? (
          <Col>
            <ArrowBackIcon
              onClick={onBackBtnClick}
              style={{ cursor: 'pointer' }}
              fontSize="medium"
            />{' '}
            <span>&nbsp;&nbsp;</span>Back
          </Col>
        ) : (
          <Col>Inventory</Col>
        )}
      </Row>
      {showInventoryCharts ? (
        <InventoryStatsGraph selectedinventory={selectedinventoryList} />
      ) : (
        <>
          {showInventoryNewForm ? (
            <InventoryNewForm inventoryAdded={onInventoryDataSave} />
          ) : (
            <Row>
              {showInventoryDetails && (
                <Col lg={2} style={{ padding: '15px', marginLeft: '30px' }}>
                  {inventoryAvailableStocks?.map((item, index) => (
                    <Row
                      key={index}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '15px',
                        border: '2px solid #E0E3E8',
                        marginTop: '20px',
                        paddingLeft: '10px',
                        padding: '15px'
                      }}>
                      <Col>
                        <Image style={{ height: '60px', width: '60px' }} src={sago_icon} />
                      </Col>
                      <Col>
                        <Row>
                          <label style={fontHeader}>{item.product_name}</label>
                        </Row>
                        <Row>
                          <span style={fontValue}>
                            <text style={boldNumbers}>{item.current_available_bags}</text> Bags
                          </span>
                        </Row>
                      </Col>
                      <hr style={{ color: '#62728D' }}></hr>
                      <Row>
                        <Col style={{ cursor: 'pointer' }}>
                          <Image style={{ height: '17px', width: '17px' }} src={chart_icon} />
                          <span style={{ ...fontValue, color: '#00B7FF', marginLeft: '15px' }}>
                            <u onClick={() => viewChat(item.product_name)}>View Charts</u>
                          </span>
                        </Col>
                      </Row>
                    </Row>
                  ))}
                </Col>
              )}
              <Col
                lg={showInventoryDetails ? 9 : 12}
                className="d-flex flex-column justify-content-center">
                {/* Filters */}
                <div className="pt-3 pb-3 mt-2" style={{ height: '120px' }}>
                  <Row>
                    <Col lg="3">
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
                    <Col lg="2">
                      <DateSelector size="smaller" customLabel="From"></DateSelector>
                    </Col>
                    <Col lg="2">
                      <DateSelector size="smaller" customLabel="From"></DateSelector>
                    </Col>
                    <Col lg="2">
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
                        onClick={addNewInventoryDataHanlder}>
                        <AddIcon fontSize="small" sx={{ color: '#00B7FF' }} />
                        New Entry
                      </Button>
                    </Col>
                  </Row>
                </div>
                {/* Table */}
                <div>
                  {inventoryDataList.length > 0 ? (
                    <InventoryTable
                      tableData={inventoryDataList}
                      tableHeaders={inventoryTableHeaders}
                      tableColumns={inventoryTableColumns}
                      totalDataCount={totalInventoryDataCount}
                      hanldePageChange={inventoryPageChanged}
                      handleChangeRowsPerPage={handleChangeRowsPerPage}
                      rowsPerPage={rowsPerPage}
                      page={page}
                    />
                  ) : (
                    <Box sx={{ display: 'flex' }}>
                      <CircularProgress />
                    </Box>
                  )}
                </div>
              </Col>
            </Row>
          )}
        </>
      )}
      <Toaster
        shouldOpen={shouldShowToaster}
        message={toasterMsg}
        backgroundColor={toasterBackground}></Toaster>
    </Container>
  );
}

export default Inventory;
