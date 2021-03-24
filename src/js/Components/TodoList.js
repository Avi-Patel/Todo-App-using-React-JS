import Todo from "./Todo";

const TodoList = ({ todosState, onTodoAction, onEditWindowAction }) => {
  return (
    <div className="col2 b8 pad8">
      {todosState.todos.map((todo) => {
        const isSelected = todosState.currentlySelectedIds.includes(todo.id);
        return (
          <Todo
            key={todo.id}
            todo={todo}
            isSelected={isSelected}
            onTodoAction={onTodoAction}
            onEditWindowAction={onEditWindowAction}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
