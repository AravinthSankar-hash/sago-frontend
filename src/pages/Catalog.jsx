import React, { useState } from 'react';
import CatalogTab from '../components/CatalogTab';
import { Container, Row, Col } from 'react-bootstrap';
import Customer from '../components/catalogTabs/Customer.jsx';
import Broker from '../components/catalogTabs/Broker.jsx';
import RawMaterial from '../components/catalogTabs/RawMaterial.jsx';
import Supplier from '../components/catalogTabs/Supplier.jsx';
import Product from '../components/catalogTabs/Product.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Vehicle from '../components/catalogTabs/Vehicle.jsx';
import Staff from '../components/catalogTabs/Staff.jsx';
import { CatalogTabItems } from '../data/catalog-tab-items.const';
import {
  useShowCatalogBackBtn,
  useUpdateShowCatalogBackBtn,
  useUpdateCurrentSelectedRowData,
  useCatalogTabIndex,
  useUpdateShowCatalogTabHomePage
} from '../store/tableDataStore';

const Catalog = () => {
  const showBackButton = useShowCatalogBackBtn();
  const updateCurrentSelectedRowDataInStore = useUpdateCurrentSelectedRowData();
  const updateShowCatalogTabHomePage = useUpdateShowCatalogTabHomePage();
  const currentTabIndex = useCatalogTabIndex();
  const updateShowBackButton = useUpdateShowCatalogBackBtn();
  const [activeTabComponent, setActiveTabComponent] = useState(<Customer />);
  const [currentTab, setCurrentTab] = useState('customers');
  const renderTabComponent = (tabName) => {
    switch (tabName) {
      case 'customers':
        return <Customer />;
      case 'brokers':
        return <Broker />;
      case 'rawmaterials':
        return <RawMaterial />;
      case 'suppliers':
        return <Supplier />;
      case 'products':
        return <Product />;
      case 'vehicles':
        return <Vehicle />;
      case 'staffs':
        return <Staff />;
      default:
        return <div>Coming soon...</div>;
    }
  };

  const handleTabSwitch = (tabName) => {
    const currentTab = renderTabComponent(tabName);
    setActiveTabComponent(currentTab);
  };

  const onBackClick = () => {
    updateShowBackButton(false);
    updateCurrentSelectedRowDataInStore({});
    setActiveTabComponent(CatalogTabItems[currentTabIndex].component);
    setCurrentTab(CatalogTabItems[currentTabIndex].name);
    updateShowCatalogTabHomePage(true);
  };

  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row style={{ background: '#ffffff', height: '56px' }}>
        {showBackButton ? (
          <Col>
            <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={onBackClick} fontSize="medium" />{' '}
            <span>&nbsp;&nbsp;</span>Back
          </Col>
        ) : (
          <CatalogTab handleTabSwitch={handleTabSwitch} tabToSelect={currentTab} />
        )}
      </Row>
      <Row>{activeTabComponent}</Row>
    </Container>
  );
};

export default Catalog;
