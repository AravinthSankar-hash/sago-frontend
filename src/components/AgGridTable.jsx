import React from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../css/index.css';

const AgGridTable = (props) => {
  return (
    <div className="ag-theme-alpine" style={{ height: '607px', 'border-radius': '30px' }}>
      <AgGridReact rowData={props.rowData} columnDefs={props.columnDefs}></AgGridReact>
    </div>
  );
};

export default AgGridTable;
