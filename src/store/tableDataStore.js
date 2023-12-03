import { create } from 'zustand';

const useTableDataStore = create((set) => ({
    currentRowData: {},
    showCatalogBackBtn: false,
    catalogTabIndex: 0,
    showCatalogTabHomePage: false,
    updateCurrentSelectedRowData: (selectedRowDetails) => {
        set({ currentRowData: selectedRowDetails });
    },
    updateShowCatalogBackBtn: (value) => {
        set({ showCatalogBackBtn: value });
    },
    updateCatalogTabIndex: (value) => {
        set({ catalogTabIndex: value });
    },
    updateShowCatalogTabHomePage: (value) => {
        set({ showCatalogTabHomePage: value });
    },
}));

export const useCurrentSelectedRowData = () => useTableDataStore((state) => state.currentRowData);
export const useUpdateCurrentSelectedRowData = () => useTableDataStore((state) => state.updateCurrentSelectedRowData);
export const useShowCatalogBackBtn = () => useTableDataStore((state) => state.showCatalogBackBtn);
export const useUpdateShowCatalogBackBtn = () => useTableDataStore((state) => state.updateShowCatalogBackBtn);
export const useCatalogTabIndex = () => useTableDataStore((state) => state.catalogTabIndex);
export const useUpdateCatalogTabIndex = () => useTableDataStore((state) => state.updateCatalogTabIndex);
export const useShowCatalogTabHomePage = () => useTableDataStore((state) => state.showCatalogTabHomePage);
export const useUpdateShowCatalogTabHomePage = () => useTableDataStore((state) => state.updateShowCatalogTabHomePage);
