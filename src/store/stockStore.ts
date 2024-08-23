import create from 'zustand';

interface StockState {
  stockItems: any[];
  setStockItems: (items: any[]) => void;
}

export const useStockStore = create<StockState>(set => ({
  stockItems: [],
  setStockItems: (items) => set({ stockItems: items }),
}));