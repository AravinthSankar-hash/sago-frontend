import { useState, useEffect } from 'react';
import TPAddForm from './TPAddForm.jsx';
import TPDetails from './TPDetails.jsx';
import TPDashboard from './TPDashboard.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import SearchBox from '../helper/SearchBox.jsx';
import DateSelector from '../helper/DateSelector.jsx';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import '../../css/index.css';
import TPPurchaseTable from './TPPurchaseTable';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {
  useShowTPPurchaseNewForm,
  useUpdateShowTPPurchaseNewForm,
  useShowPurhcaseDetails,
  useUpdateShowTPBackBtn,
  useUpdateShowPurhcaseDetails
} from '../../store/store';

function Purchases() {
  const [tPData, setTPData] = useState([]);
  const [rowData, setRowData] = useState({});

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
  useEffect(() => {
    fetch('http://localhost:3001/procurement')
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        setTPData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  // Store
  const showTPPurchaseNewForm = useShowTPPurchaseNewForm(); // Show TP Add form
  const updateShowTPPurchaseNewForm = useUpdateShowTPPurchaseNewForm();
  const updateShowTPBackBtn = useUpdateShowTPBackBtn(); // Bool to show/hide the back TP btn
  const showPurhcaseDetails = useShowPurhcaseDetails();
  const updateShowPurhcaseDetails = useUpdateShowPurhcaseDetails();
  const hanldeAddPurchaseFormClick = () => {
    updateShowTPPurchaseNewForm(true);
    updateShowTPBackBtn(true);
  };
  const onTableRowClick = (rowData) => {
    console.log('TP Purchase table row clicked');
    updateShowTPBackBtn(true);
    setRowData(rowData);
    // Show details section - Store
    updateShowPurhcaseDetails(true);
    // Show back btn - Store
  };

  return (
    <>
      {showTPPurchaseNewForm ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <TPAddForm />
          </Col>
        </>
      ) : (
        <div>
          {showPurhcaseDetails ? (
            <TPDetails rowData={rowData} />
          ) : (
            <>
              {/* <TPDashboard
                showAddPurchaseForm={hanldeAddPurchaseFormClick}
                showDetailsSection={onTableRowClick}
              /> */}
              <Container style={{ background: '#EBEEF0' }}>
                <Row>
                  <Col className="d-flex flex-column justify-content-center">
                    <div>
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
                          <Col lg="3" className="d-flex justify-content-end">
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
                          <Col lg="2">
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
                              onClick={() => hanldeAddPurchaseFormClick(true)}>
                              <AddIcon fontSize="small" sx={{ color: '#00B7FF' }} />
                              New Purchase
                            </Button>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Stack direction="row" spacing={1}>
                            <p style={{ color: '#6B778C' }}>Filter by : </p>
                            <Chip label="All" color={'primary'} />
                            <Chip label="Paid" color={'default'} />
                            <Chip label="Unpaid" color={'default'} />
                          </Stack>
                        </Row>
                      </div>
                      <div>
                        {tPData.length > 0 ? (
                          <TPPurchaseTable
                            tableData={tPData}
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
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Purchases;
