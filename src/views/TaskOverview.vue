<template>
  <div class="content-container">
    <modal v-if="detailsModalOpened">
      <task-details :task="taskDetails" @close="closeDetailsModal" />
    </modal>
    <modal v-if="deleteModalOpened">
      <div class="card">
        <span>Are you sure you want to delete task
          <span class="bold-text">{{ taskToDelete.topic }}</span>?
        </span>
        <div>
          <button @click="closeDeleteModal">Cancel</button>
          <button
            style="background-color: red"
            @click="confirmDeleteTask(taskToDelete.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </modal>
    <modal v-if="editModalOpened">
      <task-form :task="taskToEdit" @close="closeEditDialog" />
    </modal>
    <div class="filter-select">
      <span>Filter by assignee:</span>
      <select v-model="filterByAssigneeId">
        <option v-for="opt in assigneeFilterOptions" :key="opt.id" :value="opt.id">
          {{ opt.name }}
        </option>
      </select>
    </div>
    <v-table
      :modelValue="simpleOverviewData"
      :headers="headers"
      :actions="actions"
      @details="showDetails"
      @delete="deleteTask"
      @edit="editTask"
      @update:modelValue="moveTask"
    />
    <button style="margin: 0.5rem" @click="addTask">Add Task</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/Table.vue';
import Modal from '@/components/Modal.vue';
import TaskDetails from '@/components/TaskDetails.vue';
import TaskForm from '@/components/TaskForm.vue';
import { Task } from '@/store';

export default defineComponent({
  name: 'TaskOverview',
  components: {
    VTable: Table,
    Modal,
    TaskDetails,
    TaskForm,
  },
  data() {
    return {
      headers: ['Topic', 'Assignee name'],
      detailsModalOpened: false,
      selectedTaskId: '',
      filterByAssigneeId: '',
      deleteModalOpened: false,
      taskToDelete: null,
      editModalOpened: false,
      taskToEdit: null,
    };
  },
  computed: {
    simpleOverviewData() {
      // typescript has some problems with computed
      // never used typescript before with options api, so i have no idea what is going on
      // if i use just `this.filterByAssigneeId` i get an error
      const filterBy: string = this.filterByAssigneeId;
      const tasks = filterBy
        ? this.$store.state.tasks.filter((task) => task.assignee === filterBy)
        : this.$store.state.tasks;
      return tasks.map((task) => [
        task.id,
        task.topic,
        this.$store.getters.getUserFullNameById(task.assignee),
      ]);
    },
    actions() {
      return [
        {
          name: 'Details',
          action: 'details',
        },
        {
          name: 'Delete',
          action: 'delete',
        },
        {
          name: 'Edit',
          action: 'edit',
        },
      ];
    },
    taskDetails() {
      const taskId: string = this.selectedTaskId;
      const task = this.$store.getters.getTaskById(taskId);
      return {
        topic: task.topic,
        description: task.description,
        assignee: this.$store.getters.getUserFullNameById(task.assignee),
        reporter: this.$store.getters.getUserFullNameById(task.reporter),
      };
    },
    assigneeFilterOptions() {
      const users = this.$store.state.users
        .map((user) => ({ name: this.$store.getters.getUserFullNameById(user.id), id: user.id }));
      return [{ name: '', id: '' }].concat(users);
    },
  },
  methods: {
    showDetails(id: Task['id']) {
      this.detailsModalOpened = true;
      this.selectedTaskId = id;
    },
    closeDetailsModal() {
      this.detailsModalOpened = false;
      this.selectedTaskId = '';
    },
    moveTask(e: any) {
      if (e.moved) {
        this.$store.dispatch('moveTask', { taskId: e.moved.element[0], newPos: e.moved.newIndex });
      }
    },
    deleteTask(taskId: Task['id']) {
      this.taskToDelete = this.$store.getters.getTaskById(taskId);
      this.deleteModalOpened = true;
    },
    confirmDeleteTask(taskId: Task['id']) {
      this.$store.dispatch('deleteTask', taskId)
        .then(() => this.closeDeleteModal());
    },
    closeDeleteModal() {
      this.deleteModalOpened = false;
      this.taskToDelete = null;
    },
    editTask(taskId: Task['id']) {
      this.editModalOpened = true;
      this.taskToEdit = this.$store.getters.getTaskById(taskId);
    },
    closeEditDialog() {
      this.editModalOpened = false;
      this.taskToEdit = null;
    },
    addTask() {
      this.editModalOpened = true;
      this.taskToEdit = null;
    },
  },
});
</script>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
}
.filter-select {
  margin: 1rem;
}
</style>
