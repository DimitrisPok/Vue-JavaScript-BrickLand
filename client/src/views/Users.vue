<template>
    <div>
        <p>Here are my users:</p>
        <div v-for="user in users" v-bind:key="user._id">
            <user-item v-bind:user="user" v-on:del-user="deleteUser"/>
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

<style scoped>
p {
    background-color: rgb(241, 147, 214);
}
</style>
