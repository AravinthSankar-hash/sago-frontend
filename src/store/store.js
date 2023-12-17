import { create } from 'zustand';
import Customer from '../components/catalogTabs/Customer.jsx';
import Purchases from '../components/tapicoPurchase/PurchasesTab.jsx';

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

    activeTPTabComponent: <Purchases />,

    // Catalog Tabs
    updateShowCatalogBackBtn: (value) => {
        set({ showCatalogBackBtn: value });
    },
    updateActiveCatalogTabComponent: (value) => {
        set({ activeCatalogTabComponent: value });
    },

    // TP Tabs
    updateActiveTPTabComponent: (value) => {
        set({ activeTPTabComponent: value });
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
}))

export const useShowCatalogBackBtn = () => useStore((state) => state.showCatalogBackBtn);
export const useUpdateShowCatalogBackBtn = () => useStore((state) => state.updateShowCatalogBackBtn);

export const useActiveCatalogTabComponent = () => useStore((state) => state.activeCatalogTabComponent);
export const useUpdateActiveCatalogTabComponent = () => useStore((state) => state.updateActiveCatalogTabComponent);

export const useShowStaffNewForm = () => useStore((state) => state.showStaffNewForm);
export const useUpdateShowStaffNewForm = () => useStore((state) => state.updateShowStaffNewForm);

export const useShowStaffDetailsSection = () => useStore((state) => state.showStaffDetailsSection);
export const useUpdateShowStaffDetailsSection = () => useStore((state) => state.updateShowStaffDetailsSection);

export const useShowVehicleNewForm = () => useStore((state) => state.showVehicleNewForm);
export const useUpdateShowVehicleNewForm = () => useStore((state) => state.updateShowVehicleNewForm);

export const useShowVehicleDetailsSection = () => useStore((state) => state.showVehicleDetailsSection);
export const useUpdateShowVehicleDetailsSection = () => useStore((state) => state.updateShowVehicleDetailsSection);

export const useShowProductNewForm = () => useStore((state) => state.showProductNewForm);
export const useUpdateShowProductNewForm = () => useStore((state) => state.updateShowProductNewForm);

export const useShowProductDetailsSection = () => useStore((state) => state.showProductDetailsSection);
export const useUpdateShowProductDetailsSection = () => useStore((state) => state.updateShowProductDetailsSection);

export const useShowCustomerNewForm = () => useStore((state) => state.showCustomerNewForm);
export const useUpdateShowCustomerNewForm = () => useStore((state) => state.updateShowCustomerNewForm);

// TP
export const useActiveTPTabComponent = () => useStore((state) => state.activeTPTabComponent);
export const useUpdateActiveTPTabComponent = () => useStore((state) => state.updateActiveTPTabComponent);