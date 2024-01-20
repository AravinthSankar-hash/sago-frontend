import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Store & const
import {
  useShowCatalogBackBtn,
  useUpdateShowCatalogBackBtn,
  useActiveCatalogTabComponent,
  useUpdateActiveCatalogTabComponent,
  useUpdateShowStaffDetailsSection,
  useUpdateShowStaffNewForm,
  useUpdateShowVehicleNewForm,
  useUpdateShowVehicleDetailsSection,
  useUpdateShowProductDetailsSection,
  useUpdateShowProductNewForm,
  useUpdateShowCustomerNewForm,
  useUpdateShowRawMaterialNewForm,
  useUpdateShowRawMaterialDetailsSection,
  useUpdateShowBrokerNewForm,
  useUpdateShowSupplierNewForm,
  useCatalogBackBtnTxt,
  useUpdateCatalogBackBtnTxt
} from '../store/store.js';

// Custom components & services
import CatalogTab from '../components/catalog/CatalogTab.jsx';
import Customer from '../components/catalog/catalogTabs/Customer.jsx';
import Broker from '../components/catalog/catalogTabs/Broker.jsx';
import RawMaterial from '../components/catalog/catalogTabs/RawMaterial.jsx';
import Supplier from '../components/catalog/catalogTabs/Supplier.jsx';
import Product from '../components/catalog/catalogTabs/Product.jsx';
import Vehicle from '../components/catalog/catalogTabs/Vehicle.jsx';
import Staff from '../components/catalog/catalogTabs/Staff.jsx';

const Catalog = () => {
  // Internal state
  const [currentTabName, setCurrentTabName] = useState('customers');

  // Store
  const showBackButton = useShowCatalogBackBtn(); // Bool to show/hide the back btn
  const catalogBackBtnTxt = useCatalogBackBtnTxt(); // Back Button Text
  const updateCatalogBackBtnTxt = useUpdateCatalogBackBtnTxt(); // Back Button Text
  const updateShowCatalogBackBtn = useUpdateShowCatalogBackBtn(); // Method to update bool, if back btn is clicked
  const activeCatalogTabComponent = useActiveCatalogTabComponent(); // Component initially will be customer component, will be updated whenever user clicks on any tab
  const updateActiveCatalogTabComponent = useUpdateActiveCatalogTabComponent(); // Method to update the active component, whenver the tab is clicked
  const updateShowStaffDetailsSection = useUpdateShowStaffDetailsSection(); // staff details should not be visible when back is clicked, actually whole dashboard of staff should be visible
  const updateShowStaffNewForm = useUpdateShowStaffNewForm(); // staff form should not be visible when back is clicked, actually whole dashboard of staff should be visible
  const updateShowRawMaterialDetailsSection = useUpdateShowRawMaterialDetailsSection(); // RawMaterial details should not be visible when back is clicked, actually whole dashboard of RawMaterial should be visible
  const updateShowRawMaterialNewForm = useUpdateShowRawMaterialNewForm(); // RawMaterial form should not be visible when back is clicked, actually whole dashboard of RawMaterial should be visible
  const updateShowVehicleDetailsSection = useUpdateShowVehicleDetailsSection(); // Vehicle details should not be visible when back is clicked, actually whole dashboard of staff should be visible
  const updateShowVehicleNewForm = useUpdateShowVehicleNewForm(); // Vehicle form should not be visible when back is clicked, actually whole dashboard of staff should be visible
  const updateShowProductDetailsSection = useUpdateShowProductDetailsSection(); // Product details should not be visible when back is clicked, actually whole dashboard of staff should be visible
  const updateShowProductNewForm = useUpdateShowProductNewForm(); // Product form should not be visible when back is clicked, actually whole dashboard of staff should be visible
  const updateShowCustomerNewForm = useUpdateShowCustomerNewForm(); // Customer form should not be visible when back is clicked, actually whole dashboard of customer should be visible
  const updateShowBrokerNewForm = useUpdateShowBrokerNewForm(); // Show Broker Dashboard
  const updateShowSupplierNewForm = useUpdateShowSupplierNewForm(); // Show Supplier Dashboard

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
  useEffect(() => {
    updateActiveCatalogTabComponent(<Customer />);
    // On component Init load store to defaults
    onBackBtnClick();
  }, []);

  const handleTabSwitch = (tabName) => {
    const currentTabComp = renderTabComponent(tabName);
    // On every tab switch update the active component
    updateActiveCatalogTabComponent(currentTabComp);
    setCurrentTabName(tabName);
    // Update the back button text to default
    updateCatalogBackBtnTxt('Back');
  };

  const onBackBtnClick = () => {
    updateShowCatalogBackBtn(false);
    updateShowStaffNewForm(false);
    updateShowStaffDetailsSection(false);
    updateShowRawMaterialNewForm(false);
    updateShowRawMaterialDetailsSection(false);
    updateShowVehicleNewForm(false);
    updateShowVehicleDetailsSection(false);
    updateShowProductNewForm(false);
    updateShowProductDetailsSection(false);
    updateShowCustomerNewForm(false);
    updateShowBrokerNewForm(false);
    updateShowSupplierNewForm(false);
  };

  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row style={{ background: '#ffffff', height: '56px' }}>
        {showBackButton ? (
          <Col>
            <ArrowBackIcon
              onClick={onBackBtnClick}
              style={{ cursor: 'pointer' }}
              fontSize="medium"
            />{' '}
            <span>&nbsp;&nbsp;</span>
            {catalogBackBtnTxt}
          </Col>
        ) : (
          <CatalogTab handleTabSwitch={handleTabSwitch} tabToSelect={currentTabName} />
        )}
      </Row>
      <Row>{activeCatalogTabComponent}</Row>
    </Container>
  );
};

export default Catalog;
