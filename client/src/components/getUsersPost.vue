<template>
    <div>
        <div v-for="post in posts" v-bind:key="post._id">
            <p>{{post.caption}}</p>
        </div>
    </div>
</template>
<script>
import { Api } from '@/Api'
export default {
  name: 'Users-posts',
  data() {
    return {
      users: '',
      posts: []
    }
  },
  created() {
    // user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
  },
  mounted() {
    const jwttoken = {
      token: localStorage.getItem('token')
    }
    fetch('http://localhost:3000/user', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Host: '',
        token: jwttoken.token
      }
    }).then((response) => {
      return response.json()
    }).then((responseData) => {
      this.user = responseData
      console.log(this.user)
      Api.get(`/users/${this.user._id}/posts`).then(response => {
        this.posts = response.data
        console.log(response.data)
      }).catch(function (err) {
        console.log(err)
      })
    }).catch(error => {
      console.error(error)
    })
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/Choice')
    }
  }
}
</script>
<style scoped>

</style>
