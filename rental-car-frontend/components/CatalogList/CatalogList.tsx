"use client";

import { useCarsStore } from "@/store/cars";
import CarCard from "@/components/CarCard/CarCard";
import css from "./CatalogList.module.css";

export default function CatalogList() {
  const { cars, loading } = useCarsStore();

  if (loading && (!cars || cars.length === 0)) {
    return <p className={css.message}>Loading...</p>;
  }

  if (!loading && (!cars || cars.length === 0)) {
    return <p className={css.message}>No cars found.</p>;
  }

  return (
    <ul className={css.list}>
      {cars?.map((car) => (
        <li key={car.id} className={css.item}>
            <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
}


