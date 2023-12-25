import { useState } from 'react';
import ProcurementDetails from 'components/ProcurementDetails';
import { Button, Row, Col } from 'react-bootstrap';
import ActionPopup from './Popup.jsx';

function ApprovalDetails({ detailsData, isActionRequired }) {
  const [modalShow, setModalShow] = useState(false);
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
  return (
    <>
      <Row className="theen">
        <ProcurementDetails rowData={detailsData} />
      </Row>
      <Row style={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
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
              style={{ width: '200px' }}
              variant="primary"
              disabled
              onClick={() => setModalShow(true)}>
              Approved
            </Button>
          </Col>
        )}
      </Row>
      <ActionPopup
        title={modalDetails.title}
        body={modalDetails.body}
        btn1Txt={modalDetails.btn1Txt}
        btn2Txt={modalDetails.btn2Txt}
        onCancel={() => setModalShow(false)}
        onAgree={() => setModalShow(true)}
        show={modalShow}
      />
    </>
  );
}

export default ApprovalDetails;
