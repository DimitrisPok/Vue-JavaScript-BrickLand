<template>
    <div class="page">
    <div class="header">
      <h1>Welcome to Brick Land</h1>
    </div>
        <h2>Sign Up</h2>
        <input type="name" placeholder="name" v-model="name" required pattern="\S(.*\S)?" title="This field is required"/> <br/>
        <input type="password" placeholder="password" v-model="password" required pattern="\S(.*\S)?" title="This field is required"/> <br/>
        <input type="text" placeholder="email" v-model="email" required pattern="\S(.*\S)?" title="This field is required"/> <br/>
        <b-button @click="signup">SignUp</b-button>
        {{ error }}
    </div>
</template>

<script>
import { Api } from '../Api'

export default {
  name: 'signup',
  data() {
    return {
      name: '',
      password: '',
      email: '',

      error: ''
    }
  },
  methods: {
    signup() {
      const newUser = {
        name: this.name,
        password: this.password,
        email: this.email
      }
      console.log(newUser)
      Api.post('/signup', newUser)
        .then(res => {
          console.log(res)
          this.error = ''
          // this.$router.push('/login')
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
