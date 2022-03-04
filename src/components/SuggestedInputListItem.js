import React, { useEffect, useState } from "react";

import classes from "./SuggestedInputListItem.module.css";

import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "../store-redux/actionTypes";

const SuggestedInputListItem = (props) => {
  const dispatch = useDispatch();

  const [style, setStyle] = useState({});
  const [nonBoldText, setNonBoldText] = useState("");

  const currentDataItem = useSelector((state) => state.currentDataItem);
  const currentInputValue = useSelector((state) => state.currentInputValue);

  useEffect(() => {
    if (props.itemData.id === currentDataItem.id) {
      setStyle({ color: "white", backgroundColor: "DodgerBlue" });
    } else {
      setStyle({});
    }
  }, [currentDataItem]);

  useEffect(() => {
    const newNonBoldText = props.itemData.username.substring(
      currentInputValue.length
    );
    setNonBoldText(newNonBoldText);
  }, [currentInputValue]);

  const clickListItemHandler = () => {
    dispatch({
      type: actionTypes.SET_ENTERED_DATA_ITEM,
      clickedListItem: props.itemData,
    });
  };

  return (
    <li
      className={classes.listItem}
      style={style}
      onMouseDown={clickListItemHandler}
    >
      <strong>{currentInputValue}</strong>
      {nonBoldText}
    </li>
  );
};

export default SuggestedInputListItem;
