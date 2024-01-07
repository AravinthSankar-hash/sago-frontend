export const customerTableHeaders = [
  {
    headerKey: 'Customer Name',
    sortKey: 'customer_name',
    sortEnabled: true
  },
  {
    headerKey: 'Phone',
    sortKey: 'phone',
    sortEnabled: true
  },
  {
    headerKey: 'Email',
    sortKey: 'email'
  },
  {
    headerKey: 'Type',
    sortKey: 'customer_type',
    sortEnabled: true
  },
  {
    headerKey: 'City',
    sortKey: 'city'
  },
  {
    headerKey: 'State',
    sortKey: 'state'
  },
  {
    headerKey: 'Aadhar',
    sortKey: 'aadhar'
  }
];

export const customerTableColumns = [
  'customer_name',
  'phone',
  'email',
  'customer_type',
  'city',
  'aadhar',
  'aadhar'
];

export const brokerTableHeadersSample = [
  {
    headerKey: 'Broker Name',
    sortKey: 'broker_name',
    sortEnabled: true
  },
  {
    headerKey: 'Address',
    sortKey: 'address',
    sortEnabled: true
  },
  {
    headerKey: 'Com. %',
    sortKey: 'commission_percent'
  },
  {
    headerKey: 'Bank Name',
    sortKey: 'bank_name'
  },
  {
    headerKey: 'Balance',
    sortKey: 'open_balance'
  },
  {
    headerKey: 'City',
    sortKey: 'city'
  }
];

export const brokerTableHeaders = [
  'Broker Name',
  'Address',
  'Com. %',
  'Bank Name',
  'Balance',
  'City'
];

export const brokerTableColumns = [
  'broker_name',
  'address',
  'commission_percent',
  'bank_name',
  'open_balance',
  'city'
];

export const rawMaterialTableHeaders = ['Name', 'Description'];

export const rawMaterialTableColumns = ['name', 'description'];

export const supplierTableHeaders = [
  'Supplier Name',
  'Type',
  'Address',
  'Phone no.',
  'City',
  'Bank Name',
  'Branch'
];

export const supplierTableColumns = [
  'supplier_name',
  'supplier_type',
  'address',
  'phone',
  'city',
  'bank_name',
  'branch'
];

export const productTableHeaders = ['Product Name', 'HSN', 'Food Safety', 'Tax %'];

export const productTableColumns = ['product_name', 'hsn_code', 'is_food_safe', 'tax_percent'];

export const vehicleTableHeaders = [
  'Owner Name',
  'Contact No.',
  'Vehicle type',
  'Vehicle No.',
  'Ownership Type'
];

export const vehicleTableColumns = [
  'owner_name',
  'phone',
  'vehicle_type',
  'vehicle_no',
  'ownership_type'
];
export const staffTableHeaders = ['Staffs Name', 'Address', 'Phone no.', 'Work'];

export const staffTableColumns = ['name', 'address', 'phone', 'designation'];

export const RESPONSE_MSG = {
  INVALID_SEARCH_TEXT: 'Invalid Search Text',
  NO_DATA_FOUND: 'No Data Found',
  DATA_FETCHED_SUCCESSFULLY: 'Data Fetched Successfully'
};

export const TABLE_ROW_SIZE_OPTIONS = [10, 25, 100];
