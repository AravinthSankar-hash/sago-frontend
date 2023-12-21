import { useEffect, useState } from 'react';
import ApprovalDetails from './ApprovalDetails';
import PendingApprovalsDashboard from './PendingApprovalsDashboard';

function PendingApprovals() {
  const [showApprovalDetails, setShowApprovalDetails] = useState(false);
  const [pendingApprovalsData, setPendingApprovalsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/approvals')
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        setPendingApprovalsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const onTableRowClick = () => {
    setShowApprovalDetails(true);
  };

  return (
    <>
      {showApprovalDetails ? (
        <ApprovalDetails />
      ) : (
        <>
          <PendingApprovalsDashboard
            tableData={pendingApprovalsData}
            showDetailsSectionHandler={onTableRowClick}
          />
        </>
      )}
    </>
  );
}

export default PendingApprovals;
