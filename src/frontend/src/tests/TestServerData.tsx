import { Base, Extra, Frappe, MenuItem, Milk } from "../types/Types";

/**
 * Example data that could be gotten from http://127.0.0.1:8000/frappapi/frappe/
 */
export const TestFrappes: Array<Frappe> = [
  {
      "id": 2,
      "creator": "admin@admin.com",
      "milk": 1,
      "base": 1,
      "extras": [
          {
              "amount": 2,
              "extras": 4,
              "frappe": 2
          },
          {
              "amount": 1,
              "extras": 11,
              "frappe": 2
          },
          {
              "amount": 1,
              "extras": 9,
              "frappe": 2
          }
      ],
      "size": 1,
      "create_date": "2022-10-23T04:36:09.503000Z",
      "comments": ""
  },
  {
      "id": 3,
      "creator": "admin@admin.com",
      "milk": 1,
      "base": 1,
      "extras": [
          {
              "amount": 1,
              "extras": 7,
              "frappe": 3
          },
          {
              "amount": 1,
              "extras": 3,
              "frappe": 3
          }
      ],
      "size": 1,
      "create_date": "2022-10-23T04:49:41.420000Z",
      "comments": ""
  },
  {
      "id": 4,
      "creator": "admin@admin.com",
      "milk": 1,
      "base": 1,
      "extras": [
          {
              "amount": 2,
              "extras": 12,
              "frappe": 4
          },
          {
              "amount": 2,
              "extras": 6,
              "frappe": 4
          }
      ],
      "size": 1,
      "create_date": "2022-10-23T04:49:43.457000Z",
      "comments": ""
  },
  {
      "id": 5,
      "creator": "admin@admin.com",
      "milk": 1,
      "base": 1,
      "extras": [
          {
              "amount": 2,
              "extras": 1,
              "frappe": 5
          },
          {
              "amount": 10,
              "extras": 10,
              "frappe": 5
          },
          {
              "amount": 2,
              "extras": 9,
              "frappe": 5
          },
          {
              "amount": 1,
              "extras": 7,
              "frappe": 5
          },
          {
              "amount": 3,
              "extras": 8,
              "frappe": 5
          },
          {
              "amount": 1,
              "extras": 3,
              "frappe": 5
          },
          {
              "amount": 2,
              "extras": 12,
              "frappe": 5
          },
          {
              "amount": 2,
              "extras": 12,
              "frappe": 5
          }
      ],
      "size": 1,
      "create_date": "2022-10-23T04:49:44.209000Z",
      "comments": ""
  },
  {
      "id": 6,
      "creator": "admin@admin.com",
      "milk": 1,
      "base": 1,
      "extras": [],
      "size": 1,
      "create_date": "2022-10-23T04:49:44.588000Z",
      "comments": ""
  },
  {
      "id": 7,
      "creator": "admin@admin.com",
      "milk": 1,
      "base": 1,
      "extras": [],
      "size": 1,
      "create_date": "2022-10-23T04:49:44.933000Z",
      "comments": ""
  },
  {
      "id": 8,
      "creator": "admin@admin.com",
      "milk": 1,
      "base": 1,
      "extras": [],
      "size": 1,
      "create_date": "2022-10-23T04:49:45.216000Z",
      "comments": ""
  },
  {
      "id": 9,
      "creator": "admin@admin.com",
      "milk": 1,
      "base": 1,
      "extras": [],
      "size": 1,
      "create_date": "2022-10-23T04:49:45.534000Z",
      "comments": ""
  },
  {
      "id": 10,
      "creator": "admin@admin.com",
      "milk": 1,
      "base": 1,
      "extras": [
          {
              "amount": 3,
              "extras": 2,
              "frappe": 10
          },
          {
              "amount": 1,
              "extras": 6,
              "frappe": 10
          }
      ],
      "size": 1,
      "create_date": "2022-10-23T04:49:46.036000Z",
      "comments": ""
  },
  {
      "id": 11,
      "creator": "admin@admin.com",
      "milk": 1,
      "base": 3,
      "extras": [
          {
              "amount": 2,
              "extras": 8,
              "frappe": 11
          },
          {
              "amount": 1,
              "extras": 9,
              "frappe": 11
          }
      ],
      "size": 1,
      "create_date": "2022-10-23T15:20:38.910000Z",
      "comments": "For Menu"
  }
]

