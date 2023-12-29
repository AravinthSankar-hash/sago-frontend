import { useEffect, useState } from 'react';
import ApprovalDetails from './ApprovalDetails';
import { IconButton, Chip, Box, CircularProgress, Stack } from '@mui/material';
import DateSelector from '../helper/DateSelector';
import SearchBox from '../helper/SearchBox';
import { Container, Row, Col } from 'react-bootstrap';
import IosShareIcon from '@mui/icons-material/IosShare';
import PendingApprovalsTable from './PendingApprovalsTable';
import { tableColumns, tableHeaders } from './approvals.const.js';

function PendingApprovals() {
  const [showApprovalDetails, setShowApprovalDetails] = useState(false);
  const [pendingApprovalsData, setPendingApprovalsData] = useState([]);
  const [clickedRowData, setClickedRowData] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/procurement')
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log('response.data ', response.data);
        setPendingApprovalsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const onTableRowClick = (rowData) => {
    setClickedRowData(rowData);
    setShowApprovalDetails(true);
  };

  return (
    <>
      {showApprovalDetails ? (
        <ApprovalDetails detailsData={clickedRowData} isActionRequired={true} />
      ) : (
        <Container style={{ background: '#EBEEF0', padding: '10px', paddingBottom: '0px' }}>
          <Row>
            <Col className="d-flex flex-column justify-content-center">
              <div>
                <div className="pt-3 pb-3 mt-2" style={{ height: '120px' }}>
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
                    <Col lg="4" className="d-flex justify-content-end">
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
                  {pendingApprovalsData.length > 0 ? (
                    <PendingApprovalsTable
                      tableData={pendingApprovalsData}
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

export default PendingApprovals;
