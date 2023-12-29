import React, { useState, useEffect } from 'react';
import BrokerReportsTable from './BrokerReportsTable.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Col, Container, Row } from 'react-bootstrap';
import SearchBox from '../helper/SearchBox.jsx';
import IconButton from '@mui/material/IconButton';
import '../../css/index.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import IosShareIcon from '@mui/icons-material/IosShare';
import { tableHeaders, tableColumns } from './tp.const';

function BrokerReports() {
  const [brokerReportsData, setBrokerReportsData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/broker-reports')
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        setBrokerReportsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const [selectedChips, setSelectedChips] = useState([]);
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
    setSelectedChips([]);
    setSelectedChips([label]);
  };
  const [showBrokerReportDetails, setShowBrokerReportDetails] = useState(false);
  const handleTableClick = () => {
    setShowBrokerReportDetails(true);
  };
  const fontHeader = { font: 'Roboto', color: '#62728D', fontSize: '14px' };
  const fontValue = { font: 'Roboto', fontSize: '14px' };
  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row>
        {showBrokerReportDetails && (
          <Col lg={3} style={{ padding: '20px' }}>
            <Row
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                borderLeft: '5px solid #57D0FF'
              }}>
              <Col style={{ padding: '20px' }}>
                <Row>
                  <label style={fontHeader}>Broker Name</label>
                  <p style={fontValue}>Aravinth Sankar</p>
                </Row>
                <Row>
                  <label style={fontHeader}>Last Purchase Date</label>
                  <p style={fontValue}>25 Oct 23</p>
                </Row>
                <Row>
                  <label style={fontHeader}>Avg Rate</label>
                  <p style={fontValue}>61,412</p>
                </Row>
              </Col>
              <Col style={{ padding: '20px' }}>
                <Row>
                  <label style={fontHeader}>AP</label>
                  <p style={fontValue}>8.3</p>
                </Row>{' '}
                <Row>
                  <label style={fontHeader}>TP</label>
                  <p style={fontValue}>28.10</p>
                </Row>{' '}
                <Row>
                  <label style={fontHeader}>Total Bags</label>
                  <p style={fontValue}>13,000</p>
                </Row>
              </Col>
            </Row>
            <Row
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                borderLeft: '5px solid #00875A',
                marginTop: '20px',
                paddingLeft: '10px',
                padding: '15px'
              }}>
              <label style={fontHeader}>Total Payment</label>
              <p style={fontValue}>1,00,000</p>
            </Row>
            <Row
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                borderLeft: '5px solid #BF2600',
                padding: '15px',
                paddingLeft: '10px',
                marginTop: '20px'
              }}>
              <label style={fontHeader}>Pending Payment</label>
              <p style={fontValue}>3000</p>
            </Row>
          </Col>
        )}
        <Col
          lg={showBrokerReportDetails ? 9 : 12}
          className="d-flex flex-column justify-content-center">
          {/* Filters */}
          <div className="pt-3 pb-3 mt-2" style={{ height: '120px' }}>
            <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Col lg="3">
                <SearchBox placeHolder={'Search here'}></SearchBox>
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
            </Row>
            <Row className="mt-3">
              <Stack direction="row" spacing={1}>
                <p style={{ color: '#6B778C' }}>Filter by : </p>
                <Chip
                  label="All"
                  color={selectedChips.includes('Unpaid') ? 'primary' : 'default'}
                  onClick={() => handleChipSelect('All')}
                  sx={chipStyle(selectedChips.includes('All'))}
                />
                <Chip
                  label="Paid"
                  color={selectedChips.includes('Unpaid') ? 'primary' : 'default'}
                  onClick={() => handleChipSelect('Paid')}
                  sx={chipStyle(selectedChips.includes('Paid'))}
                />
                <Chip
                  label="Unpaid"
                  color={selectedChips.includes('Unpaid') ? 'primary' : 'default'}
                  onClick={() => handleChipSelect('UnPaid')}
                  sx={chipStyle(selectedChips.includes('UnPaid'))}
                />
              </Stack>
            </Row>
          </div>
          {/* Table */}
          <div onClick={handleTableClick}>
            {brokerReportsData.length > 0 ? (
              <BrokerReportsTable
                tableData={brokerReportsData}
                tableHeaders={tableHeaders}
                tableColumns={tableColumns}
              />
            ) : (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default BrokerReports;
