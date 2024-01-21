export const tpTableHeaders = [
  'Purchase No.',
  'Date',
  'Broker Name',
  'Tapioca Type',
  'Total Bags',
  'AP',
  'TP',
  'P.Rate',
  'Rate',
  'Total amount',
  'OutStandings',
  'Approval Status'
];

export const tpTableColumns = [
  'invoice_number',
  'purchase_date',
  'broker_name',
  'tapico_type',
  'sum_total_bags',
  'sum_ap',
  'sum_tp',
  'sum_p_rate',
  'sum_total_rate',
  'grand_total',
  'outstandings',
  'approval_status'
];

export const proTableHeaders = [
  'Purchase date',
  'Purchase No.',
  'Supplier Name',
  'amount',
  'Outstandings',
  'Last payment date',
  'Approval Status'
];

export const proTableColumns = [
  'purchase_date',
  'invoice_number',
  'supplier_name',
  'amount',
  'outstandings',
  'payment_due_date',
  'approval_status'
];

export const expenseTableHeaders = [
  'Expense date',
  'Expense No.',
  'Party Name',
  'Expense Type',
  'Expense amount',
  'Outstandings',
  'Last payment date',
  'Approval Status'
];

export const expenseTableColumns = [
  'expense_date',
  'invoice_number',
  'party_name',
  'expense_type',
  'sub_total',
  'outstandings',
  'payment_due_date',
  'approval_status'
];

export const RESPONSE_MSG = {
  INVALID_SEARCH_TEXT: 'Invalid Search Text',
  NO_DATA_FOUND: 'No Data Found',
  DATA_FETCHED_SUCCESSFULLY: 'Data Fetched Successfully'
};

export const TABLE_ROW_SIZE_OPTIONS = [10, 25, 100];
