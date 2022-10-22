
export interface Frappe {
  name: string;
  id: number;
  inStock: boolean;
  size: string;
  price: number;
  customizations: DrinkCustomizations;
}

export interface DrinkCustomizations {
  decaf: boolean;
  addins: Addins
}

export interface Addins {
  [key: string]: number;
}
