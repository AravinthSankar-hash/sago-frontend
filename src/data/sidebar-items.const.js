import dashIcon from '../assets/images/dashboard.svg';
import inventIcon from '../assets/images/inventory_icon.svg';
import approvIcon from '../assets/images/approval_icon.svg';
import topioIcon from '../assets/images/topio_icon.svg';
import procureIcon from '../assets/images/procure_icon.svg';
import expenseIcon from '../assets/images/expense_icon.svg';
import saleIcon from '../assets/images/sales_icon.svg';
import paymentIcon from '../assets/images/payment_icon.svg';
import invIcon from '../assets/images/invoice_icon.svg';
import catIcon from '../assets/images/catalog_icon.svg';

export const sideBarItems = [
  {
    itemHeader: 'REPORTS',
    items: [
      { name: 'DashBoard', src: dashIcon, route: '/' },
      { name: 'Inventory', src: inventIcon },
      { name: 'Approvals', src: approvIcon }
    ]
  },
  {
    itemHeader: 'PURCHASE',
    items: [
      { name: 'Tapico Purchase', src: topioIcon, route: '/purchase' },
      { name: 'Procurements', src: procureIcon, route: '/procurement' },
      { name: 'Expenses', src: expenseIcon, route: '/expense' }
    ]
  },
  {
    itemHeader: 'CREDIT/DEBIT',
    items: [
      { name: 'Sales', src: saleIcon, route: '/sales' },
      { name: 'Payment', src: paymentIcon, route: '/payments' },
      { name: 'Invoices', src: invIcon, route: '/invoice' }
    ]
  },
  {
    itemHeader: 'DATA',
    items: [{ name: 'Cataglog', src: catIcon, route: '/catalog' }]
  }
];
