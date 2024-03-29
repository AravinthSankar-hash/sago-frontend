import { useEffect, useState } from 'react';
import ApprovalDetails from './ApprovalDetails';
import { IconButton, Chip, Box, CircularProgress, Stack } from '@mui/material';
import DateSelector from '../helper/DateSelector';
import SearchBox from '../helper/SearchBox';
import { Container, Row, Col } from 'react-bootstrap';
import IosShareIcon from '@mui/icons-material/IosShare';
import ApprovalHistoryTable from './ApprovalHistoryTable';
import { tableColumns, tableHeaders } from './approvals.const.js';
// Store
import {
  useUpdateShowApprovalsBackBtn,
  useShowApprovalHistoryDetails,
  useUpdateShowApprovalHistoryDetails
} from '../../store/store.js';

function ApprovalHistory() {
  const [approvalHistoryData, setApprovalHistoryData] = useState([]);
  const [clickedRowData, setClickedRowData] = useState({});
  // Store
  const updateShowApprovalsBackBtn = useUpdateShowApprovalsBackBtn();
  const showApprovalHistoryDetails = useShowApprovalHistoryDetails();
  const updateShowApprovalHistoryDetails = useUpdateShowApprovalHistoryDetails();

  useEffect(() => {
    fetch('http://localhost:3001/procurement')
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log('response.data ', response.data);
        setApprovalHistoryData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const onTableRowClick = (rowData) => {
    setClickedRowData(rowData);
    updateShowApprovalHistoryDetails(true);
    updateShowApprovalsBackBtn(true);
  };

  return (
    <>
      {showApprovalHistoryDetails ? (
        <ApprovalDetails detailsData={clickedRowData} isActionRequired={false} />
      ) : (
        <Container style={{ background: '#EBEEF0', padding: '10px', paddingBottom: '0px' }}>
          <Row>
            <Col className="d-flex flex-column justify-content-center">
              <div style={{ padding: '0px 12px', margin: '0px 28px' }}>
                <div className="pt-3 pb-3 m-2" style={{ height: '120px' }}>
                  <Row>
                    <Col lg="3">
                      <SearchBox placeHolder={'Search here'}></SearchBox>
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
                      <Chip label="All" color={'primary'} />
                      <Chip label="Procurement" color={'default'} />
                      <Chip label="Tapico Purchase" color={'default'} />
                      <Chip label="Expenses" color={'default'} />
                    </Stack>
                  </Row>
                </div>
                <div>
                  {approvalHistoryData.length > 0 ? (
                    <ApprovalHistoryTable
                      tableData={approvalHistoryData}
                      tableHeaders={tableHeaders}
                      tableColumns={tableColumns}
                      hanleTableRowClick={onTableRowClick}
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
        </Container>
      )}
    </>
  );
}

export default ApprovalHistory;
