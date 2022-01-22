import { createStore } from 'vuex';
import { v4 as uuid } from 'uuid';

interface User {
  id: string,
  username: string,
  name: string,
  surname: string,
}

interface Task {
  id: string,
  reporter: User['id'],
  assignee: User['id'],
  topic: string,
}

const createTestUsers: () => User[] = () => [
  {
    id: uuid(),
    username: 'test123',
    name: 'John',
    surname: 'Doe',
  },
  {
    id: uuid(),
    username: 'test321',
    name: 'Jane',
    surname: 'Doe',
  },
];

const createTestTasks: (users: User[]) => Task[] = (users) => [
  {
    id: uuid(),
    reporter: users[0].id,
    assignee: users[1].id,
    topic: 'Task 1',
  },
  {
    id: uuid(),
    reporter: users[1].id,
    assignee: users[0].id,
    topic: 'Task 2',
  },
];

const users = createTestUsers();
const tasks = createTestTasks(users);

export default createStore({
  state: {
    users,
    tasks,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
