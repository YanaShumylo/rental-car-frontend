"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Car } from "@/types/car";
import { api } from "@/services/api";
import { RentForm } from "@/components/RentForm/RentForm";
import css from "./CarDetails.module.css";
import Image from "next/image";

export default function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchCar = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get<Car>(`/cars/${id}`);
        setCar(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error loading car details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) return <p className={css.message}>Loading car details...</p>;
  if (error) return <p className={css.message}>{error}</p>;
  if (!car) return <p className={css.message}>Car not found.</p>;

  const [city, country] = car.address
    ? car.address.split(",").map((s) => s.trim())
    : ["", ""];

  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.leftColumn}>
          <div className={css.image}>
           <Image
  src={car.img}
  alt={`${car.brand} ${car.model}`}
  width={500}       
  height={300}      
  style={{ objectFit: "cover" }}
  loading="eager"
/>
          </div>
          <RentForm carId={car.id} />
        </div>

        <div className={css.rightColumn}>
          <div className={css.carHeader}>
            <p className={css.textAboutCar}>
              {car.brand} {car.model}, {car.year}
            </p>
            <p className={css.code}>
              <strong>Id:</strong> {car.id}
            </p>
          </div>

          <div className={css.wrapperAdressMileage}>
            {city && country && (
              <p className={css.item}>
                <svg className={css.iconLocation} width="16" height="16">
                  <use href="/svg-sprite.svg#icon-Location" />
                </svg>
                {city}, {country}
              </p>
            )}
            <p className={css.item}>
              Mileage: {car.mileage.toLocaleString()} km
            </p>
          </div>

          <p className={css.price}>${car.rentalPrice}</p>
          <p className={css.description}>{car.description}</p>

          <div className={css.block}>
            <h2 className={css.titleBlock}>Rental Conditions:</h2>
            <ul className={css.customList}>
              {car.rentalConditions.map((cond, idx) => (
                <li key={idx} className={css.customItem}>
                  <svg className={css.icon} width="16" height="16">
                    <use href="/svg-sprite.svg#icon-check-circle" />
                  </svg>
                  {cond}
                </li>
              ))}
            </ul>
          </div>

          <div className={css.block}>
            <h2 className={css.titleBlock}>Car Specifications:</h2>
            <ul className={css.customList}>
              <li className={css.customItem}>
                <svg className={css.specIcon} width="16" height="16">
                  <use href="/svg-sprite.svg#icon-calendar"></use>
                </svg>
                Year: {car.year}
              </li>
              <li className={css.customItem}>
                <svg className={css.specIcon} width="16" height="16">
                  <use href="/svg-sprite.svg#icon-car"></use>
                </svg>
                Type: {car.type}
              </li>
              <li className={css.customItem}>
                <svg className={css.specIcon} width="16" height="16">
                  <use href="/svg-sprite.svg#icon-fuel-pump"></use>
                </svg>
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li className={css.customItem}>
                <svg className={css.specIcon} width="16" height="16">
                  <use href="/svg-sprite.svg#icon-gear"></use>
                </svg>
                Engine Size: {car.engineSize}
              </li>
            </ul>
          </div>

          <div className={css.block}>
            <h2 className={css.titleBlock}>Accessories and Functionalities:</h2>
            <ul className={css.customList}>
              {[...car.accessories, ...car.functionalities].map((item, idx) => (
                <li key={idx} className={css.customItem}>
                  <svg className={css.icon} width="16" height="16">
                    <use href="/svg-sprite.svg#icon-check-circle" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

