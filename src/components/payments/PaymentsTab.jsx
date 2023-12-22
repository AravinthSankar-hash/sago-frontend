import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../../css/index.css';

function PaymentsTab({ handleTabSwitch, tabToSelect }) {
  const [value, setValue] = useState(tabToSelect);

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
        <Tab
          value="pendingPayments"
          sx={{ textTransform: 'none' }}
          tabIndex={0}
          label="Pending Payments"
        />
        <Tab value="completedPayments" sx={{ textTransform: 'none' }} label="Completed Payments" />
        <Tab value="txnHistory" sx={{ textTransform: 'none' }} label="Transaction history" />
      </Tabs>
    </Box>
  );
}

export default PaymentsTab;
