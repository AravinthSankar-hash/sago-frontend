import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../../css/index.css';

function ApprovalsTab({ handleTabSwitch, tabToSelect }) {
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
          value="pendingApprovals"
          sx={{ textTransform: 'none' }}
          tabIndex={0}
          label="Pending Approvals"
        />
        <Tab value="approvalHistory" sx={{ textTransform: 'none' }} label="Approval History" />
      </Tabs>
    </Box>
  );
}

export default ApprovalsTab;
