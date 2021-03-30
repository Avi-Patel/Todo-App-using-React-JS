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

import { validateTodoForFilter } from "../helpers";

import "../TodoApp.css";

export const TodoApp = () => {
  const { todosState, onTodoAction } = useTodosState();
  const { filters, onFilterAction } = useFilterState();
  const { modalWindow, onModalWindowAction } = useModalWindow();
  const { date } = useDate();

  const filteredTodos = useMemo(
    () => todosState.todos.filter((todo) => validateTodoForFilter(todo, filters)),
    [filters, todosState]
  );

  return (
    <>
      <Header date={date} searchValue={filters.searchValue} onFilterAction={onFilterAction} />
      <div className="todo-app-body mar4">
        <div className="sidebar b8 pad8">
          <FilterPanel appliedFilter={filters} onFilterAction={onFilterAction} />
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
        <ModalWindow onModalWindowAction={onModalWindowAction}>
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
