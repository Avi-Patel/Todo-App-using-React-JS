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

const TodoAppBody = ({ todos, currentlySelectedIds, filters, onAction }) => (
  <>
    <div className="todo-app-body mar4">
      <div className="todo-app-body__sidebar b8 pad8">
        <FilterPanel appliedFilter={filters} onFilterAction={onAction.onFilterAction} />
        <CreateTodoForm onTodoAction={onAction.onTodoAction} />
        <Analytics todos={todos} />
      </div>
      <div className="todo-app-body__todo-panel b8">
        <TodoList
          todos={todos}
          currentlySelectedIds={currentlySelectedIds}
          onTodoAction={onAction.onTodoAction}
          onModalWindowAction={onAction.onModalWindowAction}
        />
      </div>
    </div>
    <BulkActionPanel
      currentlySelectedIds={currentlySelectedIds}
      onTodoAction={onAction.onTodoAction}
    />
  </>
);

export const TodoApp = () => {
  const { todosState, onTodoAction } = useTodosState();
  const { filters, onFilterAction } = useFilterState();
  const { modalWindow, onModalWindowAction } = useModalWindow();
  const { date } = useDate();

  const filteredTodos = useMemo(
    () => todosState.todos.filter((todo) => validateTodoForFilter(todo, filters)),
    [filters, todosState]
  );
  const onAction = useMemo(
    () => ({
      onTodoAction,
      onFilterAction,
      onModalWindowAction,
    }),
    [onTodoAction, onFilterAction, onModalWindowAction]
  );

  return (
    <>
      <Header date={date} searchValue={filters.searchValue} onFilterAction={onFilterAction} />
      <TodoAppBody
        todos={filteredTodos}
        currentlySelectedIds={todosState.currentlySelectedIds}
        filters={filters}
        onAction={onAction}
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
