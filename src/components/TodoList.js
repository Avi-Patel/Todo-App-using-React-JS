import { Todo } from "./Todo";

const TodoList = ({ todos, currentlySelectedIds, onTodoAction, onModalWindowAction }) => (
  <>
    {todos.length ? (
      todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          isSelected={currentlySelectedIds.includes(todo.id)}
          onTodoAction={onTodoAction}
          onModalWindowAction={onModalWindowAction}
        />
      ))
    ) : (
      <div className="normal-bold-text cwhite top-mar8">No todos to show</div>
    )}
  </>
);

export { TodoList };
