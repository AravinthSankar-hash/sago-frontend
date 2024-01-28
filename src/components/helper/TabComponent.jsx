import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../../css/index.css';
import Toaster from '../helper/Snackbar.jsx';
import { Button } from '@mui/material';
import PaymentModel from './paymentModal.jsx';
import { RESPONSE_MSG } from '../sales/sale.const.js';

const TabComponent = (props) => {
  const { paymentCategory, paymentRefId, partyName } = props;
  const [dialogVisible, setDialogVisible] = useState(false);
  const [toasterBackground, setToasterBackground] = useState(null);
  const [shouldShowToaster, setShouldShowToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState('Customer data saved');

  const purchaseTab = {
    backgroundColor: props.showPurchase ? 'white' : '#F4F5F7',
    borderRadius: '10px 10px 0 0'
  };
  const paymentTab = {
    backgroundColor: props.showPurchase == false ? 'white' : '#F4F5F7',
    borderRadius: '10px 10px 0 0',
    marginLeft: '3px'
  };

  const invokeToaster = (msg, backgroundClr = '#4BB543') => {
    if (msg) {
      setToasterMsg(msg);
    }
    setToasterBackground(backgroundClr);
    setShouldShowToaster(Math.random());
  };

  const handleDialogClose = (isPaymentAdded) => {
    setDialogVisible(false);
    if (isPaymentAdded) {
      invokeToaster('Payment added successfully');
      return;
    }
    invokeToaster(RESPONSE_MSG.FAILED, 'red');
  };

  return (
    <>
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
        <Button style={{ color: '#00B7FF' }} onClick={() => setDialogVisible(true)}>
          + Add Amount
        </Button>
        {dialogVisible && (
          <PaymentModel
            paymentCategory={paymentCategory}
            paymentRefId={paymentRefId}
            partyName={partyName}
            visible={dialogVisible}
            onClose={handleDialogClose}
          />
        )}
      </div>
      <Toaster
        shouldOpen={shouldShowToaster}
        message={toasterMsg}
        backgroundColor={toasterBackground}></Toaster>
    </>
  );
};

export default TabComponent;
