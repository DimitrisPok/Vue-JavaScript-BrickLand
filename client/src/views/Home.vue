<template>
  <div>
    <b-jumbotron header="DIT342 Frontend" lead="Welcome to your DIT342 Frontend Vue.js App">
      <b-button class="btn_message" variant="primary" v-on:click="getMessage()" >Get Message from Server</b-button>
      <p>Message from the server:<br/>
      {{ message }}</p>
    </b-jumbotron>
    <div>
     <h1>Hello {{ name }}</h1>
     <h2>Your email {{ email }}</h2>
      <p>
        hello
      </p>
      <my-footer/>
      <button @click="logout">logout</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      name: '',
      email: ''
    }
  },
  created() {
    // user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/SignIn')
    }
  },
  mounted() {
    Api.get('/user', { headers: { token: localStorage.getItem('token') } })
      .then(res => {
        this.name = res.data.user.name
        this.email = res.data.user.email
      })
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
    logout() {
      localStorage.clear()
      this.$router.push('/SignIn')
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
