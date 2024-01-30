import { useEffect, useState } from 'react';
import ApprovalDetails from './ApprovalDetails';
import { IconButton, Chip, Box, CircularProgress, Stack } from '@mui/material';
import DateSelector from '../helper/DateSelector';
import SearchBox from '../helper/SearchBox';
import { Container, Row, Col } from 'react-bootstrap';
import IosShareIcon from '@mui/icons-material/IosShare';
import ApprovalHistoryTable from './ApprovalHistoryTable';
import { pendingTableColumns, pendingTableHeaders } from './approvals.const.js';
// Store
import {
  useUpdateShowApprovalsBackBtn,
  useShowApprovalHistoryDetails,
  useUpdateShowApprovalHistoryDetails
} from '../../store/store.js';
import { RESPONSE_MSG } from '../../components/tapicoPurchase/tp.const.js';
import { isNumeric } from '../../components/helper/helper.js';
import Toaster from '../../components/helper/Snackbar.jsx';

import ProService from 'services/purchase.api.js';

function ApprovalHistory() {
  const [approvalHistoryData, setApprovalHistoryData] = useState([]);
  const [clickedRowData, setClickedRowData] = useState({});
  const [searchPayload, setSearchPayload] = useState();
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(10);
  const [toasterBackground, setToasterBackground] = useState(null);
  const [toasterMsg, setToasterMsg] = useState('Procurement data saved');
  const [shouldShowToaster, setShouldShowToaster] = useState(false);
  const [selectedChips, setSelectedChips] = useState(['procurement']);
  const [totalHistoryDataCount, setTotalHistoryDataCount] = useState(0);
  const [page, setPage] = useState(0);
  // Store
  const updateShowApprovalsBackBtn = useUpdateShowApprovalsBackBtn();
  const showApprovalHistoryDetails = useShowApprovalHistoryDetails();
  const updateShowApprovalHistoryDetails = useUpdateShowApprovalHistoryDetails();

  useEffect(() => {
    invokePurchaseListAPI(searchPayload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
  }, [selectedChips]);
  const invokePurchaseListAPI = (payload, query = null) => {
    let url;
    if (selectedChips[0] == 'procurement') {
      url = `/procurement-invoices`;
    } else if (selectedChips[0] == 'tp') {
      url = `/tp-invoices`;
    } else if (selectedChips[0] == 'expense') {
      url = `/expense-invoices`;
    }
    ProService.getData(url, payload, query)
      .then((response) => {
        // setCurrentRowsPerPage(currentRowsPerPage);
        setApprovalHistoryData(response.data.data);
        setTotalHistoryDataCount(response.data.totalCount);
        if (response.data?.data.length === 0) {
          invokeToaster(RESPONSE_MSG.NO_DATA_FOUND);
        }
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

  const onSearchBoxValueChange = (currentInputValue) => {
    setPage(0);
    const isPhoneNumberSearch = isNumeric(currentInputValue);
    const payload = {
      ...(currentInputValue && {
        [isPhoneNumberSearch ? 'phone' : 'search_term']: currentInputValue
      })
    };
    setSearchPayload(payload);
    invokePurchaseListAPI(payload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
  };

  const approvalPageChange = (event, currentPageNo) => {
    setPage(currentPageNo);
    invokePurchaseListAPI(searchPayload, `page=${currentPageNo + 1}&limit=${currentRowsPerPage}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setCurrentRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    invokePurchaseListAPI(searchPayload, `page=${0 + 1}&limit=${parseInt(event.target.value, 10)}`);
  };

  const filterOptions = [
    { displayLabel: 'Procurement', value: 'procurement' },
    { displayLabel: 'Expense', value: 'expense' },
    { displayLabel: 'Topico Purchase', value: 'tp' }
  ];

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

  const handleChipSelect = (labelObj) => {
    setSelectedChips([labelObj?.value]);
  };

  const onTableRowClick = (rowData) => {
    setClickedRowData(rowData);
    updateShowApprovalHistoryDetails(true);
    updateShowApprovalsBackBtn(true);
  };

  return (
    <>
      {showApprovalHistoryDetails ? (
        <ApprovalDetails
          detailsData={clickedRowData}
          isActionRequired={false}
          selectedChips={selectedChips}
        />
      ) : (
        <Container style={{ background: '#EBEEF0', padding: '10px', paddingBottom: '0px' }}>
          <Row>
            <Col className="d-flex flex-column justify-content-center">
              <div style={{ padding: '0px 12px', margin: '0px 28px' }}>
                <div className="pt-3 pb-3 m-2" style={{ height: '120px' }}>
                  <Row>
                    <Col lg="3">
                      <SearchBox
                        placeHolder={'Search here'}
                        inputValueChanged={onSearchBoxValueChange}></SearchBox>
                    </Col>
                    <Col lg="2">
                      <DateSelector size="smaller" customLabel="From"></DateSelector>
                    </Col>
                    <Col lg="2">
                      <DateSelector customLabel="To"></DateSelector>
                    </Col>
                    <Col lg="2" style={{ display: 'flex', justifyContent: 'space-around' }}>
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
                  </Row>
                  <Row className="mt-3">
                    <Stack direction="row" spacing={1}>
                      <p style={{ color: '#6B778C' }}>Filter by : </p>
                      {filterOptions.map((filterOptionObj, index) => (
                        <Chip
                          key={index}
                          label={filterOptionObj.displayLabel}
                          onClick={() => handleChipSelect(filterOptionObj)}
                          sx={chipStyle(selectedChips.includes(filterOptionObj.value))}
                        />
                      ))}
                    </Stack>
                  </Row>
                </div>
                <div>
                  {approvalHistoryData.length ? (
                    <ApprovalHistoryTable
                      selectedChips={selectedChips}
                      tableData={approvalHistoryData}
                      tableHeaders={pendingTableHeaders}
                      tableColumns={pendingTableColumns}
                      hanleTableRowClick={onTableRowClick}
                      totalDataCount={totalHistoryDataCount}
                      hanldePageChange={approvalPageChange}
                      handleChangeRowsPerPage={handleChangeRowsPerPage}
                      rowsPerPage={currentRowsPerPage}
                      page={page}
                    />
                  ) : (
                    <Box sx={{ display: 'flex' }}>
                      <CircularProgress />
                    </Box>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <Toaster
            shouldOpen={shouldShowToaster}
            message={toasterMsg}
            backgroundColor={toasterBackground}></Toaster>
        </Container>
      )}
    </>
  );
}

export default ApprovalHistory;
