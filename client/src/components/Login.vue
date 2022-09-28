<template>
    <div>
       EMAIL: <input type="text" v-model="email" required pattern="\S(.*\S)?" title="This field is required"/> <br/>
       PASSWORD: <input type="password" v-model="password" required pattern="\S(.*\S)?" title="This field is required"/> <br/>
       <button @click="login">login</button>
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
            this.$router.push('/')
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
