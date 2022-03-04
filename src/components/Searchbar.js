import React, { useRef, useEffect } from "react";
import classes from "./Searchbar.module.css";

import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../store-redux/actionTypes";

const Searchbar = (props) => {
  const dispatch = useDispatch();

  const inputRef = useRef();

  const enteredDataItem = useSelector((state) => state.enteredDataItem);
  const currentInputValue = useSelector((state) => state.currentInputValue);

  useEffect(() => {
    if (Object.keys(enteredDataItem).length > 0) {
      inputRef.current.value = enteredDataItem.name;
      dispatch({
        type: actionTypes.SET_CURRENT_INPUT_VALUE,
        currentInputValue: enteredDataItem.name,
      });

      dispatch({ type: actionTypes.SET_DATA, newData: [] });
    }
  }, [enteredDataItem, dispatch]);

  const changeInputHandler = (event) => {
    dispatch({ type: actionTypes.CLEAR_DATA_ITEM });

    const enteredInput = event.target.value;
    dispatch({
      type: actionTypes.SET_CURRENT_INPUT_VALUE,
      currentInputValue: event.target.value,
    });

    // for data with bigger size could render (& save in redux store) only fraction of items in data that are matching with input value(using .slice())
    // here only 10 total items, so I will skip it
    const filtered = props.initialData.filter((value) => {
      return value.name
        .toString()
        .toLowerCase()
        .startsWith(enteredInput.toLowerCase());
    });

    if (enteredInput === "") {
      dispatch({ type: actionTypes.SET_DATA, newData: [] });
    } else {
      dispatch({ type: actionTypes.SET_DATA, newData: filtered });
    }
  };

  const inputBlurHandler = async () => {
    if (currentInputValue) {
      dispatch({ type: actionTypes.SET_DATA, newData: [] });
    }
  };

  return (
    <div className={classes.inputWrap}>
      <input
        className={classes.input}
        type="text"
        placeholder="Name"
        onChange={changeInputHandler}
        ref={inputRef}
        value={currentInputValue}
        onBlur={inputBlurHandler}
      />
    </div>
  );
};

export default Searchbar;
