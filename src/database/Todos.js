import uuid from 'uuid/v4';
import Database from './Database';

class Todos extends Database {
  getTodoList = async (userId) => {
    const userListsRef = `users/${userId}/lists`;
    const userListSnapshot = await this.database.ref(userListsRef).once('value');
    const userList = userListSnapshot.val();
    const lists = {};
    if (userList) {
      const listIds = Object.keys(userList);

      await Promise.all(listIds.map(async (listId) => {
        const listsRefKey = `lists/${listId}`;
        const snapshot = await this.database.ref(listsRefKey).once('value');
        const list = snapshot.val();

        if (list) {
          lists[listId] = list;
        }
        return null;
      }));

      return lists;
    }

    return null;
  }

  addTodoList = async (list, userId, _listId = null) => {
    try {
      const listId = _listId !== null ? _listId : uuid();
      const userListsRefKey = `users/${userId}/lists`;
      const snapshot = await this.database.ref(userListsRefKey).once('value');
      const lists = snapshot.val();
      lists[listId] = true;
      this.database.ref(userListsRefKey).set(lists);

      const listsRefKey = `lists/${listId}`;
      return this.database.ref(listsRefKey).set(list);
    } catch (e) {
      console.log('addTodoList error >>', e);
      return null;
    }
  }

  getTodos = async (listId) => {
    // const listsRefKey = `user/${userId}/lists/`;
    const refKey = `lists/${listId}/todos`;
    const snapshot = await this.database.ref(refKey).once('value');

    if (snapshot.val()) {
      return snapshot.val();
    }

    return null;
  }

  setTodos = (list, userId) => {
    if (!userId) {
      return false;
    }
    const refKey = `lists/${list.key}/todos`;
    return this.database.ref(refKey).set(list.todos);
  }
}

const todos = new Todos();
export default todos;
