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
import { tableHeaders, tableColumns } from '../components/tapicoPurchase/tp.const.js';
import sago_icon from '../assets/images/sago_inventory.svg';
import chart_icon from '../assets/images/chart_icon_inventory.svg';
import InventoryNewForm from 'components/inventory/InventoryNewForm.jsx';
import InventoryStatsGraph from 'components/inventory/InventoryStatsGraph.jsx';

function Inventory() {
  const [showNewForm, setShowNewForm] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [showInventoryDetails, setShowInventoryDetails] = useState(true);
  const [showInventoryNewForm, setShowInventoryNewForm] = useState(false);
  const [showCharts, setShowCharts] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/broker-reports')
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        setInventoryData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const showForm = (shouldShow) => {
    setShowNewForm(shouldShow);
  };

  const onInventoryDataSave = (newAddedInventory) => {
    setInventoryData((brokers) => [newAddedInventory, ...brokers]);
  };
  const handleTableClick = () => {
    setShowInventoryDetails(true);
  };
  const addNewInventoryDataHanlder = () => {
    setShowInventoryNewForm(true);
  };
  const viewChat = () => {
    setShowCharts(true);
  };

  const boldNumbers = { fontSize: '18px' };

  const fontHeader = { font: 'Roboto', color: '#62728D', fontSize: '12px' };
  const fontValue = { font: 'Roboto', fontSize: '12px' };
  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row style={{ background: '#ffffff', height: '56px', alignItems: 'center' }}>
        <Col>Inventory</Col>
      </Row>
      {showCharts ? (
        <InventoryStatsGraph />
      ) : (
        <>
          {showInventoryNewForm ? (
            <InventoryNewForm />
          ) : (
            <Row>
              {showInventoryDetails && (
                <Col lg={2} style={{ padding: '15px', marginLeft: '30px' }}>
                  <Row
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
                        <label style={fontHeader}>Sago</label>
                      </Row>
                      <Row>
                        <span style={fontValue}>
                          <text style={boldNumbers}>1000</text> Bags
                        </span>
                      </Row>
                    </Col>
                    <hr style={{ color: '#62728D' }}></hr>
                    <Row>
                      <Col style={{ cursor: 'pointer' }}>
                        <Image style={{ height: '17px', width: '17px' }} src={chart_icon} />
                        <span style={{ ...fontValue, color: '#00B7FF', marginLeft: '15px' }}>
                          <u onClick={viewChat}>View Charts</u>
                        </span>
                      </Col>
                    </Row>
                  </Row>
                  <Row
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
                        <label style={fontHeader}>Broken</label>
                      </Row>
                      <Row>
                        <span style={fontValue}>
                          <text style={boldNumbers}>2000</text> Bags
                        </span>
                      </Row>
                    </Col>
                    <hr style={{ color: '#62728D' }}></hr>
                    <Row>
                      <Col>
                        <Image style={{ height: '17px', width: '17px' }} src={chart_icon} />
                        <span style={{ ...fontValue, color: '#00B7FF', marginLeft: '15px' }}>
                          <u>View Charts</u>
                        </span>
                      </Col>
                    </Row>
                  </Row>
                  <Row
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
                        <label style={fontHeader}>Dry Thippi</label>
                      </Row>
                      <Row>
                        <span style={fontValue}>
                          <text style={boldNumbers}>2000</text> Bags
                        </span>
                      </Row>
                    </Col>
                    <hr style={{ color: '#62728D' }}></hr>
                    <Row>
                      <Col>
                        <Image style={{ height: '17px', width: '17px' }} src={chart_icon} />
                        <span style={{ ...fontValue, color: '#00B7FF', marginLeft: '15px' }}>
                          <u>View Charts</u>
                        </span>
                      </Col>
                    </Row>
                  </Row>
                  <Row
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
                        <label style={fontHeader}>Wet Thippi</label>
                      </Row>
                      <Row>
                        <span style={fontValue}>
                          <text style={boldNumbers}>2000</text> Bags
                        </span>
                      </Row>
                    </Col>
                    <hr style={{ color: '#62728D' }}></hr>
                    <Row>
                      <Col>
                        <Image style={{ height: '17px', width: '17px' }} src={chart_icon} />
                        <span style={{ ...fontValue, color: '#00B7FF', marginLeft: '15px' }}>
                          <u>View Charts</u>
                        </span>
                      </Col>
                    </Row>
                  </Row>
                  <Row
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
                        <label style={fontHeader}>Starch</label>
                      </Row>
                      <Row>
                        <span style={fontValue}>
                          <text style={boldNumbers}>5000</text> Bags
                        </span>
                      </Row>
                    </Col>
                    <hr style={{ color: '#62728D' }}></hr>
                    <Row>
                      <Col>
                        <Image style={{ height: '17px', width: '17px' }} src={chart_icon} />
                        <span style={{ ...fontValue, color: '#00B7FF', marginLeft: '15px' }}>
                          <u>View Charts</u>
                        </span>
                      </Col>
                    </Row>
                  </Row>
                </Col>
              )}
              <Col
                lg={showInventoryDetails ? 9 : 12}
                className="d-flex flex-column justify-content-center">
                {/* Filters */}
                <div className="pt-3 pb-3 mt-2" style={{ height: '120px' }}>
                  <Row>
                    <Col lg="3">
                      <SearchBox placeHolder={'Search here'}></SearchBox>
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
                  {inventoryData.length > 0 ? (
                    <InventoryTable
                      tableData={inventoryData}
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
          )}
        </>
      )}
    </Container>
  );
}

export default Inventory;