/**
 * Example data that could be gotten from http://127.0.0.1:8000/frappapi/extras/
 */
export const TestExtras: Array<Extra> = [
  {
      "id": 1,
      "name": "Secret Sauce",
      "stock": 10,
      "price_per_unit": "20.00",
      "updated_on": "2022-10-10T20:19:20.523000Z",
      "created_on": "2022-10-10T20:19:20.523000Z",
      "decaf": true,
      "non_dairy": false,
      "gluten_free": false,
      "limit": 1
  },
  {
      "id": 2,
      "name": "Vanilla",
      "stock": 1000,
      "price_per_unit": "0.30",
      "updated_on": "2022-10-10T20:19:20.523000Z",
      "created_on": "2022-10-10T20:19:20.523000Z",
      "decaf": true,
      "non_dairy": true,
      "gluten_free": true,
      "limit": 4
  },
  {
      "id": 3,
      "name": "Caramel",
      "stock": 1000,
      "price_per_unit": "0.30",
      "updated_on": "2022-10-10T20:19:20.523000Z",
      "created_on": "2022-10-10T20:19:20.523000Z",
      "decaf": true,
      "non_dairy": true,
      "gluten_free": true,
      "limit": 5
  },
  {
      "id": 4,
      "name": "Pumpkin Sauce",
      "stock": 10,
      "price_per_unit": "0.80",
      "updated_on": "2022-10-10T20:19:20.523000Z",
      "created_on": "2022-10-10T20:19:20.523000Z",
      "decaf": true,
      "non_dairy": true,
      "gluten_free": true,
      "limit": 3
  },
  {
      "id": 5,
      "name": "Macha",
      "stock": 1000,
      "price_per_unit": "0.45",
      "updated_on": "2022-10-10T20:19:20.523000Z",
      "created_on": "2022-10-10T20:19:20.523000Z",
      "decaf": true,
      "non_dairy": true,
      "gluten_free": true,
      "limit": 2
  },
  {
      "id": 6,
      "name": "Expresso Shot",
      "stock": 10000,
      "price_per_unit": "0.45",
      "updated_on": "2022-10-10T20:19:20.523000Z",
      "created_on": "2022-10-10T20:19:20.523000Z",
      "decaf": true,
      "non_dairy": true,
      "gluten_free": true,
      "limit": 3
  },
  {
      "id": 7,
      "name": "Chocolate Drizzle",
      "stock": 1550,
      "price_per_unit": "0.70",
      "updated_on": "2022-10-10T20:19:20.523000Z",
      "created_on": "2022-10-10T20:19:20.523000Z",
      "decaf": true,
      "non_dairy": true,
      "gluten_free": true,
      "limit": 1
  },
  {
      "id": 8,
      "name": "Oreos",
      "stock": 10000,
      "price_per_unit": "9.00",
      "updated_on": "2022-10-10T20:19:20.523000Z",
      "created_on": "2022-10-10T20:19:20.523000Z",
      "decaf": true,
      "non_dairy": false,
      "gluten_free": false,
      "limit": 35
  },
  {
      "id": 9,
      "name": "Whip Cream",
      "stock": 1000,
      "price_per_unit": "0.45",
      "updated_on": "2022-10-10T20:19:20.523000Z",
      "created_on": "2022-10-10T20:19:20.523000Z",
      "decaf": true,
      "non_dairy": false,
      "gluten_free": true,
      "limit": 2
  },
  {
      "id": 10,
      "name": "Sugar",
      "stock": 1000,
      "price_per_unit": "0.45",
      "updated_on": "2022-10-10T20:19:20.523000Z",
      "created_on": "2022-10-10T20:19:20.523000Z",
      "decaf": true,
      "non_dairy": true,
      "gluten_free": true,
      "limit": 3
  },
  {
      "id": 11,
      "name": "Frappuccino Roast Pump(s)",
      "stock": 999,
      "price_per_unit": "1.00",
      "updated_on": "2022-10-23T04:36:58.910000Z",
      "created_on": "2022-10-23T04:36:58.910000Z",
      "decaf": false,
      "non_dairy": true,
      "gluten_free": true,
      "limit": 10
  },
  {
      "id": 12,
      "name": "Chocolate Chips",
      "stock": 99999,
      "price_per_unit": "0.55",
      "updated_on": "2022-10-23T18:22:47.759000Z",
      "created_on": "2022-10-23T18:22:47.759000Z",
      "decaf": true,
      "non_dairy": true,
      "gluten_free": true,
      "limit": 4
  }
];

