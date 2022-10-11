<template>
    <div class="page">
    <div class="header">
      <h1>Welcome to Brick Land</h1>
    </div>
          <h2>Login</h2>
       <input type="text" placeholder="email" v-model="email" required pattern="\S(.*\S)?" title="This field is required"/> <br/>
       <input type="password" placeholder="password" v-model="password" required pattern="\S(.*\S)?" title="This field is required"/> <br/>
       <b-button @click="login">Login</b-button>
       {{ error }}
    </div>
</template>

<script>
import { Api } from '../Api'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',

      error: ''
    }
  },
  methods: {
    login() {
      const user = {
        email: this.email,
        password: this.password
      }
      Api.post('/login', user)
        .then(res => {
        // if successful
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token)
            this.$router.push('/posts')
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
