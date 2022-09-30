<template>
    <div>
        <input type="name" placeholder="name" v-model="name" required pattern="\S(.*\S)?" title="This field is required"/> <br/>
        <input type="password" placeholder="password" v-model="password" required pattern="\S(.*\S)?" title="This field is required"/> <br/>
        <input type="text" placeholder="email" v-model="email" required pattern="\S(.*\S)?" title="This field is required"/> <br/>
        <button @click="signup">signup</button>
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
