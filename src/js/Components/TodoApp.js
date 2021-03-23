import "../../TodoApp.css";
import { useMemo } from "react";
import { FilterPanel } from "./FilterPanel";
import { Header } from "./Header";
import { CreateTodoForm } from "./CreateTodoForm";
import { Analytics } from "./Analytics";
import { TodoList } from "./TodoList";
import { BulkActionPanel } from "./BulkActionPanel";
import { useTodosState } from "../CustomHooks/useTodosState";
import { useFilterState } from "../CustomHooks/useFilterState";
import { validateTodoForFilter } from "../filterValidationOnTodo";

const TodoApp = () => {
  const [todosState, onAction] = useTodosState();
  const [filterState, dispatch] = useFilterState();

  // useCallback ? TodoApp will re-render only when todosState or filterState is changed.
  const filteredTodos = todosState.todos.filter((todo) => validateTodoForFilter(todo, filterState));

  const totalTodos = useMemo(() => filteredTodos.length, [filteredTodos.length]);
  const completedTodos = useMemo(() => filteredTodos.filter((todo) => todo.completed).length, [
    filteredTodos,
  ]);

  return (
    <>
      <Header searchValue={filterState.searchValue} dispatch={dispatch} />
      <div className="todo-app-body mar4">
        <div className="col1 b8 pad8">
          <FilterPanel filterState={filterState} dispatch={dispatch} />
          <CreateTodoForm onAction={onAction} />
          <Analytics totalTodos={totalTodos} completedTodos={completedTodos} />
        </div>
        <TodoList
          todos={filteredTodos}
          currentlySelectedIds={todosState.currentlySelectedIds}
          onAction={onAction}
        />
      </div>
      <BulkActionPanel />
      <div className="snackbar" data-id="snackbar"></div>
    </>
  );
};

export default TodoApp;
