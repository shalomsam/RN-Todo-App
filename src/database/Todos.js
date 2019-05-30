import Database from './Database';

class Todos extends Database {
  getTodoList = async (userId) => {
    const listsRefKey = `user/${userId}/lists/`;
    const snapshot = await this.database.ref(listsRefKey).once('value');

    if (snapshot.val()) {
      return snapshot.val();
    }

    return null;
  }

  addTodoList = async (list, userId) => {
    const listsRefKey = `user/${userId}/lists/`;
    const todoList = await this.getTodoList(userId);
    todoList[list.key] = list;

    return this.database.ref(listsRefKey).set(todoList);
  }

  getTodos = async (listKey, userId) => {
    const listsRefKey = `user/${userId}/lists/`;
    const refKey = listsRefKey + listKey;
    const snapshot = await this.database.ref(refKey).once('value');

    if (snapshot.val() && snapshot.val().todos) {
      return snapshot.val().todos;
    }

    return null;
  }

  setTodos = (list, userId) => {
    const listsRefKey = `user/${userId}/lists/`;
    const refKey = `${listsRefKey}${list.key}/todos`;
    this.database.ref(refKey).set(list.todos);
  }
}

const todos = new Todos();
// export default { todos };
export default todos;
