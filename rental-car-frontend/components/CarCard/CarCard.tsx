"use client";
import { Car } from "@/types/car";
import { useFavoritesStore } from "@/store/favorites";
import css from "./CarCard.module.css";
import Link from "next/link";
import Image from "next/image";

type Props = {
  car: Car;
};

export default function CarCard({ car }: Props) {
  const { favorites, toggleFavorite } = useFavoritesStore();
  const isFavorite = favorites.includes(car.id);

  // Розділяємо адресу на місто та країну
  const [city, country] = car.address ? car.address.split(",").map(s => s.trim()) : ["", ""];

  return (
    <div className={css.card}>

      <div className={css.imageWrapper}>
        <div className={css.image}>
<Image 
  src={car.img} 
  alt={`${car.brand} ${car.model}`} 
  fill
  priority
  sizes="(max-width: 1200px) 50vw, 276px"
  style={{ objectFit: "cover" }}
/>

</div>
        <button
          className={`${css.favorite} ${isFavorite ? css.active : ""}`}
          onClick={() => toggleFavorite(car.id)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg width={16} height={16}>
            <use
              href={`/svg-sprite.svg#${isFavorite ? "icon-favoriteActive" : "icon-favoriteDefault"}`}
            />
          </svg>
        </button>
      </div>

      <div className={css.info}>

<div className={css.infoCar}>
  <p className={css.text}>
    {car.brand}{" "}
    <span className={css.model}>{car.model}</span>, {car.year}
  </p>
  <p className={css.text}>${car.rentalPrice}</p>
</div>
        
<div className={css.infoRow}>
  {city && country && (
    <>
      <span className={css.infoItem}>{city}, {country}</span>
      <span className={css.divider}></span>
    </>
  )}

  <span className={css.infoItem}>{car.rentalCompany}</span>
  <span className={css.divider}></span>

  <span className={css.infoItem}>{car.type}</span>
  <span className={css.divider}></span>

  {car.mileage !== undefined && (
    <span className={css.infoItem}>{car.mileage.toLocaleString()} km</span>
  )}
</div>

        <Link href={`/catalog/${car.id}`} className={css.readMore}>
          Read more
        </Link>
      </div>
    </div>
  );
}
