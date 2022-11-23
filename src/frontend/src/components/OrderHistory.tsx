import ScrollableList from './ScrollableList';
import React, { useState, useEffect } from 'react';
import { useAuth } from './auth';
import '../css/OrderHistory.css';

const MENU_ENDPOINT = 'http://127.0.0.1:8000/frappapi/menu/';

interface Props {
  title: string;
  endpoint: string;
  width: number;
  outdated: boolean;
  condense: boolean;
  setOutdated: (status: boolean) => void;
  setLength?: (length: number) => void;
}

interface PropsOrder {
  order: Order;
}

interface Order {
  date: Date;
  drinks: Drink[];
  status: number;
}

interface Drink {
  name: string;
  cost: number;
  picture: string;
  status: number;
}

enum OrderState {
  loading,
  failed,
  empty,
  default,
}
export default function OrderHistory(props: Props) {
  const [orderState, setOrderState] = useState(OrderState.default);
  const [orders, setOrders] = useState<Order[]>([]);
  const [menu, setMenu] = useState<any | undefined>();

  const auth = useAuth();
  if (auth !== null) {
    var user = auth.userInfo;
  } else {
    user = {
      id: -1,
      fullName: '',
      userName: '',
      email: '',
      password: '',
      balance: 0.0,
      role: 'none',
      key: '',
      hours: 0,
    };
  }

  useEffect(() => {
    setOrderState(OrderState.loading);
    fetch(MENU_ENDPOINT, {
      headers: { Authorization: `Token ${user.key}` },
      credentials: 'same-origin',
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            updateMenu(data);
          });
        } else {
          setOrderState(OrderState.failed);
        }
      })
      .catch(() => setOrderState(OrderState.failed));
  }, []);

  useEffect(() => {
    if (props.outdated) {
      fetchOrders();
      props.setOutdated(false);
    }
  }, [menu, props.outdated]);

  function updateMenu(data: any) {
    console.log('UPDATE MENU');
    var len = 0;
    for (const item of data) {
      if (item.frappe.id > len) {
        len = item.frappe.id;
      }
    }
    const newMenu: any[] = [];
    for (let i = 0; i < len; i++) {
      newMenu.push(undefined);
    }

    for (const item of data) {
      console.log(item.frappe.id);
      const id: number = item.frappe.id;
      newMenu[id] = item;
    }
    console.log(newMenu);
    setMenu(newMenu);
    props.setOutdated(true);
    console.log(menu);
  }

  function fetchOrders() {
    console.log('Fetch Orders');
    fetch(props.endpoint, {
      headers: { Authorization: `Token ${user.key}` },
      credentials: 'same-origin',
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            if (data.length > 0) {
              updateOrders(data);
              setOrderState(OrderState.default);
            } else {
              setOrderState(OrderState.empty);
            }
          });
        } else {
          setOrderState(OrderState.failed);
        }
      })
      .catch(() => setOrderState(OrderState.failed));
  }

  function updateOrders(data: any) {
    console.log('UPDATE ORDERS');
    const newOrders: Order[] = [];
    for (const drink of data) {
      drink.create_date = drink.create_date.split('T')[0];
      var sameDate = false;
      if (drink.menu_key && menu && menu[drink.menu_key]) {
        const newDrink: Drink = {
          name: menu[drink.menu_key].name,
          cost: drink.final_price,
          picture: menu[drink.menu_key].photo,
          status: drink.status,
        };

        if (props.condense) {
          for (const order of newOrders) {
            if (order.date == drink.date) {
              sameDate = true;

              order.drinks.push(newDrink);
            }
          }
        }

        if (!sameDate) {
          const newOrder: Order = {
            date: drink.create_date,
            drinks: [newDrink],
            status: 2,
          };
          newOrders.push(newOrder);
        }
      } else {
        continue;
      }
    }

    for (const order of newOrders) {
      for (const drink of order.drinks) {
        if (drink.status === 1) {
          order.status = 1;
        }
      }
    }
    if (props.setLength) {
      props.setLength(newOrders.length);
    }
    setOrders(newOrders);
  }

  if (orderState === OrderState.loading) {
    return (
      <ScrollableList title={props.title} width={`${props.width}%`}>
        <div className="order-loader"></div>
      </ScrollableList>
    );
  }

  if (orderState === OrderState.failed) {
    return (
      <ScrollableList title={props.title} width={`${props.width}%`}>
        <div className="order-red">Loading Error</div>
      </ScrollableList>
    );
  }

  if (orderState === OrderState.empty) {
    return (
      <ScrollableList title={props.title} width={`${props.width}%`}>
        <div className="order-gray">No Orders</div>
      </ScrollableList>
    );
  }

  return (
    <ScrollableList title={props.title} width={`${props.width}%`}>
      {orders.map((orderInstance) => (
        <OrderCard order={orderInstance} />
      ))}
    </ScrollableList>
  );
}

function OrderCard(props: PropsOrder) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`order-card ${
        props.order.status === 1 ? ' order-card-orange' : ' order-card-gray'
      }`}
    >
      <div className="content">
        <div className="order-date">
          {props.order.date.toLocaleString('en-us', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </div>
        {!expanded && (
          <div className="order-summary">
            <div className="small-container">
              <div className="home-drink-name">
                {props.order.drinks[0].name}
                {props.order.drinks.length > 1
                  ? ` (${props.order.drinks.length})`
                  : ''}
              </div>
              <div className="cost">
                $
                {props.order.drinks
                  .map((drink) => drink.cost)
                  .reduce((a, b) => a + b, 0)
                  .toFixed(2)}
              </div>
            </div>
            <div className="drink-photo-container">
              <img
                src={props.order.drinks[0].picture}
                alt="frappe1"
                className="home-drink-photo"
              />
            </div>
          </div>
        )}
        {expanded && (
          <div className="drink-list">
            {props.order.drinks.map((drink) => (
              <div className="order-summary">
                <div className="small-container">
                  <div className="home-drink-name">{drink.name}</div>
                  <div className="cost">${drink.cost.toFixed(2)}</div>
                </div>
                <div className="drink-photo-container">
                  <img
                    src={drink.picture}
                    alt="frappe"
                    className="home-drink-photo"
                  />
                </div>
              </div>
            ))}{' '}
          </div>
        )}
      </div>
      {props.order.drinks.length > 1 && (
        <div className="expand-arrow" onClick={() => setExpanded(!expanded)}>
          {expanded ? '▲' : '▼'}
        </div>
      )}
      {props.order.drinks.length <= 1 && (
        <div className="expand-arrow2">{'\u00A0'}</div>
      )}
    </div>
  );
}
