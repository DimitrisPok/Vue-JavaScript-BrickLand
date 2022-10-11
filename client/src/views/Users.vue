<template>
    <div>
      <br>
    <br>
    <br>
    <div id="nav" class="navigation">
      <img src="@/htmlPics/lego-head.png">
      <router-link class="homeNav" to="users">| Users </router-link>
      <router-link class="homeNav" to="/AdminPosts">| Posts </router-link>
      <router-link class="homeNav" to="/post">| Post </router-link>
      <router-link class="homeNav" to="/AdminProfile">| Profile </router-link>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
        <h1>Here are the users:</h1>
        <div class="video-container">
           <div v-for="user in users" v-bind:key="user._id">
            <div class="video-box">
              <img src="https://img.icons8.com/material/24/000000/youtube-play--v1.png"/>
              <div>
                <user-item v-bind:user="user" v-on:del-user="deleteUser"/>
              </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { Api } from '../Api'
import UserItem from '../components/UserItem.vue'

export default {
  components: { UserItem },
  props: ['user', 'post'],
  mounted() {
    console.log('Page is loaded')
    // load the real users from the server
    Api.get('/users')
      .then(response => {
        this.users = response.data.users
        console.log(response.data)
      })
      .catch(error => {
        console.error(error)
      })
      /* .then(() => {
        // This code is always executed at the end. After success or failure.
      }) */
  },
  data() {
    return {
      users: []
    }
  },
  methods: {
    deleteUser(id) {
      Api.delete(`/users/${id}`)
        .then(response => {
          const index = this.users.findIndex(user => user._id === id)
          this.users.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>

<style scoped lang="scss">
  .video-container{
    .video-box{
      border: 1px solid rgb(108, 45, 233);
      border-radius: 10px;
      margin: 10px;
      padding: 10px;

      text-align: left;

      display: flex;
      justify-content: flex-start;
    }
  }
  .card {
    width: 500px;
    height: 340px;
    display: flex;
    border: 1px solid rgb(108, 45, 233);
      border-radius: 10px;
      margin: 10px;
      padding: 10px;

      text-align: left;

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

<style scoped>

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
