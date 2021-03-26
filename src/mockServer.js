const createMockServer = () => {
  let todos = [];

  const getIndexInDatabase = (id) => todos.findIndex((todo) => todo.id === id);

  const serverWorking = () => Math.random() <= 0.9999;

  const updateLocalStorage = () => localStorage.setItem("todos", JSON.stringify(todos));

  return {
    getTodosFromDatabase: () =>
      new Promise((resolve, reject) => {
        let storedTodos = JSON.parse(localStorage.getItem("todos"));
        const newTodos = [];
        if (storedTodos) {
          todos = [];
          storedTodos.forEach((todo) => {
            todos = todos.concat(todo);
            newTodos.push({ ...todo });
          });
        }
        resolve(newTodos);
      }),

    createTodoInDatabase: (newTodos) =>
      new Promise((resolve, reject) => {
        if (serverWorking()) {
          const newTodosAsArray = Array.isArray(newTodos) ? newTodos : [newTodos];
          newTodosAsArray.forEach((newTodo) => (todos = todos.concat({ ...newTodo })));
          updateLocalStorage();
          resolve();
        } else {
          reject("Opps!! something went wrong server side, plz try again after sometime");
        }
      }),

    updateTodoInDatabase: (updatedTodos) =>
      new Promise((resolve, reject) => {
        if (serverWorking()) {
          const updatedTodosAsArray = Array.isArray(updatedTodos) ? updatedTodos : [updatedTodos];

          updatedTodosAsArray.forEach((updatedTodo, i) => {
            const index = getIndexInDatabase(updatedTodo.id);
            todos = todos.slice(0, index).concat({ ...updatedTodo }, todos.slice(index + 1));
          });
          updateLocalStorage();
          resolve();
        } else {
          reject("Opps!! Cannot update right now, plz try again after sometime");
        }
      }),

    deleteTodoFromDatabase: (ids) =>
      new Promise((resolve, reject) => {
        if (serverWorking()) {
          const idsAsArray = Array.isArray(ids) ? ids : [ids];

          idsAsArray.forEach((id) => {
            const index = getIndexInDatabase(id);
            todos = todos.slice(0, index).concat(todos.slice(index + 1));
          });
          updateLocalStorage();
          resolve();
        } else {
          reject("Opps!! something went wrong while deleting TODO, plz try again after sometime");
        }
      }),
  };
};

export const mockServer = createMockServer();
