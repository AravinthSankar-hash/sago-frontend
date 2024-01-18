const BASE_ROUTE = '/api';
const BASE_URL = 'http://localhost:3333';
const SERVICES = {
  CATALOG: {
    ROUTES: {
      BASE_ROUTE: '/catalog',
      STAFF: '/staff',
      VEHICLE: '/vehicle',
      PRODUCT: '/product',
      RAWMATERIAL: '/raw-material',
      PARTNER: '/partner'
    },
    QUERY_PARAMS: {
      CUSTOMER: 'customer',
      BROKER: 'broker',
      SUPPLIER: 'supplier',
      STAFFS: 'staff',
      PRODUCTS: 'product',
      VEHICLES: 'vehicle',
      RAWMATERIALS: 'raw-material'
    }
  },
  TP: {
    ROUTES: {
      BASE_ROUTE: '/purchase',
      TP: '/tp',
      BROKERREPORT: '/broker-purchases',
      REPORT: '/report'
    }
  },
  GENERIC: {
    ROUTES: {
      BASE_ROUTE: '/invoice',
      TP: '/tp'
    }
  }
};

const HTTP_METHODS = {
  POST: 'POST',
  GET: 'GET',
  UPDATE: 'PUT',
  DELETE: 'DELETE'
};

export { BASE_ROUTE, BASE_URL, SERVICES, HTTP_METHODS };
