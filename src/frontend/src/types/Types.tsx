/* As defined by the server */
export interface Frappe {
  id: number;
  creator: string;
  milk: MilkOptions;
  base: BaseOptions;
  size: SizeOptions;
  createDate: string;
  extras: Array<Extra>
  /* Should be added by server... */
  name: string;
  /* Provided for client side... server should still validate */
  price: number;
}

/**
 * Options for different milks. Object for what milks look like when requested from
 * the server is to follow below as 'interface Milk'
 *
 * Milks as defined by the server at /frappapi/milks/
 */
export enum MilkOptions {
  Whole_Milk = 1,
  Soy_Milk = 2,
}

/**
 * Interface for what a Milk looks like when sending a GET request to /frappapi/milks/
 */
export interface Milk {
  id: MilkOptions;
  name: string;
  stock: number;
  pricePerUnit: string;
  updatedOn: string;
  createdOn: string;
  nonDairy: boolean;
}

/**
 * Options for a base. Object for what a base looks like when requested from
 * the server is to follow below as 'interface Base'
 *
 * Bases as defined by the server at /frappapi/bases/
 */
export enum BaseOptions {
  Coffee = 1,
  Cream = 2,
  Mocha = 3,
}

/**
 * Interface for what a Base looks like when sending a GET request to /frappapi/bases/
 */
export interface Base {
  id: BaseOptions;
  name: string;
  stock: number;
  pricePerUnit: string;
  updatedOn: string;
  createdOn: string;
  decaf: boolean;
}

/**
 * Size options defined by the server. Currently no API endpoint (doesn't really need one)
 */
export enum SizeOptions {
  Small = 1,
  Medium = 2,
  Large = 3,
}

/**
 * Options for the different extras. Object for what an extra looks like when requested
 * from the server is to follow below as 'interface Extra'
 *
 * Extras as defined by the server at /frappapi/extras/
 */
export enum ExtraOptions {
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

/**
 * Interface for what an Extra looks like when sending a GET request to /frappapi/extras/
 */
export interface Extra {
  id: ExtraOptions;
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

/**
 * Interface for adding an extra to an already created frappe
 * through a POST request to /frappapi/extra_ingredients/
 *
 * amount - required
 * extras - required
 * frappe - required
 */
export interface AddExtra {
  amount: number;
  extras: Extra;
  frappe: Frappe; // Is this meant to just be the key?
}

/**
 * Interface for what a user looks like on the server when sending a
 * GET request to /auth-endpoints/user/
 *
 * Since this is a GET request, all fields will be populated
 */
export interface UserDetails {
  pk: number;
  email: string;
  firstName: string;
  lastName: string;
}

/**
 * Interface for sending a POST request to the server for registering a
 * new user at /auth-endpoint/registration/
 * 
 * username - not required
 * email - required
 * password1 - required
 * password2 - required
 */
export interface RegisterUser {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

/**
 * Interface for sending a POST request to the server for logging in
 * a user at /auth-endpoint/login/
 *
 * username - not required
 * email - not required (shouldn't this be required?)
 * password - required
 */
export interface LoginUser {
  username: string;
  email: string;
  password: string;
}

/**
 * Interface for sending a POST request to the server for a user
 * to reset their password at /auth-endpoint/login/
 *
 * email - required
 */
export interface PasswordReset {
  email: string;
}

/**
 * Interface for sending a POST request to the server for a reset
 * password confimration at /auth-endpoint/password/reset/confirm/
 * 
 * newPassword1 - required
 * newPassword2 - required
 * uid - required
 * token - required
 */
export interface PasswordResetConfimation {
  newPassword1: string;
  newPassword2: string;
  uid: string;
  token: string;
}