import { createStore } from "redux";
import { actionTypes } from "./actionTypes";

const initialState = {
  data: [],
  currentDataItem: {},
  enteredDataItem: {},
  currentInputValue: "",
};

const dataReducer = (state = initialState, action) => {
  const currentIndex = state.data.findIndex(
    (el) => el.id === state.currentDataItem.id
  );

  switch (action.type) {
    case actionTypes.SET_DATA:
      return {
        ...state,
        data: action.newData,
      };

    case actionTypes.MOVE_UP_ON_LIST:
      if (
        Object.keys(state.currentDataItem).length === 0 ||
        currentIndex === 0
      ) {
        return {
          ...state,
          currentDataItem: { ...state.data[state.data.length - 1] },
        };
      } else {
        return {
          ...state,
          currentDataItem: { ...state.data[currentIndex - 1] },
        };
      }

    case actionTypes.MOVE_DOWN_ON_LIST:
      if (
        Object.keys(state.currentDataItem).length === 0 ||
        currentIndex === state.data.length - 1
      ) {
        return {
          ...state,
          currentDataItem: { ...state.data[0] },
        };
      } else {
        return {
          ...state,
          currentDataItem: { ...state.data[currentIndex + 1] },
        };
      }

    case actionTypes.CLEAR_DATA_ITEM:
      return {
        ...state,
        enteredDataItem: {},
        currentDataItem: {},
      };

    case actionTypes.SET_ENTERED_DATA_ITEM:
      return {
        ...state,
        enteredDataItem: action.clickedListItem
          ? action.clickedListItem
          : { ...state.currentDataItem },
      };

    case actionTypes.SET_CURRENT_INPUT_VALUE:
      return {
        ...state,
        currentInputValue: action.currentInputValue,
      };

    default:
      console.log(`Something went wrong, ${action.type} not defined`);
  }
  return state;
};

const store = createStore(dataReducer);

export default store;
