<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home </router-link>
      <router-link to="/SignIn">| Sign In </router-link>
      <router-link to="/login">| Log In </router-link>
      <router-link to="users">| Users </router-link>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