/**
 * Example data that could be gotten from http://127.0.0.1:8000/frappapi/menu/
 */
export const TestMenu: Array<MenuItem> = [
  {
      "name": "Pumpin Spice Frappe",
      "frappe": 2,
      "photo": "http://127.0.0.1:8000/uploads/product-placeholder.webp",
      "price": 6.1
  },
  {
      "name": "Apple Crisp",
      "frappe": 3,
      "photo": "http://127.0.0.1:8000/uploads/9955905055_f5321e37f9_b.jpg",
      "price": 4.05
  },
  {
      "name": "Mocha Cookie Crumbl",
      "frappe": 11,
      "photo": "http://127.0.0.1:8000/uploads/1fd99578d31f4072a52892398d8f1fa8.webp",
      "price": 23.0
  },
  {
      "name": "Vanilla Caffe",
      "frappe": 10,
      "photo": "http://127.0.0.1:8000/uploads/b7b496402286415c9c2be5bc1b4d7c3e.webp",
      "price": 4.4
  },
  {
      "name": "Java Chip",
      "frappe": 4,
      "photo": "http://127.0.0.1:8000/uploads/fe3131c518c34593938b32a67486fda0.webp",
      "price": 5.05
  },
  {
      "name": "Diabetes Special",
      "frappe": 5,
      "photo": "http://127.0.0.1:8000/uploads/index.jpg",
      "price": 78.65
  }
];

/**
 * Example data that could be gotten from http://127.0.0.1:8000/frappapi/milks/
 */
export const TestMilks: Array<Milk> = [
  {
      "id": 1,
      "name": "Whole Milk",
      "stock": 1000,
      "price_per_unit": "2.05",
      "updated_on": "2022-10-10T20:19:20.523000Z",
      "created_on": "2022-10-10T20:19:20.523000Z",
      "non_dairy": false
  },
  {
      "id": 2,
      "name": "Soy Milk",
      "stock": 1000,
      "price_per_unit": "5.05",
      "updated_on": "2022-10-10T20:19:20.523000Z",
      "created_on": "2022-10-10T20:19:20.523000Z",
      "non_dairy": true
  }
];

/**
 * Example data that could be gotten from http://127.0.0.1:8000/frappapi/bases/
 */
export const TestBases: Array<Base> = [
  {
      "id": 1,
      "name": "Coffee",
      "stock": 999999999,
      "price_per_unit": "1.00",
      "updated_on": "2022-10-10T20:19:20.523000Z",
      "created_on": "2022-10-10T20:19:20.523000Z",
      "decaf": false
  },
  {
      "id": 2,
      "name": "Cream",
      "stock": 999999999,
      "price_per_unit": "1.50",
      "updated_on": "2022-10-10T20:19:20.523000Z",
      "created_on": "2022-10-10T20:19:20.523000Z",
      "decaf": true
  },
  {
      "id": 3,
      "name": "Mocha",
      "stock": 999999999,
      "price_per_unit": "2.50",
      "updated_on": "2022-10-10T20:19:20.523000Z",
      "created_on": "2022-10-10T20:19:20.523000Z",
      "decaf": true
  }
];
