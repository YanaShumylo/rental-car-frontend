"use client";

import { useEffect, useState, useRef } from "react";
import { useFiltersStore } from "@/store/filters";
import { useCarsStore } from "@/store/cars";
import { useBrandsStore } from "@/store/brands";
import css from "./Filters.module.css";

export const Filters = () => {
  const { filters, setFilters } = useFiltersStore();
  const fetchCars = useCarsStore((state) => state.fetchCars);
  const resetPage = useCarsStore((state) => state.resetPage);
  const { brands, fetchBrands } = useBrandsStore();

  const [brand, setBrand] = useState(filters.brand || "");
  const [price, setPrice] = useState(filters.price || "");
  const [mileageFrom, setMileageFrom] = useState(filters.mileageFrom || "");
  const [mileageTo, setMileageTo] = useState(filters.mileageTo || "");

  const [brandOpen, setBrandOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const priceOptions = ["10", "20", "30", "40", "50", "60", "70", "80"];

  const brandRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // Закриття при кліку поза dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (brandRef.current && !brandRef.current.contains(event.target as Node)) {
        setBrandOpen(false);
      }
      if (priceRef.current && !priceRef.current.contains(event.target as Node)) {
        setPriceOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMileageChange = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    const formatted = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setter(formatted);
  };

  const parseMileage = (value: string) => {
    if (!value) return undefined;
    const numeric = value.replace(/,/g, "").trim();
    const number = Number(numeric);
    return isNaN(number) ? undefined : number;
  };

  const handleApply = async () => {
    const minMileage = parseMileage(mileageFrom);
    const maxMileage = parseMileage(mileageTo);

    let finalMin = minMileage;
    let finalMax = maxMileage;
    if (minMileage !== undefined && maxMileage !== undefined && minMileage > maxMileage) {
      finalMin = maxMileage;
      finalMax = minMileage;
    }

    setFilters({
      brand,
      price,
      mileageFrom: finalMin !== undefined ? String(finalMin) : "",
      mileageTo: finalMax !== undefined ? String(finalMax) : "",
    });

    resetPage();
    await fetchCars();
  };

  return (
    <div className={css.filters}>
 
      <div className={`${css.field} ${css.fieldBrand}`} ref={brandRef}>
        <label>Car brand</label>
        <div className={css.customDropdown} onClick={() => setBrandOpen(!brandOpen)}>
          <div className={css.selected}>
            {brand || "Choose a brand"}
            <span className={`${css.arrow} ${brandOpen ? css.open : ""}`}></span>
          </div>
          {brandOpen && (
            <ul className={css.dropdownList}>
              {brands.map((b) => (
                <li key={b} className={css.dropdownItem} onClick={() => setBrand(b)}>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
     
      <div className={`${css.field} ${css.fieldPrice}`} ref={priceRef}>
        <label>Price / 1 hour</label>
        <div className={css.customDropdown} onClick={() => setPriceOpen(!priceOpen)}>
          <div className={css.selected}>
            {price || "Any price"}
            <span className={`${css.arrow} ${priceOpen ? css.open : ""}`}></span>
          </div>
          {priceOpen && (
            <ul className={css.dropdownList}>
              {priceOptions.map((p) => (
                <li key={p} className={css.dropdownItem} onClick={() => setPrice(p)}>
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

         <div className={`${css.field} ${css.fieldMileage}`}>
        <label>Car mileage / km</label>
        <div className={css.mileageGroup}>
          <div className={css.mileageField}>
            <input
              type="text"
              value={mileageFrom}
              onChange={handleMileageChange(setMileageFrom)}
              className={css.mileageInput}
            />
            <span className={css.placeholder}>From</span>
          </div>
          <div className={css.mileageField}>
            <input
              type="text"
              value={mileageTo}
              onChange={handleMileageChange(setMileageTo)}
              className={css.mileageInput}
            />
            <span className={css.placeholder}>To</span>
          </div>
        </div>
      </div>

      <button className={css.buttons} onClick={handleApply}>
        Search
      </button>
    </div>
  );
};
