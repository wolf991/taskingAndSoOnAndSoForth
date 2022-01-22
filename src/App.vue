<template>
  <div id="nav">
    <router-link to="/tasks">Task Overview</router-link> |
  </div>
  <router-view id="main-content" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#main-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid black;
  background-color: white;
}
.bold-text {
  font-weight: bolder;
}
.details-container {
  display: flex;
  flex-direction: column;
  margin: 1rem;
}
.details-row {
  display: flex;
  margin: 0.5rem;
}
.input {
  padding: 0.5rem;
}
</style>
