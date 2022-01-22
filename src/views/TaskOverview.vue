<template>
  <div class="content-container">
    <modal v-if="detailsModalOpened">
      <task-details :task="taskDetails" @close="closeDetailsModal" />
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
      :headers="headers"
      :data="simpleOverviewData"
      :actions="actions"
      @details="showDetails"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/Table.vue';
import Modal from '@/components/Modal.vue';
import TaskDetails from '@/components/TaskDetails.vue';
import { Task } from '@/store';

export default defineComponent({
  name: 'TaskOverview',
  components: {
    VTable: Table,
    Modal,
    TaskDetails,
  },
  data() {
    return {
      headers: ['Topic', 'Assignee name'],
      detailsModalOpened: false,
      selectedTaskId: '',
      filterByAssigneeId: '',
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
        task.topic,
        this.$store.getters.getUserFullNameById(task.assignee),
      ]);
    },
    actions() {
      return this.$store.state.tasks.map((task) => [{
        name: 'Details',
        action: 'details',
        data: task.id,
      }]);
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
