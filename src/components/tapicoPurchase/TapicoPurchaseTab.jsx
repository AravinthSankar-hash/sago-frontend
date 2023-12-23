import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../../css/index.css';

function TapicoPurchaseTab({ handleTabSwitch }) {
  const [value, setValue] = React.useState('purchases');

  const handleChange = (event, tabName) => {
    setValue(tabName);
    handleTabSwitch(tabName);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      sx={{ textTransform: 'none' }}
      indicatorColor="primary">
      <Tab value="purchases" sx={{ textTransform: 'none' }} tabIndex={0} label="Purchases" />
      <Tab value="brokerreports" sx={{ textTransform: 'none' }} label="Broker Reports" />
      <Tab value="reports" sx={{ textTransform: 'none' }} label="Reports" />
    </Tabs>
  );
}

export default TapicoPurchaseTab;
