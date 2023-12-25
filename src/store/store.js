import DcSales from 'components/sales/DcSales/DcSales.jsx';
import { create } from 'zustand';
import Customer from '../components/catalogTabs/Customer.jsx';
import Purchases from '../components/tapicoPurchase/PurchasesTab';

const useStore = create((set) => ({
  showCatalogBackBtn: false,
  activeCatalogTabComponent: <Customer />,

  showStaffNewForm: false,
  showStaffDetailsSection: false,

  showVehicleNewForm: false,
  showVehicleDetailsSection: false,

  showProductNewForm: false,
  showProductDetailsSection: false,

  showCustomerNewForm: false,

  // TP
  showTPPurchaseNewForm: false,
  showTPPurchaseDetails: false,
  showTPBackBtn: false,
  activeTPTabComponent: <Purchases />,

  // Sales
  activeSalesTabComponent: <DcSales />,
  showSalesBackBtn: false,
  showDCSalesNewForm: false,
  showDCDetails: false,
  showTSSalesNewForm: false,
  showTSDetails: false,
  showGSSalesNewForm: false,
  showGSDetails: false,

  // Catalog Tabs
  updateShowCatalogBackBtn: (value) => {
    set({ showCatalogBackBtn: value });
  },
  updateActiveCatalogTabComponent: (value) => {
    set({ activeCatalogTabComponent: value });
  },

  // Staff
  updateShowStaffNewForm: (value) => {
    set({ showStaffNewForm: value });
  },
  updateShowStaffDetailsSection: (value) => {
    set({ showStaffDetailsSection: value });
  },
  // Vehicle
  updateShowVehicleNewForm: (value) => {
    set({ showVehicleNewForm: value });
  },
  updateShowVehicleDetailsSection: (value) => {
    set({ showVehicleDetailsSection: value });
  },

  // Product
  updateShowProductNewForm: (value) => {
    set({ showProductNewForm: value });
  },
  updateShowProductDetailsSection: (value) => {
    set({ showProductDetailsSection: value });
  },

  // Customer
  updateShowCustomerNewForm: (value) => {
    set({ showCustomerNewForm: value });
  },

  // TP Tabs
  updateActiveTPTabComponent: (value) => {
    set({ activeTPTabComponent: value });
  },
  updateShowTPPurchaseNewForm: (value) => {
    set({ showTPPurchaseNewForm: value });
  },
  updateShowTPPurchaseDetails: (value) => {
    set({ showTPPurchaseDetails: value });
  },

  updateShowTPBackBtn: (value) => {
    set({ showTPBackBtn: value });
  },

  // Sales
  updateShowSalesBackBtn: (value) => {
    set({ showSalesBackBtn: value });
  },
  updateActiveSalesTabComponent: (value) => {
    set({ activeSalesTabComponent: value });
  },

  // DC
  updateShowDCSalesNewForm: (value) => {
    set({ showDCSalesNewForm: value });
  },
  updateShowDCDetails: (value) => {
    set({ showDCDetails: value });
  },

  // TS
  updateShowTSSalesNewForm: (value) => {
    set({ showTSSalesNewForm: value });
  },
  updateShowTSDetails: (value) => {
    set({ showTSDetails: value });
  },

  // GS
  updateShowGSSalesNewForm: (value) => {
    set({ showGSSalesNewForm: value });
  },
  updateShowGSDetails: (value) => {
    set({ showGSDetails: value });
  }
}));

export const useShowCatalogBackBtn = () => useStore((state) => state.showCatalogBackBtn);
export const useUpdateShowCatalogBackBtn = () =>
  useStore((state) => state.updateShowCatalogBackBtn);

export const useActiveCatalogTabComponent = () =>
  useStore((state) => state.activeCatalogTabComponent);
export const useUpdateActiveCatalogTabComponent = () =>
  useStore((state) => state.updateActiveCatalogTabComponent);

