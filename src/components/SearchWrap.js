import React, { useEffect, useState } from "react";

import Searchbar from "./Searchbar";
import SuggestedInputList from "./SuggestedInputList";

import Axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../store-redux/actionTypes";

const SearchWrap = () => {
  const [initialData, setInitialData] = useState([]);

  const dispatch = useDispatch();
  const filteredList = useSelector((state) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Axios(
          "https://jsonplaceholder.typicode.com/users"
        );
        setInitialData(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const keyUpHandler = (event) => {
    if (filteredList.length > 0) {
      switch (event.key) {
        case "ArrowUp":
          dispatch({ type: actionTypes.MOVE_UP_ON_LIST });
          break;
        case "ArrowDown":
          dispatch({ type: actionTypes.MOVE_DOWN_ON_LIST });
          break;
        case "Enter":
          dispatch({
            type: actionTypes.SET_ENTERED_DATA_ITEM,
          });
          break;
        default:
        // do nothing
      }
    }
  };

  return (
    <div onKeyUp={keyUpHandler}>
      <Searchbar initialData={initialData} />
      <SuggestedInputList />
    </div>
  );
};

export default SearchWrap;
