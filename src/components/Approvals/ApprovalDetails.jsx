import { useState } from 'react';
import ProcurementDetails from '../procurement/ProcurementDetails';
import { Button, Row, Col, Container } from 'react-bootstrap';
import ActionPopup from './Popup.jsx';
import ExpenseDetails from '../../components/expense/ExpenseDetails';
import TPDetails from '../../components/tapicoPurchase/TPDetails';
import GenericApi from 'services/generic.api';

function ApprovalDetails({ detailsData, selectedChips, isActionRequired, showDetailsTab }) {
  const [modalShow, setModalShow] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(detailsData.approval_status);
  const [modalDetails, setModelDetails] = useState({
    title: 'Are you Sure?',
    body: 'Do you want to approve this purchase',
    btn1Txt: 'Cancel',
    btn2Txt: 'Approve'
  });
  const approveDetailsAction = (isApproved) => {
    setModalShow(true);
    if (!isApproved) {
      setModelDetails({
        ...modalDetails,
        body: 'Do you want to reject this purchase',
        btn2Txt: 'Reject'
      });
    }
  };
  const approvalAction = (shouldApprove) => {
    let payload = {
      item_id: detailsData.item_id,
      type: selectedChips[0]
    };
    if (modalDetails.btn2Txt == 'Approve') {
      if (shouldApprove) {
        setModalShow(false);
        setApprovalStatus('APPROVED');
        payload.approval_status = 'APPROVED';
      } else {
        setModalShow(false);
        // payload.approval_status = 'REJECTED';
      }
    } else if (modalDetails.btn2Txt == 'Reject') {
      if (shouldApprove) {
        setModalShow(false);
        setApprovalStatus('REJECTED');
        payload.approval_status = 'REJECTED';
      } else {
        setModalShow(false);
        // payload.approval_status = 'REJECTED';
      }
    }
    if (payload.approval_status) {
      GenericApi.invoiceApprove(payload);
      showDetailsTab(false);
    }
    console.log(payload, 'payyyyload');
  };
  return (
    <Container>
      <Row style={{ padding: '0px 12px', margin: '0px 28px' }}>
        {selectedChips[0] == 'procurement' && detailsData ? (
          <>
            {' '}
            <ProcurementDetails selectedPro={detailsData} />
          </>
        ) : selectedChips[0] == 'tp' && detailsData ? (
          <>
            {' '}
            <TPDetails selectedTP={detailsData} />
          </>
        ) : (
          <>
            {' '}
            <ExpenseDetails selectedExpense={detailsData} />
          </>
        )}
      </Row>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'end',
          padding: '0px 12px',
          margin: '20px 28px'
        }}>
        {isActionRequired ? (
          <>
            <Col lg="1">
              <Button variant="primary" onClick={() => approveDetailsAction(true)}>
                Approve
              </Button>
            </Col>
            <Col lg="1">
              <Button variant="danger" onClick={() => approveDetailsAction(false)}>
                Reject
              </Button>
            </Col>
          </>
        ) : (
          <Col lg="2">
            <Button
              style={{
                width: '200px',
                color: '#FFFFFF',
                border: 'none',
                backgroundColor:
                  approvalStatus === 'PENDING'
                    ? '#00B7FF'
                    : approvalStatus === 'APPROVED'
                      ? '#00875A'
                      : approvalStatus === 'REJECTED'
                        ? '#DE350B'
                        : 'inherit'
              }}
              disabled>
              {approvalStatus}
            </Button>
          </Col>
        )}
      </Row>
      <ActionPopup
        title={modalDetails.title}
        body={modalDetails.body}
        btn1Txt={modalDetails.btn1Txt}
        btn2Txt={modalDetails.btn2Txt}
        onCancel={() => approvalAction(false)}
        onAgree={() => approvalAction(true)}
        show={modalShow}
      />
    </Container>
  );
}

export default ApprovalDetails;
