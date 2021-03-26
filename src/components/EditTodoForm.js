import React, { useCallback, useState } from "react";

import { TodoForm } from "./TodoForm";
import { Button } from "./utilityComponents/Button";

import { MODAL_WINDOW_ACTIONS, ACTIONS } from "../constants";

const EditTodoForm = ({ todo, onModalWindowAction, onTodoAction }) => {
  const [todoData, setTodoData] = useState(todo);

  const handleTodoDataChange = useCallback(
    (event) =>
      setTodoData((prevFormData) => ({
        ...prevFormData,
        [event.target.dataset.name]: event.target.value,
      })),
    []
  );

  const handleUpdate = useCallback(() => {
    if (todoData.title === "") {
      return;
    }
    onTodoAction({ type: ACTIONS.UPDATE, payload: { updatedTodos: todoData } });
    onModalWindowAction({ type: MODAL_WINDOW_ACTIONS.CLOSE });
  }, [onModalWindowAction, onTodoAction, todoData]);

  const handleCancel = useCallback(
    () => onModalWindowAction({ type: MODAL_WINDOW_ACTIONS.CLOSE }),
    [onModalWindowAction]
  );

  return (
    <>
      <div className="cwhite normal-bold-text top-bottom-mar8">Update Your Todo</div>
      <TodoForm formData={todoData} onFormChange={handleTodoDataChange} />
      <div>
        <Button label="Update" onClick={handleUpdate} />
        <Button label="Cancel" onClick={handleCancel} />
      </div>
    </>
  );
};
const _EditTodoForm = React.memo(EditTodoForm);
export { _EditTodoForm as EditTodoForm };
