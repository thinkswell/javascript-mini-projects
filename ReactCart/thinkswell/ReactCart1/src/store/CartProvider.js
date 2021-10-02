import { useReducer } from "react";
import CardContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const preItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const preItem = state.items[preItemIndex];
    let updatedItems;

    if (preItem) {
      const updatedItem = {
        ...preItem,
        amount: preItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[preItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const preItemIndex = state.items.findIndex((item) => item.id === action.id);
    const preItem = state.items[preItemIndex];

    const updatedTotalAmount = state.totalAmount - preItem.price;

    let updatedItems;

    if (preItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...preItem, amount: preItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[preItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
};

const CardProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromHandler,
  };

  return (
    <CardContext.Provider value={cartContext}>
      {props.children}
    </CardContext.Provider>
  );
};

export default CardProvider;
