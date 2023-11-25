import React, { useRef, useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Dropdown from 'react-bootstrap/Dropdown';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../css/index.css';

const AgGridTable = (props) => {
  const gridRef = useRef();
  const pageSize = 10;

  const [pageCount, setPageCount] = useState(10);
  const gridStyle = useMemo(() => ({ width: '100%', borderRadius: '30px' }), []);

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);

  const onPageSizeChanged = (value) => {
    setPageCount(value);
    gridRef.current.api.paginationSetPageSize(Number(value));
  };
  // Triggered when the grid is initialized, and the data has been rendered in the grid
  const onFirstDataRendered = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);
  return (
    <div style={containerStyle}>
      <div className="example-header">
        <Dropdown id="page-size" onSelect={onPageSizeChanged} menuVariant="dark">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Page Size: {pageCount}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="5">5</Dropdown.Item>
            <Dropdown.Item eventKey="10">10</Dropdown.Item>
            <Dropdown.Item eventKey="20">20</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="ag-theme-alpine agrid-custom-height" style={gridStyle}>
        <AgGridReact
          ref={gridRef}
          rowData={props.rowData}
          columnDefs={props.columnDefs}
          pagination={true}
          onFirstDataRendered={onFirstDataRendered}
          paginationPageSize={pageSize}></AgGridReact>
      </div>
    </div>
  );
};

export default AgGridTable;
