"use client";

import React from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h1>Щось пішло не так!</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Спробувати ще раз</button>
    </div>
  );
}