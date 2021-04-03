import React, { useMemo } from "react";

const Analytics = ({ todos }) => {
  const totalTodos = todos.length;
  const completedTodos = useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);

  const percentage = totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100);

  return (
    <div className="card b12 pad8 top-mar8">
      <div className="percentage-circle">
        <div className="percetage-text">{percentage + " %"}</div>
        <div className="ratio-text">
          {completedTodos} / {totalTodos}
        </div>
      </div>
      <div className="normal-bold-text cwhite top-bottom-mar8">Analytics</div>
    </div>
  );
};
const _Analytics = React.memo(Analytics);
export { _Analytics as Analytics };
