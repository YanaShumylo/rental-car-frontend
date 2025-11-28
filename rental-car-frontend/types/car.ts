export type Car = {
  id: string;
  img: string;
  brand: string;
  model: string;
  type: string;
  rentalPrice: string;
  mileage: number;
  year: number;
  description: string;
  accessories: string[];
  functionalities: string[];
  fuelConsumption: string;
  engineSize: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
};


export type CarsState = {
  cars: Car[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;

  fetchCars: () => Promise<void>;
  nextPage: () => void;
  resetPage: () => void;
};


export type CarHttpResponse = {
  id: string;
  brand: string;
  model: string;
  rentalPrice: string;
  mileage: number;
  img: string;
};

export type CarsApiResponse = {
  cars: Car[];
  totalPages: number;
};