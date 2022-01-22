<template>
  <table>
    <tr>
      <th v-for="h in computedHeaders" :key="h"> {{ h }}</th>
    </tr>
    <draggable
      :modelValue="modelValue"
      :item-key="(item) => item[0]"
      @change="(value) => $emit('update:modelValue', value)"
      tag="tbody"
    >
      <template #item="{ element }">
        <tr>
          <td v-for="cell in element.slice(1)" :key="cell">
            {{ cell }}
          </td>
          <td v-if="actions.length > 0">
            <button
              v-for="action in actions"
              :key="action.name"
              @click="$emit(action.action, element[0])"
            >
              {{ action.name }}
            </button>
          </td>
        </tr>
      </template>
    </draggable>
  </table>
</template>

<script lang="ts">
/*
  props.data is a list(rows) of lists(cells)
  the first item of the second list is an id of the row
*/
import { defineComponent, PropType } from 'vue';
import Draggable from 'vuedraggable';

export default defineComponent({
  components: {
    Draggable,
  },
  props: {
    headers: {
      type: Array as PropType<string[]>,
      required: true,
    },
    modelValue: {
      type: Array as PropType<string[][]>,
      required: true,
    },
    actions: {
      type: Array as PropType<{action: string, name: string}[]>,
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
