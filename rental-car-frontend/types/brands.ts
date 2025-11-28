export type BrandsState = {
  brands: string[];
  loading: boolean;
  error: string | null;
  fetchBrands: () => Promise<void>;
}; 