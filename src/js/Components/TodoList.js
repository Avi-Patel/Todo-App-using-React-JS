import { Todo } from "./Todo";

export const TodoList = ({ todos, currentlySelectedIds, onAction }) => {
  return (
    <div className="col2 b8 pad8">
      {todos.map((todo) => {
        const isSelected = currentlySelectedIds.indexOf(todo.id) !== -1;
        return <Todo key={todo.id} todo={todo} isSelected={isSelected} onAction={onAction} />;
      })}
    </div>
  );
};
