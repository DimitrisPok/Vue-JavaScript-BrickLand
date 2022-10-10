<template>
  <div id="app">
    <div id="nav" class="navigation">
      <img src="@/htmlPics/lego-head.png"><router-link class="homeNav" to="/Home">Home </router-link>
      <router-link class="homeNav" to="/SignUp">| Sign Up </router-link>
      <router-link class="homeNav" to="/login">| Log In </router-link>
      <router-link class="homeNav" to="users">| Users </router-link>
      <router-link class="homeNav" to="/posts">| Posts </router-link>
      <router-link class="homeNav" to="/post">| Post </router-link>
      <router-link class="homeNav" to="/reviews">| Reviews </router-link>
      <router-link class="homeNav" to="/Choice">| Choice </router-link>
      <router-link class="homeNav" to="/Profile">| Profile </router-link>
      <router-link class="homeNav" to="/adminChoice">| Admin </router-link>
      <router-link class="homeNav" to="/adminHome">| Admin Home </router-link>
      <router-link class="homeNav" to="/adminProfile">| Admin profile </router-link>
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
.navigation{
  text-align: left;
  background-color: rgb(25, 39, 34);
}
.homeNav{
  color: bisque;
}
</style>
