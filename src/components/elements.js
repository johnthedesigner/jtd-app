import React from "react";
import _ from "lodash";

const classes = classes => {
  let classNameValue = "";
  _.each(classes, className => {
    classNameValue += `${className} `;
  });
  return classNameValue;
};

export const Button = props => {
  return (
    <button className={classes(["button", props.className])}>
      {props.children}
    </button>
  );
};

export const Title = props => {
  return <h2 className={classes(["h2", props.className])}>{props.children}</h2>;
};
