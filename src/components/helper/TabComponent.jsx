import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../../css/index.css';
import { Button } from '@mui/material';

const TabComponent = (props) => {
  const purchaseTab = {
    backgroundColor: props.showPurchase ? 'white' : '#F4F5F7',
    borderRadius: '10px 10px 0 0'
  };
  const paymentTab = {
    backgroundColor: props.showPurchase == false ? 'white' : '#F4F5F7',
    borderRadius: '10px 10px 0 0',
    marginLeft: '3px'
  };

  return (
    <div className="d-flex justify-content-between" style={{ background: 'rgb(235, 238, 240)' }}>
      <div>
        <Tabs sx={{ textTransform: 'none' }} indicatorColor="primary">
          <Tab
            value="purchase"
            sx={{ textTransform: 'none' }}
            tabIndex={0}
            label={props.tabName}
            style={purchaseTab}
            onClick={() => props.showTab(true)}
          />
          <Tab
            value="payments"
            sx={{ textTransform: 'none' }}
            label="Payments"
            style={paymentTab}
            onClick={() => props.showTab(false)}
          />
        </Tabs>
      </div>
      <Button style={{ color: '#00B7FF' }}>+ Add Amount</Button>
    </div>
  );
};

export default TabComponent;
