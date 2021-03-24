import "../../TodoApp.css";
import { useMemo } from "react";

import FilterPanel from "./FilterPanel";
import Header from "./Header";
import CreateTodoForm from "./CreateTodoForm";
import Analytics from "./Analytics";
import TodoList from "./TodoList";
import BulkActionPanel from "./BulkActionPanel";
import EditWindow from "./EditWindow";

import { useTodosState } from "../hooks/useTodosState";
import { useFilterState } from "../hooks/useFilterState";
import { useEditWindow } from "../hooks/useEditWindow";

import { validateTodoForFilter } from "../filterValidationOnTodo";

const TodoApp = () => {
  const [todosState, onTodoAction] = useTodosState();
  const [filterState, onFilterAction] = useFilterState();
  const [editWindowData, onEditWindowAction] = useEditWindow(onTodoAction);

  // useCallback ? TodoApp will re-render only when todosState or filterState is changed.
  const filteredTodos = useMemo(
    () => todosState.todos.filter((todo) => validateTodoForFilter(todo, filterState)),
    [todosState.todos, filterState]
  );

  const totalTodos = useMemo(() => filteredTodos.length, [filteredTodos.length]);
  const completedTodos = useMemo(() => filteredTodos.filter((todo) => todo.completed).length, [
    filteredTodos,
  ]);

  //Doubt: define date here in TodoApp or do not memoize Header?
  const date = new Date().toDateString();

  return (
    <>
      <Header date={date} searchValue={filterState.searchValue} onFilterAction={onFilterAction} />
      <div className="todo-app-body mar4">
        <div className="col1 b8 pad8">
          <FilterPanel filterState={filterState} onFilterAction={onFilterAction} />
          <CreateTodoForm onTodoAction={onTodoAction} />
          <Analytics totalTodos={totalTodos} completedTodos={completedTodos} />
        </div>
        <TodoList
          todosState={todosState}
          onTodoAction={onTodoAction}
          onEditWindowAction={onEditWindowAction}
        />
      </div>
      <BulkActionPanel todosState={todosState} onTodoAction={onTodoAction} />
      {editWindowData.isOpen && (
        <EditWindow todo={editWindowData.payload} onEditWindowAction={onEditWindowAction} />
      )}
    </>
  );
};

export default TodoApp;
