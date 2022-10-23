/* As defined by the server */
export interface Frappe {
  id: number;
  creator: string;
  milk: Milk;
  base: Base;
  size: Size;
  createDate: string;
  extras: Array<Extra>
  /* Should be added by server... */
  name: string;
  /* Provided for client side... server should still validate */
  price: number;
}

/* As defined by the server */
export interface Extra {
  id: number;
  name: string;
  stock: number;
  pricePerUnit: string;
  updatedOn: string;
  createdOn: string;
  decaf: boolean;
  nonDairy: boolean;
  glutenFree: boolean;
  limit: number;
  /* Server should provide the number of items i.e. 2 secret sauce */
  amount: number;
}

/* As defined by the server */
export enum Milk {
  Whole_Milk = 1,
  Soy_Milk = 2,
}

/* As defined by the server */
export enum Base {
  Coffee = 1,
  Cream = 2,
  Mocha = 3,
}

/* As defined by the server */
export enum Size {
  Small = 1,
  Medium = 2,
  Large = 3,
}

export enum Extras {
  Secret_Sauce = 1,
  Vanilla = 2,
  Caramel = 3,
  Pumpkin_Sauce = 4,
  Macha = 5,
  Expresso_Shot = 6,
  Chocolate_Drizzle = 7,
  Oreos = 8,
  Whip_Cream = 9,
  Sugar = 10,
}

export interface DrinkCustomizations {
  decaf: boolean;
  addins: Addins
}

export interface Addins {
  [key: string]: number;
}
