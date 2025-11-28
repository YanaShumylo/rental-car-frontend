import { create } from "zustand";

type FavoritesState = {
  favorites: string[];

  loadFavorites: () => void;
  toggleFavorite: (id: string) => void;
};

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],

  loadFavorites: () => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("favorites");
    if (saved) {
      set({ favorites: JSON.parse(saved) });
    }
  },

  toggleFavorite: (id) =>
    set((state) => {
      const updated = state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id];

      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(updated));
      }

      return { favorites: updated };
    }),
}));
