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
      BROKER_REPORT: '/broker-purchases',
      REPORT: '/reports',
      PROCUREMENT: '/procurement',
      EXPENSES: '/expense'
    },
    QUERY_PARAMS: {
      TP: '/tp-invoices',
      PROCUREMENT: '/procurement-invoices',
      EXPENSES: '/expense-invoices'
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
  INVENTORY: {
    ROUTES: {
      BASE_ROUTE: '/inventory',
      INVENTORY: '/add-stock'
    },
    QUERY_PARAMS: {
      INVENTORYLIST: '/list-stocks',
      INVENTORYSTATS: '/stats'
    }
  },
  GENERIC: {
    ROUTES: {
      BASE_ROUTE: '/invoice',
      TP: '/tp',
      PAYMENTS: 'payments',
      TRANSACTIONS: 'transactions',
      PROCUREMENT: '/procurements',
      EXPENSES: '/expenses',
      PURCHASE: '/purchase'
    },
    PAYMENT_CATEGORY: {
      TIPPI: 'tippi'
    },
    INVOICE_APPROVAL: {
      APPROVE: '/invoice-action'
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
