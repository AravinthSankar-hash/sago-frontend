import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../css/index.css';

export default function CatalogTab({ handleTabSwitch }) {
  const [value, setValue] = React.useState('customers');

  const handleChange = (event, tabName) => {
    setValue(tabName);
    handleTabSwitch(tabName);
  };

  return (
    <Box sx={{ width: '100%', textTransform: 'none' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{ textTransform: 'none' }}
        indicatorColor="primary">
        <Tab value="customers" sx={{ textTransform: 'none' }} tabIndex="0" label="Customers" />
        <Tab value="brokers" sx={{ textTransform: 'none' }} label="Brokers" />
        <Tab value="suppliers" sx={{ textTransform: 'none' }} label="Suppliers" />
        <Tab value="products" sx={{ textTransform: 'none' }} label="Products" />
        <Tab value="vehicles" sx={{ textTransform: 'none' }} label="Vehicles" />
        <Tab value="staffs" sx={{ textTransform: 'none' }} label="Staffs" />
      </Tabs>
    </Box>
  );
}