/**
 * Interface for what a Frappe looks like on the server when requested from
 * http://127.0.0.1:8000/frappapi/frappe/
 */
export interface Frappe {
  id: number;
  user: string;
  milk: MilkOptions;
  base: BaseOptions;
  extras: Array<FrappeExtra>
  price: number;
  final_price: number;
  menu_key: number;
  size: SizeOptions;
  comments: string;
  create_date: string;
  status: StatusOptions;
}

/**
 * Interface for what a Frappe looks like on the server when requested from
 * http://127.0.0.1:8000/frappapi/cashier/
 */
 export interface CashierFrappe {
  id: number;
  user: string;
  milk: MilkOptions;
  base: BaseOptions;
  extras: Array<FrappeExtra>
  price: number;
  final_price: number;
  menu_key: number;
  creator: string;
  size: SizeOptions;
  comments: string;
  create_date: string;
  status: StatusOptions;
  name?: string;
}

/**
 * Interface for what a Menu Item looks like on the server when requested from
 * http://127.0.0.1:8000/frappapi/menu/
 *
 * Some things to note:
 * frappe - This is the primary key of a frappe stored in the http://127.0.0.1:8000/frappapi/frappe/ endpoint
 * photo - This is a string that is a http link to an image
 */
export interface MenuItem {
  name: string;
  frappe: Frappe;
  photo: string;
  prices: Array<number>;
}

export enum StatusOptions {
  In_Progress = 1,
  Completed = 2,
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
  price_per_unit: string;
  updated_on: string;
  created_on: string;
  non_dairy: boolean;
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
  price_per_unit: string;
  updated_on: string;
  created_on: string;
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

export const SizeNames = [
  'Small',
  'Medium',
  'Large'
];

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
  Frappuccino_Roast_Pumps = 11,
  Chocolate_Chips = 12,
}

/**
 * Interface for what an Extra looks like when sending a GET request to /frappapi/extras/
 */
export interface Extra {
  id: ExtraOptions;
  name: string;
  stock: number;
  price_per_unit: string;
  updated_on: string;
  created_on: string;
  decaf: boolean;
  non_dairy: boolean;
  gluten_free: boolean;
  limit: number;
}

/**
 * Interface for what a Frappe stores in the "extras" field. Some things to note:
 * 
 * extras - This is the key to which extra inside the http://127.0.0.1:8000/frappapi/extras/ endpoint. Think of
 *          it like the ExtraOptions
 * frappe - This is the key to frappe that has this extra i.e. when adding an extra to frappe with id 123, this number
 *          will also be 123
 */
export interface FrappeExtra {
  amount: number;
  extras: ExtraOptions;
  frappe?: number;
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
  extras: number;
  frappe: number;
}

/**
 * Interface that makes it easier to keep track of what the user is ordering
 * plus the name and price. If submitting to the server, just use the frappe
 * field and forget the menu_item part. The menu item just carries superficial
 * data that won't get posted
 */
// export interface CompleteFrappe {
//   frappe: Frappe;
//   menu_item: MenuItem;
// }

/**
 * Interface for what a user looks like on the server when sending a
 * GET request to /auth-endpoint/user/
 *
 * Since this is a GET request, all fields will be populated
 */
export interface UserDetails {
  pk: number;
  email: string;
  first_name: string;
  last_name: string;
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
 * new_password1 - required
 * new_password2 - required
 * uid - required
 * token - required
 */
export interface PasswordResetConfimation {
  new_password1: string;
  new_password2: string;
  uid: string;
  token: string;
}