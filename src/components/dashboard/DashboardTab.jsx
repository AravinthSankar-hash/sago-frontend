import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../../css/index.css';

const DashboardTab = ({ showProductGraph, switchTab }) => {
  const productGraph = {
    backgroundColor: showProductGraph ? 'white' : '#F4F5F7',
    borderRadius: '10px 10px 0 0'
  };
  const commonTabGraph = {
    backgroundColor: showProductGraph == false ? 'white' : '#F4F5F7',
    borderRadius: '10px 10px 0 0',
    marginLeft: '3px'
  };

  return (
    <div className="d-flex justify-content-between" style={{ background: 'rgb(235, 238, 240)' }}>
      <div>
        <Tabs sx={{ textTransform: 'none' }} indicatorColor="primary">
          <Tab
            value="product-tab"
            sx={{ textTransform: 'none' }}
            tabIndex={0}
            label="Product-wise Reports"
            style={productGraph}
            onClick={() => switchTab(true)}
          />
          {/* <Tab
            value="common-tab"
            sx={{ textTransform: 'none' }}
            label="Common Reports"
            style={commonTabGraph}
            onClick={() => switchTab(false)}
          /> */}
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardTab;
