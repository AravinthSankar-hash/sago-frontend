import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../css/index.css';
import ProductItem from '../catalogItems/ProductItem.jsx';
import ProductDashboard from '../ProductDashboard.jsx';
import ProductForm from '../forms/ProductForm.jsx';

// Store & Dtos & Custom Css
import '../../css/index.css';
import {
  useUpdateShowCatalogBackBtn,
  useShowProductNewForm,
  useShowProductDetailsSection,
  useUpdateShowProductNewForm,
  useUpdateShowProductDetailsSection
} from '../../store/store.js';

const Product = () => {
  // Store
  const updateShowCatalogBackBtn = useUpdateShowCatalogBackBtn();
  const showProductNewForm = useShowProductNewForm(); // Show Add Product form
  const showProductDetailsSection = useShowProductDetailsSection(); // Show Product Dashboard
  const updateShowProductNewForm = useUpdateShowProductNewForm(); // Show Product Dashboard
  const updateShowProductDetailsSection = useUpdateShowProductDetailsSection(); // Show Product Dashboard

  const showForm = () => {
    console.log('Product table SHOW FORM CLICKED');

    // Show Add Product form - Store
    updateShowProductNewForm(true);
    // Show back btn - Store
    updateShowCatalogBackBtn(true);
  };

  const onTableRowClick = () => {
    console.log('Product table row clicked');
    // Show details section - Store
    updateShowProductDetailsSection(true);
    // Show back btn - Store
    updateShowCatalogBackBtn(true);
  };
  return (
    <>
      {showProductNewForm ? (
        <>
          <Col className="d-flex flex-column justify-content-center">
            <ProductForm />
          </Col>
        </>
      ) : (
        <div>
          {showProductDetailsSection ? (
            <ProductItem />
          ) : (
            <>
              <ProductDashboard addFormBtnClick={showForm} showDetailsSection={onTableRowClick} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Product;
