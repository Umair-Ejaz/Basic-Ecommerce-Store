import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      {
        const existing = state.items.find(i => i.id === action.payload.id);
        if (existing) {
          return {
            ...state,
            items: state.items.map(i =>
              i.id === action.payload.id ? { ...i, qty: i.qty + action.payload.qty } : i
            )
          };
        }
        return { ...state, items: [...state.items, action.payload] };
      }
    case "REMOVE":
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i)
      };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product, qty = 1) =>
    dispatch({ type: "ADD", payload: { ...product, qty } });

  const removeFromCart = (id) => dispatch({ type: "REMOVE", payload: id });
  const updateQty = (id, qty) => dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const subtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items: state.items, addToCart, removeFromCart, updateQty, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
