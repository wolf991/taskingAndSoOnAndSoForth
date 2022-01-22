<template>
  <div class="card">
    <div class="details-container">
      <div class="details-row">
        <span>Topic: </span><span class="bold-text">{{ task.topic }}</span>
      </div>
      <div class="details-row">
        <span>Reporter: </span><span class="bold-text">{{ task.reporter }}</span>
      </div>
      <div class="details-row">
        <span>Assignee: </span><span class="bold-text">{{ task.assignee }}</span>
      </div>
      <div class="details-row">
        <span>Description: </span><span class="bold-text">{{ task.description ?? '/' }}</span>
      </div>
      <button @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script lang='ts'>
import { Task } from '@/store';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
});
</script>
