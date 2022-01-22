<template>
  <div>
    <modal v-if="detailsModalOpened">
      <task-details :task="taskDetails" @close="closeDetailsModal" />
    </modal>
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
    };
  },
  computed: {
    simpleOverviewData() {
      return this.$store.state.tasks.map((task) => [
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
