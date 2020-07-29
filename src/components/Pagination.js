import React from "react";

const Pagination = ({ count, limit, setpage }) => {
  const buttonsCount = count / limit;

  const buttons = [];

  for (let i = 1; i <= buttonsCount; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => {
          setpage(i);
        }}
      >
        {i}
      </button>
    );
  }

  return <div className="pagination">{buttons}</div>;
};

export default Pagination;
