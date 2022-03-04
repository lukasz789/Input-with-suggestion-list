import React from "react";

import classes from "./SuggestedInputList.module.css";

import { useSelector } from "react-redux";

import SuggestedInputListItem from "./SuggestedInputListItem";

const SuggestedInputList = () => {
  const data = useSelector((state) => state.data);

  return (
    <>
      {data.length ? (
        <ul className={classes["filtered-list"]}>
          {data.map((listItem, key) => {
            return <SuggestedInputListItem key={key} itemData={listItem} />;
          })}
        </ul>
      ) : null}
    </>
  );
};

export default SuggestedInputList;
