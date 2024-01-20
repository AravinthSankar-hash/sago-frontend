import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import ProductItem from '../catalogItems/ProductItem.jsx';
import ProductForm from '../forms/ProductForm.jsx';
import SearchBox from '../../helper/SearchBox.jsx';
import DateSelector from '../../helper/DateSelector.jsx';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { productTableHeaders, productTableColumns, RESPONSE_MSG } from '../catalog.const';
import Toaster from '../../helper/Snackbar.jsx';
import { isNumeric } from '../../helper/helper.js';

// Store & Dtos & Custom Css
import '../../../css/index.css';
import {
  useUpdateShowCatalogBackBtn,
  useShowProductNewForm,
  useShowProductDetailsSection,
  useUpdateShowProductNewForm,
  useUpdateShowProductDetailsSection,
  useUpdateCatalogBackBtnTxt
} from '../../../store/store.js';
import ProductTable from '../catalogTables/ProductTable.jsx';
// API
import CatalogService from 'services/catalog.api.js';
import { SERVICES } from '../../../services/api.const.js';

const Product = () => {
  useEffect(() => {
    // By default invoke the fetch API with default limit and page
    invokeSearchAPI(searchPayload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
  }, []);

  // Store
  const updateShowCatalogBackBtn = useUpdateShowCatalogBackBtn();
  const showProductNewForm = useShowProductNewForm(); // Show Add Product form
  const updateCatalogBackBtnTxt = useUpdateCatalogBackBtnTxt(); // Back Button Text
  const showProductDetailsSection = useShowProductDetailsSection(); // Show Product Dashboard
  const updateShowProductNewForm = useUpdateShowProductNewForm(); // Show Product Dashboard
  const updateShowProductDetailsSection = useUpdateShowProductDetailsSection(); // Show Product Dashboard
  const [productData, setProductData] = useState([]);
  const [totalProductDataCount, setTotalProductDataCount] = useState(0);
  const [selectedChips, setSelectedChips] = useState([]);
  const [showFields, setShowFields] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState();
  const [shouldShowToaster, setShouldShowToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState('Product data saved');
  const [toasterBackground, setToasterBackground] = useState(null);
  const [searchPayload, setSearchPayload] = useState({});
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(10);

  useEffect(() => {
    CatalogService.getItems(SERVICES.CATALOG.QUERY_PARAMS.PRODUCTS)
      .then((response) => {
        setProductData(response.data.data);
      })
      .catch((error) => {
        console.log('Error in getting product data', error);
      });
  }, []);

  const buttonStyle = {
    borderColor: '#00B7FF',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '2px solid',
    color: '#00B7FF',
    font: '14px',
    textTransform: 'none',
    fontWeight: 'bold'
  };

  const chipStyle = (isSelected) => ({
    border: '2px solid #00b7ff',
    borderRadius: '8px',
    backgroundColor: isSelected ? '#00b7ff' : 'white',
    color: isSelected ? 'white' : '#00b7ff',
    ':hover': {
      background: '#00b7ff',
      color: 'white',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)'
    },
    cursor: 'pointer'
  });

  const handleChipSelect = (label) => {
    if (selectedChips.includes(label)) {
      setSelectedChips((prevSelectedChips) => prevSelectedChips.filter((chip) => chip !== label));
    } else {
      setSelectedChips((prevSelectedChips) => [prevSelectedChips, label]);
    }
  };

  const productPageChanged = (currentPageNo, rowsPerPage) => {
    setCurrentRowsPerPage(rowsPerPage);
    console.log('page changed - ', currentPageNo, rowsPerPage);
    invokeSearchAPI(searchPayload, `page=${currentPageNo + 1}&limit=${rowsPerPage}`);
  };

  const invokeSearchAPI = (payload, query = null) => {
    CatalogService.getItems(SERVICES.CATALOG.QUERY_PARAMS.PRODUCTS, payload, query)
      .then((response) => {
        setProductData(response.data.data);
        setTotalProductDataCount(response.data.totalCount);
        if (response.data?.data.length === 0) {
          invokeToaster(RESPONSE_MSG.NO_DATA_FOUND);
        }
      })
      .catch((error) => {
        console.log('Error in searching Product data', error);
        invokeToaster(RESPONSE_MSG.INVALID_SEARCH_TEXT, 'red');
      });
  };

  const showForm = (shouldShow) => {
    console.log('Product table SHOW FORM CLICKED');

    // Show Add Product form - Store
    updateShowProductNewForm(shouldShow);
    // Show back btn - Store
    updateShowCatalogBackBtn(shouldShow);
    updateCatalogBackBtnTxt('Add Product');
  };

  const onTableRowClick = (clickedRow) => {
    setSelectedProduct(clickedRow);
    console.log('Product table row clicked');
    // Show details section - Store
    updateShowProductDetailsSection(true);
    // Show back btn - Store
    updateShowCatalogBackBtn(true);
    updateCatalogBackBtnTxt('Product Details');
  };
  const onProductSave = (newAddedProduct) => {
    invokeToaster();
    updateShowProductNewForm(false);
    updateShowCatalogBackBtn(false);
    setProductData((products) => [newAddedProduct, ...products]);
  };

  const onSearchBoxValueChange = (currentInputValue) => {
    const isPhoneNumberSearch = isNumeric(currentInputValue);
    const payload = {
      ...(currentInputValue && { [isPhoneNumberSearch ? 'phone' : 'name']: currentInputValue })
    };
    setSearchPayload(payload);
    invokeSearchAPI(payload, `page=${0 + 1}&limit=${currentRowsPerPage}`);
  };

  // Just a generic method to invoke toaster
  const invokeToaster = (msg, backgroundClr = null) => {
    if (msg) {
      setToasterMsg(msg);
    }
    if (backgroundClr) {
      setToasterBackground(backgroundClr);
    }
    setShouldShowToaster(true);
  };

  return (
    <>
      {showProductNewForm ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <ProductForm showForm={showForm} productAdded={onProductSave} />
          </Col>
        </>
      ) : (
        <div>
          {showProductDetailsSection ? (
            <ProductItem productDetails={selectedProduct} />
          ) : (
            <>
              <div style={{ padding: '0px 12px', margin: '0px 28px' }}>
                <div className="pt-3 pb-3 m-2" style={{ height: '120px' }}>
                  <Row style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Col lg="3">
                      <SearchBox
                        placeHolder={'Search Here'}
                        inputValueChanged={onSearchBoxValueChange}></SearchBox>
                    </Col>
                    {!showFields && (
                      <>
                        <Col lg="2">
                          <DateSelector size="smaller" customLabel="From"></DateSelector>
                        </Col>
                        <Col lg="2">
                          <DateSelector customLabel="To"></DateSelector>
                        </Col>
                      </>
                    )}
                    <Col lg="7" className="d-flex justify-content-end">
                      <IconButton size="small">
                        <IosShareIcon
                          fontSize="small"
                          style={{
                            wordSpacing: 1
                          }}
                        />
                        {showFields && 'Export Data'}
                      </IconButton>
                    </Col>
                    {showFields && (
                      <Col lg="2" className="d-flex justify-content-end">
                        <Button sx={buttonStyle} variant="outlined" onClick={showForm}>
                          <AddIcon fontSize="small" sx={{ color: '#00B7FF' }} />
                          New Product
                        </Button>
                      </Col>
                    )}
                  </Row>
                  <Row className="mt-3">
                    <Stack direction="row" spacing={1}>
                      <p style={{ color: '#6B778C' }}>Filter by : </p>
                      <Chip
                        label="All"
                        sx={chipStyle(selectedChips.includes('All'))}
                        onClick={() => handleChipSelect('All')}
                      />
                      <Chip
                        label="Paid"
                        sx={chipStyle(selectedChips.includes('Paid'))}
                        onClick={() => handleChipSelect('Paid')}
                      />
                      <Chip
                        label="Unpaid"
                        sx={chipStyle(selectedChips.includes('Unpaid'))}
                        onClick={() => handleChipSelect('Unpaid')}
                      />
                    </Stack>
                  </Row>
                </div>
                <Row>
                  <Col className="d-flex flex-column justify-content-center">
                    {productData.length ? (
                      <ProductTable
                        tableData={productData}
                        tableHeaders={productTableHeaders}
                        tableColumns={productTableColumns}
                        totalProductDataCount={totalProductDataCount}
                        hanldePageChange={productPageChanged}
                        tableRowClicked={onTableRowClick}
                        rowsPerPage={10}
                        page={5}
                      />
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </div>{' '}
            </>
          )}
          <Toaster
            shouldOpen={shouldShowToaster}
            message={toasterMsg}
            backgroundColor={toasterBackground}></Toaster>
        </div>
      )}
    </>
  );
};

export default Product;
