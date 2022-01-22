import { createStore } from 'vuex';
import { v4 as uuid } from 'uuid';

export interface User {
  id: string,
  username: string,
  name: string,
  surname: string,
}

export interface Task {
  id: string,
  reporter: User['id'],
  assignee: User['id'],
  topic: string,
  description?: string,
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
    description: 'This be but a simple description.',
  },
  {
    id: uuid(),
    reporter: users[0].id,
    assignee: users[1].id,
    topic: 'Task 3',
  },
  {
    id: uuid(),
    reporter: users[1].id,
    assignee: users[0].id,
    topic: 'Task 4',
    description: 'This be but a simple description.',
  },
];

const users = createTestUsers();
const tasks = createTestTasks(users);

export default createStore({
  state: {
    users,
    tasks,
  },
  getters: {
    getAllUsers: (state) => state.users,
    getAllTasks: (state) => state.tasks,
    getUserById: (state) => (id: User['id']) => state.users.find((user) => user.id === id),
    getTaskById: (state) => (id: Task['id']) => state.tasks.find((task) => task.id === id),
    getUserFullNameById: (state, getters) => (id: User['id']) => {
      const user = getters.getUserById(id);
      return `${user.name} ${user.surname}`;
    },
  },
  mutations: {
    moveTask: (state, { taskId, newPos }) => {
      // TODO: fix this for filtered tasks by user
      const index = state.tasks.findIndex((task) => task.id === taskId);
      const task = state.tasks.splice(index, 1);
      state.tasks.splice(newPos, 0, task[0]);
    },
  },
  actions: {
    moveTask: (context, { taskId, newPos }) => {
      context.commit('moveTask', { taskId, newPos });
    },
  },
  modules: {
  },
});
