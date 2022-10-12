<template>
<div>
   <div id="nav" class="navigation">
    <br>
    <br>
    <br>
      <img src="@/htmlPics/lego-head.png">
      <router-link class="homeNav" to="/posts">| Posts </router-link>
      <router-link class="homeNav" to="/post">| Post </router-link>
      <router-link class="homeNav" to="/Profile">| Profile </router-link>
      <button @click="logout">Log out</button>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  <h1>Hello! Ready to share your fabulous lego model?</h1>
  <br/>
  <br/>
  <Create-A-Post/>
</div>

</template>

<script>

import CreateAPost from '../components/CreateAPost.vue'

export default {
  name: 'post',
  components: {
    CreateAPost
  },
  created() {
    // user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/')
    }
  },
  methods: {
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
.navigation {

}
.homeNav{
  color: bisque;
  text-align: left;
  background-color: rgb(25, 39, 34);
}
</style>
