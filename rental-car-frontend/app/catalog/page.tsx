"use client";

import { useEffect } from "react";
import { useCarsStore } from "@/store/cars";
import { useFiltersStore } from "@/store/filters";
import { Filters } from "@/components/Filters/Filters";
import CatalogList from "@/components/CatalogList/CatalogList";
import { LoadMore } from "@/components/LoadMore/LoadMore";
import css from "./CatalogPage.module.css";

export default function CatalogPage() {
  const filters = useFiltersStore((state) => state.filters);
  const fetchCars = useCarsStore((state) => state.fetchCars);
  const resetPage = useCarsStore((state) => state.resetPage);

  useEffect(() => {
    resetPage();
    fetchCars();
  }, [filters, fetchCars, resetPage]);

  return (
    <div className={css.pageWrapper}>
      <Filters />
      <CatalogList />
      <LoadMore />
    </div>
  );
}

