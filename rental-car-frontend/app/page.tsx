"use client";

import css from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className={css.container}>
      <div className={css.wraper}>
        <h1 className={css.title}>
          Find your perfect rental car
        </h1>

        <p className={css.text}>
          Reliable and budget-friendly rentals for any journey
        </p>
      </div>

      <button
        className={css.button}
        onClick={() => router.push("/catalog")}
      >
        View Catalog
      </button>
    </main>
  );
}
