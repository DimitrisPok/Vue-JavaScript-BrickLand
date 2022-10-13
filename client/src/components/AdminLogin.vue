<template>
    <div class="page">
    <div class="header">
      <br/>
      <br/>
      <br/>
      <h1>Welcome to Brick Land</h1>
    </div>
          <h2>Admin Login</h2>
       <input type="text" placeholder="email" v-model="email" required pattern="\S(.*\S)?" title="This field is required"/> <br/>
       <input type="password" placeholder="password" v-model="password" required pattern="\S(.*\S)?" title="This field is required"/> <br/>
       <b-button @click="login">Admin Login</b-button>
       {{ error }}
    </div>
</template>

<script>
import { Api } from '../Api'

export default {
  name: 'adminlogin',
  data() {
    return {
      email: '',
      password: '',

      error: ''
    }
  },
  methods: {
    login() {
      const admin = {
        email: this.email,
        password: this.password
      }
      Api.post('/adminLogin', admin)
        .then(res => {
        // if successful
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token)
            this.$router.push('/AdminPosts')
          }
          console.log(res)
        }, err => {
          console.log(err.response)
          this.error = err.response.data.error
        })
    }
  }
}
</script>
<style>
.header {
  text-align: center;
  color: bisque;
  background-color: rgb(25, 39, 34);
}
.page {
  background-color: bisque;
}
.button1 {
 float: center;
}

</style>
