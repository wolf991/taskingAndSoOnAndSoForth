<template>
  <form class="card" @submit.prevent>
    <div class="input">
      <label>Topic*: </label>
      <input v-model="taskObj.topic" type="text" />
    </div>
    <div class="input">
      <label>Description: </label>
      <input v-model="taskObj.description" type="text" />
    </div>
    <div class="input">
      <label>Reporter*: </label>
      <select v-model="taskObj.reporter">
        <option value=""></option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ `${user.name} ${user.surname}`}}
        </option>
      </select>
    </div>
    <div class="input">
      <label>Assignee*: </label>
      <select v-model="taskObj.assignee">
        <option value=""></option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ `${user.name} ${user.surname}`}}
        </option>
      </select>
    </div>
    <p v-for="err in errors" :key="err" style="color: red; margin: 0;">
      {{ err }}
    </p>
    <div>
      <button @click="$emit('close')">Cancel</button>
      <button @click="save">Save</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { v4 as uuid } from 'uuid';
import { Task } from '@/store';

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<Task>,
      required: false,
    },
  },
  data() {
    const task = this.task
      ? { ...this.task }
      : {
        id: uuid(),
        reporter: '',
        assignee: '',
        topic: '',
        description: '',
      };
    return {
      editMode: !this.taskId,
      // some tasks don't have description
      description: '',
      taskObj: task,
      errors: [] as string[],
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    save() {
      this.errors = [];
      if (!this.taskObj.reporter) {
        this.errors.push('Reporter is required.');
      }
      if (!this.taskObj.assignee) {
        this.errors.push('Assignee is required.');
      }
      if (!this.taskObj.topic) {
        this.errors.push('Topic is required.');
      }
      if (this.errors.length === 0) {
        this.$store.dispatch('updateTask', this.taskObj)
          .then(() => this.$emit('close'))
          .catch((err) => {
            console.error(err);
            this.$emit('close');
          });
      }
    },
  },
});
</script>
