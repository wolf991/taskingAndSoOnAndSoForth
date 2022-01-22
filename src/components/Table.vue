<template>
  <div class="table">
    <div v-for="(row, i) in data" :key="getKey(row)" class="row">
      <div v-for="cell in row" :key="cell" class="cell">
        {{ cell }}
      </div>
      <div v-for="action in actions[i]" :key="action" class="cell action">
        <button @click="$emit(action.action, action.data)">{{ action.name }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    headers: {
      type: Array as PropType<string[]>,
      required: true,
    },
    data: {
      type: Array as PropType<string[][]>,
      required: true,
    },
    actions: {
      type: Array as PropType<{action: string, name: string, data: unknown}[][]>,
      default: () => [],
    },
  },
  methods: {
    getKey(row: string[]) {
      return row.join('-');
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table,
.row,
.cell {
  display: flex;
}
.table {
  flex-direction: column;
}
.cell {
  border: 1px solid gray;
  padding: 1rem;
}
</style>
