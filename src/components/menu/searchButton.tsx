import React from "react";
import classes from "./menu.module.css";

const SearchButton = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={classes.svg1}
    >
      <path
        fill="rgb(199, 207, 209)"
        fillRule="evenodd"
        d="M10.5 2.25a8.25 8.25 0 1 0 5.28 14.59l4.69 4.69a.75.75 0 1 0 1.06-1.06l-4.69-4.69A8.25 8.25 0 0 0 10.5 2.25ZM3.75 10.5a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default SearchButton;
