"use client";

import { useCarsStore } from "@/store/cars";
import css from "./LoadMore.module.css";

export const LoadMore = () => {
  const { page, totalPages, nextPage, fetchCars, loading } = useCarsStore();

  const handleLoadMore = async () => {
    nextPage();
    await fetchCars();
  };

  if (page >= totalPages) return null;

  return (
    <div className={css.loadMoreWrapper}>
      <button
        className={css.loadMoreButton}
        onClick={handleLoadMore}
        disabled={loading}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

