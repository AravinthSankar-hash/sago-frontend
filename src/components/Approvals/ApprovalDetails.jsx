import TPDetails from 'components/tapicoPurchase/TPDetails';
import { useRef, useMemo } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
function ApprovalDetails() {
  const containerRef = useRef();
  const gridStyle = useMemo(
    () => ({
      width: '100%',
      borderRadius: '10px',
      overflowY: 'auto',
      maxHeight: '100%',
      backgroundColor: 'white'
    }),
    []
  );
  return (
    <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
      <Row>
        <TPDetails />
      </Row>
      <Row></Row>
    </Container>
  );
}

export default ApprovalDetails;
