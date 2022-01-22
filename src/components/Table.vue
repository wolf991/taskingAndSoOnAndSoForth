<template>
  <table>
    <tr>
      <th v-for="h in computedHeaders" :key="h"> {{ h }}</th>
    </tr>
    <tr v-for="(row, i) in data" :key="getKey(row)">
      <td v-for="cell in row" :key="cell">
        {{ cell }}
      </td>
      <td v-if="actions.length > 0">
        <button
          v-for="action in actions[i]"
          :key="action.name"
          @click="$emit(action.action, action.data)"
        >
          {{ action.name }}
        </button>
      </td>
    </tr>
  </table>
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
  computed: {
    computedHeaders() {
      if (this.actions.length > 0) {
        return this.headers.concat(['Actions']);
      }
      return this.headers;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #ddd;
}

th, td {
  text-align: left;
  padding: 16px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
