import { create } from "zustand";
import { api } from "@/services/api";
import { BrandsState } from "../types/brands";

export const useBrandsStore = create<BrandsState>((set) => ({
  brands: [],
  loading: false,
  error: null,

fetchBrands: async () => {
  set({ loading: true, error: null });

  try {
    const res = await api.get("/brands");
    set({ brands: res.data });
  } catch (err: unknown) {
    if (err instanceof Error) {
      set({ error: err.message });
    } else {
      set({ error: "Failed to load brands" });
    }
  } finally {
    set({ loading: false });
  }
},
}
)
);
