import React from 'react';
import "./style.css";

export const LayoutHeader = ({header}) => {
  return (
    <h1 className={`${header === "Family Details" ? "title-details" : "title-tree"}`}>
        {header}
    </h1>
  )
}
