// store/pharmacyStore.ts
import { create } from "zustand";

interface PharmacyState {
  selectedPharmacy: string | null;
  setSelectedPharmacy: (pharmacyId: string) => void;
}

export const usePharmacyStore = create<PharmacyState>((set) => ({
  selectedPharmacy: null,
  setSelectedPharmacy: (pharmacyId) => set({ selectedPharmacy: pharmacyId }),
}));
