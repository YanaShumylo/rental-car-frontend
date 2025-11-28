import { create } from "zustand";
import { api } from "@/services/api";
import { CarsState, Car, CarsApiResponse } from "../types/car";
import { useFiltersStore } from "./filters";

export const useCarsStore = create<CarsState>((set, get) => ({
  cars: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,

fetchCars: async () => {
  set({ loading: true, error: null });

  const { filters } = useFiltersStore.getState();
  const { page } = get();

  try {
    const params = {
      page,
      limit: 12,
      brand: filters.brand || undefined,
      price: filters.price || undefined,
      mileageFrom: filters.mileageFrom || undefined,
      mileageTo: filters.mileageTo || undefined,
    };

    console.log("Fetch cars with params:", params);

    const response = await api.get<CarsApiResponse>("/cars", { params });
    const data = response.data;

      let finalCars: Car[] = data.cars.map((car) => ({
      id: car.id,
      img: car.img,
      brand: car.brand,
      model: car.model,
      rentalPrice: car.rentalPrice,
      mileage: car.mileage,
      year: car.year,
      description: car.description,
      accessories: car.accessories,
      functionalities: car.functionalities,
      rentalCompany: car.rentalCompany,
      type: car.type,
      address: car.address,
      fuelConsumption: car.fuelConsumption,
      engineSize: car.engineSize,
      rentalConditions: car.rentalConditions,
    }));


    if (filters.price) {
      const priceNum = Number(filters.price);
      finalCars = finalCars.filter(
        (car) => Number(car.rentalPrice) === priceNum
      );
    }

      if (filters.mileageFrom) {
      finalCars = finalCars.filter(
        (car) => car.mileage >= Number(filters.mileageFrom)
      );
    }

    if (filters.mileageTo) {
      finalCars = finalCars.filter(
        (car) => car.mileage <= Number(filters.mileageTo)
      );
    }

        set((state) => ({
      cars: page === 1 ? finalCars : [...state.cars, ...finalCars],
      totalPages: data.totalPages,
    }));
  } catch (error: unknown) {
    console.error("API ERROR:", error);
    const message =
      error instanceof Error ? error.message : "Error loading cars";
    set({ error: message });
  } finally {
    set({ loading: false });
  }
},

  nextPage: () => {
    const { page, totalPages } = get();
    if (page < totalPages) set({ page: page + 1 });
  },

  resetPage: () => set({ page: 1 }),
}));
