<template>
  <div>
    <div>
     <h1>Hello {{ name }}</h1>
     <h2>Your email is {{ email }}</h2>
      <button @click="logout">logout</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'adminhome',
  data() {
    return {
      name: '',
      email: ''
    }
  },
  created() {
    // user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/adminChoice')
    }
  },
  mounted() {
    Api.get('/admin', { headers: { token: localStorage.getItem('token') } })
      .then(res => {
        this.name = res.data.admin.adminName
        this.email = res.data.admin.email
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
      this.$router.push('/adminChoice')
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
