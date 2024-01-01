import { Container, Row, Col } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import InventoryStatsGraphTable from './InventoryStatsGraphTable.jsx';
import { tableHeaders, tableData, tableColumns } from './inventory.const.js';
import SearchBox from '../helper/SearchBox.jsx';
import DateSelector from '../helper/DateSelector.jsx';
// Graph Spec
import { areaGraphOptions, areaGraphDataPoints } from '../dashboard/graph-spec.js';
import '../../css/index.css';

const InventoryStatsGraph = () => {
  const handleChangePage = () => {};
  return (
    <>
      <Container>
        <Row>
          <Col lg="6" className="d-flex flex-column">
            {/* Filters */}
            <div className="pt-3 pb-3 mt-2" style={{ height: '120px' }}>
              <Row style={{ display: 'flex' }}>
                <Col lg="4">
                  <SearchBox placeHolder={'Search here'}></SearchBox>
                </Col>
                <Col lg="4">
                  <DateSelector size="smaller" customLabel="From"></DateSelector>
                </Col>
                <Col lg="4">
                  <DateSelector customLabel="To"></DateSelector>
                </Col>
              </Row>
            </div>
            {/* Table */}
            <div>
              {tableData.length && (
                <InventoryStatsGraphTable
                  tableData={tableData}
                  tableHeaders={tableHeaders}
                  tableColumns={tableColumns}
                  handleChangePage={handleChangePage}
                />
              )}
            </div>
          </Col>
          <Col lg="6">
            <div className="pt-3 pb-3 mt-2" style={{ height: '120px' }}></div>
            <Chart
              options={areaGraphOptions}
              type="area"
              series={areaGraphDataPoints}
              height="630"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InventoryStatsGraph;
