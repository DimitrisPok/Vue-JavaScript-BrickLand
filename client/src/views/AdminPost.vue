<template>
<div>
   <div id="nav" class="navigation">
    <br>
      <br>
      <br>
      <img src="/Users/sadhanaanandan/group-21-web/group-21-web/client/src/views/htmlPics/lego-head.png">
      <router-link class="homeNav" to="users">| Users </router-link>
      <router-link class="homeNav" to="/AdminPosts">| Posts </router-link>
      <router-link class="homeNav" to="/AdminPost">| Post </router-link>
      <router-link class="homeNav" to="/AdminProfile">| Profile </router-link>
      <b-button variant="primary" @click="logout">Log out</b-button>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  <h1>Hello Admin! Want to add your own creation?</h1>
  <br/>
  <br/>
  <Create-A-Post/>
</div>

</template>

<script>

import CreateAPost from '../components/CreateAPost.vue'

export default {
  name: 'adminpost',
  components: {
    CreateAPost
  },
  created() {
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
h1{
  color: black;
}
img {
  display: left;
  margin-left: auto;
  margin-right: auto;
  max-width: 10%;
  max-height: 10%;
}

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
