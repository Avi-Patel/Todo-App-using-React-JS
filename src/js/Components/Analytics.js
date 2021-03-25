import React from "react";

export const Analytics = React.memo(({ totalTodos, completedTodos }) => {
  // useMemo?
  const percentage = completedTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100);

  return (
    <div className="card b12 pad8 top-mar8">
      <div className="percentage-circle">
        <div className="percetage-text">{percentage + " %"}</div>
        <div className="ratio-text">
          {completedTodos} / {totalTodos}
        </div>
      </div>
      <div className="normal-bold-text top-bottom-mar8">Analytics</div>
    </div>
  );
});