export const useShowStaffNewForm = () => useStore((state) => state.showStaffNewForm);
export const useUpdateShowStaffNewForm = () => useStore((state) => state.updateShowStaffNewForm);

export const useShowStaffDetailsSection = () => useStore((state) => state.showStaffDetailsSection);
export const useUpdateShowStaffDetailsSection = () =>
  useStore((state) => state.updateShowStaffDetailsSection);

export const useShowVehicleNewForm = () => useStore((state) => state.showVehicleNewForm);
export const useUpdateShowVehicleNewForm = () =>
  useStore((state) => state.updateShowVehicleNewForm);

export const useShowVehicleDetailsSection = () =>
  useStore((state) => state.showVehicleDetailsSection);
export const useUpdateShowVehicleDetailsSection = () =>
  useStore((state) => state.updateShowVehicleDetailsSection);

export const useShowProductNewForm = () => useStore((state) => state.showProductNewForm);
export const useUpdateShowProductNewForm = () =>
  useStore((state) => state.updateShowProductNewForm);

export const useShowProductDetailsSection = () =>
  useStore((state) => state.showProductDetailsSection);
export const useUpdateShowProductDetailsSection = () =>
  useStore((state) => state.updateShowProductDetailsSection);

export const useShowCustomerNewForm = () => useStore((state) => state.showCustomerNewForm);
export const useUpdateShowCustomerNewForm = () =>
  useStore((state) => state.updateShowCustomerNewForm);

// TP
export const useActiveTPTabComponent = () => useStore((state) => state.activeTPTabComponent);
export const useUpdateActiveTPTabComponent = () =>
  useStore((state) => state.updateActiveTPTabComponent);
// back Button
export const useShowTPBackBtn = () => useStore((state) => state.showTPBackBtn);
export const useUpdateShowTPBackBtn = () => useStore((state) => state.updateShowTPBackBtn);

export const useShowTPPurchaseNewForm = () => useStore((state) => state.showTPPurchaseNewForm);
export const useUpdateShowTPPurchaseNewForm = () =>
  useStore((state) => state.updateShowTPPurchaseNewForm);

export const useShowPurhcaseDetails = () => useStore((state) => state.showTPPurchaseDetails);
export const useUpdateShowPurhcaseDetails = () =>
  useStore((state) => state.updateShowTPPurchaseDetails);

// Sales
export const useActiveSalesTabComponent = () => useStore((state) => state.activeSalesTabComponent);
export const useUpdateActiveSalesTabComponent = () =>
  useStore((state) => state.updateActiveSalesTabComponent);

export const useShowSalesBackBtn = () => useStore((state) => state.showSalesBackBtn);
export const useUpdateShowSalesBackBtn = () => useStore((state) => state.updateShowSalesBackBtn);

// DC
export const useShowDCSalesNewForm = () => useStore((state) => state.showDCSalesNewForm);
export const useUpdateShowDCSalesNewForm = () =>
  useStore((state) => state.updateShowDCSalesNewForm);

export const useShowDCDetails = () => useStore((state) => state.showDCDetails);
export const useUpdateShowDCDetails = () => useStore((state) => state.updateShowDCDetails);

// TS
export const useShowTSSalesNewForm = () => useStore((state) => state.showTSSalesNewForm);
export const useUpdateShowTSSalesNewForm = () =>
  useStore((state) => state.updateShowTSSalesNewForm);

export const useShowTSDetails = () => useStore((state) => state.showTSDetails);
export const useUpdateShowTSDetails = () => useStore((state) => state.updateShowTSDetails);

// GS
export const useShowGSSalesNewForm = () => useStore((state) => state.showGSSalesNewForm);
export const useUpdateShowGSSalesNewForm = () =>
  useStore((state) => state.updateShowGSSalesNewForm);

export const useShowGSDetails = () => useStore((state) => state.showGSDetails);
export const useUpdateShowGSDetails = () => useStore((state) => state.updateShowGSDetails);
