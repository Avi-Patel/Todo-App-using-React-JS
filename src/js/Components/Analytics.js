import React from "react";

export const Analytics = React.memo(({ totalTodos, completedTodos }) => {
  console.log("Analytics");
  // useMemo?
  const percentage = completedTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100);

  return (
    <div className="card b12 pad12 top-bottom-mar8">
      <div className="percentage-circle">
        <div className="percetage-text">{percentage + " %"}</div>
        <div className="ratio-text">
          {completedTodos} / {totalTodos}
        </div>
      </div>
      <div className="normal-bold-title mar8">Analytics</div>
    </div>
  );
});
