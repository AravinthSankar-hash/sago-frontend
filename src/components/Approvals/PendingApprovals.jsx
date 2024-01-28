import { useEffect, useState } from 'react';
import ApprovalDetails from './ApprovalDetails';
import { IconButton, Chip, Box, CircularProgress, Stack } from '@mui/material';
import DateSelector from '../helper/DateSelector';
import SearchBox from '../helper/SearchBox';
import { Container, Row, Col } from 'react-bootstrap';
import IosShareIcon from '@mui/icons-material/IosShare';
import PendingApprovalsTable from './PendingApprovalsTable';
import { tableColumns, tableHeaders } from './approvals.const.js';
// Store
import {
  useUpdateShowApprovalsBackBtn,
  useShowPendingApprovalDetails,
  useUpdateShowPendingApprovalDetails
} from '../../store/store.js';

function PendingApprovals() {
  const [pendingApprovalsData, setPendingApprovalsData] = useState([]);
  const [clickedRowData, setClickedRowData] = useState({});
  // Store
  const updateShowApprovalsBackBtn = useUpdateShowApprovalsBackBtn();
  const showPendingApprovalDetails = useShowPendingApprovalDetails();
  const updateShowPendingApprovalDetails = useUpdateShowPendingApprovalDetails();

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

  const [selectedChips, setSelectedChips] = useState(['procurement']);
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
    if (labelObj.displayLabel === 'All') {
      setSelectedChips(['All']);
      return;
    }

    const updatedChipSet = new Set(selectedChips);

    if (updatedChipSet.has('All')) {
      updatedChipSet.delete('All');
    }

    if (updatedChipSet.has(labelObj.value)) {
      updatedChipSet.delete(labelObj.value);
    } else {
      updatedChipSet.add(labelObj.value);
    }

    if (!updatedChipSet.size) {
      updatedChipSet.add('All');
    }
    setSelectedChips([...updatedChipSet]);
  };

  const onTableRowClick = (rowData) => {
    setClickedRowData(rowData);
    updateShowPendingApprovalDetails(true);
    updateShowApprovalsBackBtn(true);
  };

  return (
    <>
      {showPendingApprovalDetails ? (
        <ApprovalDetails detailsData={clickedRowData} isActionRequired={true} />
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
                      {filterOptions.map((filterOptionObj, index) => (
                        <Chip
                          key={index}
                          label={filterOptionObj.displayLabel}
                          // color={selectedChips.includes(filterOption) ? 'primary' : 'default'}
                          onClick={() => handleChipSelect(filterOptionObj)}
                          sx={chipStyle(selectedChips.includes(filterOptionObj.value))}
                        />
                      ))}
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
