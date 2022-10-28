import CartContext from './cart-context';
import React, { useReducer } from 'react';

const cartReducer = (state, action) => {
  let updatedItems;

  switch (action.type) {
    case 'ADD': {
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item); // concat is a nifty way to keep things immutable (as opposed to using push())
        // console.log(updatedItems);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    case 'REMOVE': {
      const existingCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.id;
      });
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingCartItem.price;
      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter(
          (item) => item.id !== existingCartItem.id
        );
      } else {
        const updatedItem = {
          ...existingCartItem,
          amount: --existingCartItem.amount,
        };
        updatedItems = state.items.map((item, i) => {
          return i === existingCartItemIndex ? updatedItem : item;
          /*
          alternative to the map above could have been (teacher's solution):
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
          */
        });
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    default:
      return state;
  }
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCardHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCardHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
