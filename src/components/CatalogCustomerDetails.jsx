import React from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

const CatalogCustomerDetails = (props) => {
  const headingStyle = {
    backgroundColor: '#FFFFFF',
    height: '100%',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between'
  };
  return (
    <div style={headingStyle}>
      <h1 style={{ fontSize: '16px' }}>Customer Details</h1>
      <MoreVertOutlinedIcon
        fontSize="small"
        style={{ cursor: 'pointer', color: '#B2B3B7' }}
        onClick={() => props.closeDetails(false)}
      />
    </div>
  );
};

export default CatalogCustomerDetails;
