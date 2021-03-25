import { useMemo, useEffect } from "react";

import { FilterPanel } from "./FilterPanel";
import { Header } from "./Header";
import { CreateTodoForm } from "./CreateTodoForm";
import { Analytics } from "./Analytics";
import { TodoList } from "./TodoList";
import { BulkActionPanel } from "./BulkActionPanel";
import { ModalWindow } from "./ModalWindow";

import { useTodosState } from "../hooks/useTodosState";
import { useFilterState } from "../hooks/useFilterState";
import { useModalWindow } from "../hooks/useModalWindow";
import { useDate } from "../hooks/useDate";

import { validateTodoForFilter } from "../filterValidationOnTodo";
import { ACTIONS } from "../constants";

import "../../TodoApp.css";

export const TodoApp = () => {
  const { todosState, onTodoAction } = useTodosState();
  const { filterState, onFilterAction } = useFilterState();
  const { modalWindow, onModalWindowAction } = useModalWindow(onTodoAction);
  const { date } = useDate();

  useEffect(() => onTodoAction({ type: ACTIONS.INIT }), [onTodoAction]);

  const filteredTodos = useMemo(
    () => todosState.todos.filter((todo) => validateTodoForFilter(todo, filterState)),
    [todosState.todos, filterState]
  );

  const totalTodos = filteredTodos.length;
  const completedTodos = useMemo(() => filteredTodos.filter((todo) => todo.completed).length, [
    filteredTodos,
  ]);

  return (
    <>
      <Header date={date} searchValue={filterState.searchValue} onFilterAction={onFilterAction} />
      <div className="todo-app-body mar4">
        <div className="col1 b8 pad8">
          <FilterPanel AppliedFilter={filterState} onFilterAction={onFilterAction} />
          <CreateTodoForm onTodoAction={onTodoAction} />
          <Analytics totalTodos={totalTodos} completedTodos={completedTodos} />
        </div>
        <div className="col2 b8 pad8">
          <TodoList
            todos={filteredTodos}
            currentlySelectedIds={todosState.currentlySelectedIds}
            onTodoAction={onTodoAction}
            onModalWindowAction={onModalWindowAction}
          />
        </div>
      </div>
      <BulkActionPanel todosData={todosState} onTodoAction={onTodoAction} />
      {modalWindow.isOpen && (
        <ModalWindow todo={modalWindow.data} onModalWindowAction={onModalWindowAction} />
      )}
    </>
  );
};
