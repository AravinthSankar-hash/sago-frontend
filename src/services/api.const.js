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
      REPORT: '/report',
      PROCUREMENT: '/procurement'
    },
    QUERY_PARAMS: {
      TP: '/tp-invoices',
      PROCUREMENT: '/procurement-invoices'
    }
  },
  SALE: {
    ROUTES: {
      BASE_ROUTE: '/sales'
    },
    SALE_TYPES: {
      dc: 'dc',
      general: 'general',
      tippi: 'tippi',
      all: 'all'
    }
  },
  GENERIC: {
    ROUTES: {
      BASE_ROUTE: '/invoice',
      TP: '/tp',
      PAYMENTS: "payments",
      TRANSACTIONS: "transactions",
      PROCUREMENT: '/procurements'
    },
    PAYMENT_CATEGORY: {
      TIPPI: 'tippi'
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
