import { createStore } from "redux";

const initialState = {
  products: [],
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [
          ...state.products,
          { id: action.id, name: action.name, count: 1 },
        ],
      };
    case "INCREMENT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.id
            ? { ...product, count: Math.min(product.count + 1, 25) }
            : product
        ),
      };
      case 'DECREMENT':
        if (state.products.find(product => product.id === action.id).count === 1) {
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.id)
            };
        } else {
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.id ? { ...product, count: product.count - 1 } : product
                )
            };
        }
    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.id),
      };
    default:
      return state;
  }
}

const savedState = localStorage.getItem("cartState")
  ? JSON.parse(localStorage.getItem("cartState"))
  : initialState;

const store = createStore(cartReducer, savedState);

store.subscribe(() => {
  localStorage.setItem("cartState", JSON.stringify(store.getState()));
});

export default store;
