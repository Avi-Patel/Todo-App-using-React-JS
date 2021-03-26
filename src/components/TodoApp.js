import React, { useMemo } from "react";

import { FilterPanel } from "./FilterPanel";
import { Header } from "./Header";
import { CreateTodoForm } from "./CreateTodoForm";
import { Analytics } from "./Analytics";
import { TodoList } from "./TodoList";
import { BulkActionPanel } from "./BulkActionPanel";
import { ModalWindow } from "./ModalWindow";
import { EditTodoForm } from "./EditTodoForm";

import { useTodosState } from "../hooks/useTodosState";
import { useFilterState } from "../hooks/useFilterState";
import { useModalWindow } from "../hooks/useModalWindow";
import { useDate } from "../hooks/useDate";

import { validateTodoForFilter } from "../filterValidationOnTodo";

import "../TodoApp.css";

export const TodoApp = () => {
  const { todosState, onTodoAction } = useTodosState();
  const { filterState, onFilterAction } = useFilterState();
  const { modalWindow, onModalWindowAction } = useModalWindow();
  const { date } = useDate();

  const filteredTodos = useMemo(
    () => todosState.todos.filter((todo) => validateTodoForFilter(todo, filterState)),
    [filterState, todosState]
  );

  return (
    <>
      <Header date={date} searchValue={filterState.searchValue} onFilterAction={onFilterAction} />
      <div className="todo-app-body mar4">
        <div className="sidebar b8 pad8">
          <FilterPanel appliedFilter={filterState} onFilterAction={onFilterAction} />
          <CreateTodoForm onTodoAction={onTodoAction} />
          <Analytics todos={filteredTodos} />
        </div>
        <div className="todo-panel b8">
          <TodoList
            todos={filteredTodos}
            currentlySelectedIds={todosState.currentlySelectedIds}
            onTodoAction={onTodoAction}
            onModalWindowAction={onModalWindowAction}
          />
        </div>
      </div>
      <BulkActionPanel
        currentlySelectedIds={todosState.currentlySelectedIds}
        onTodoAction={onTodoAction}
      />
      {modalWindow.isOpen && (
        <ModalWindow>
          <EditTodoForm
            todo={modalWindow.data}
            onModalWindowAction={onModalWindowAction}
            onTodoAction={onTodoAction}
          />
        </ModalWindow>
      )}
    </>
  );
};
