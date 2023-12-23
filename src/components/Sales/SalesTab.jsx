import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../../css/index.css';

const SalesTab = ({ handleTabSwitch, tabToSelect }) => {
  const [value, setValue] = useState(tabToSelect);

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
      <Tab
        value="deliveryChallan"
        sx={{ textTransform: 'none' }}
        tabIndex={0}
        label="Delivery Challan"
      />
      <Tab value="thippiSales" sx={{ textTransform: 'none' }} label="Thippi Sales" />
      <Tab value="generalSales" sx={{ textTransform: 'none' }} label="General Sales" />
      <Tab value="salesPerformance" sx={{ textTransform: 'none' }} label="Sales Performance" />
    </Tabs>
  );
};

export default SalesTab;
