<template>
    <div>
        <h1>Here are my users:</h1>
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
  name: 'users',
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
</style>

<style scoped>
p {
    background-color: rgb(89, 89, 231);
}
</style>
