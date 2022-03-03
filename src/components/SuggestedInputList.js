import React from "react";

import { useSelector } from "react-redux";

import classes from "./SuggestedInputList.module.css";

import SuggestedInputListItem from "./SuggestedInputListItem";

const SuggestedInputList = () => {
  const data = useSelector((state) => state.data);

  console.log("RENDER LIST");

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
