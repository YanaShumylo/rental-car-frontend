import { create } from "zustand";
import { Filters } from "../types/filters";

type FiltersState = {
  filters: Filters;

  setFilter: (key: keyof Filters, value: string) => void;
  resetFilters: () => void;
};

export const useFiltersStore = create<FiltersState & { setFilters: (filters: Filters) => void }>((set) => ({
  filters: {
    brand: "",
    price: "",
    mileageFrom: "",
    mileageTo: "",
  },

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  resetFilters: () =>
    set({
      filters: {
        brand: "",
        price: "",
        mileageFrom: "",
        mileageTo: "",
      },
    }),

  setFilters: (newFilters) =>
    set({ filters: { ...newFilters } }),
}));
