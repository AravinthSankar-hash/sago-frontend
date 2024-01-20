import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../../css/index.css';
import Toaster from '../helper/Snackbar.jsx';
import { Button } from '@mui/material';
import GeneralService from '../../services/generic.api.js';
import PaymentModel from './paymentModal.jsx';
import { RESPONSE_MSG } from '../sales/sale.const.js';

const TabComponent = (props) => {
  const { paymentCategory, paymentRefId } = props;
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

  const handleDialogSave = (date, mode, amount) => {
    setDialogVisible(false);
    invokePaymentSaveAPI({
      category_type: paymentCategory,
      payment_ref_id: paymentRefId,
      payment_date: date,
      amount_paid: amount
    });
  };

  const invokePaymentSaveAPI = (payload) => {
    GeneralService.addPayment(payload)
      .then((response) => {
        if (response) {
          invokeToaster('Payment added successfully');
        }
      })
      .catch((error) => {
        console.log('Error in adding Payment', error);
        invokeToaster(RESPONSE_MSG.FAILED, 'red');
      });
  };

  const invokeToaster = (msg, backgroundClr = '#4BB543') => {
    if (msg) {
      setToasterMsg(msg);
    }
    setToasterBackground(backgroundClr);
    setShouldShowToaster(Math.random());
  };

  const handleDialogClose = () => setDialogVisible(false);

  return (
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
          visible={dialogVisible}
          onSave={handleDialogSave}
          onClose={handleDialogClose}
        />
      )}
      <Toaster
        shouldOpen={shouldShowToaster}
        message={toasterMsg}
        backgroundColor={toasterBackground}></Toaster>
    </div>
  );
};

export default TabComponent;
