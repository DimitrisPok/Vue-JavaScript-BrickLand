<template>
    <div>
        <input type="name" placeholder="name" v-model="name" required pattern="\S(.*\S)?" title="This field is required"/> <br/>
        <input type="password" placeholder="password" v-model="password" required pattern="\S(.*\S)?" title="This field is required"/> <br/>
        <input type="text" placeholder="email" v-model="email" required pattern="\S(.*\S)?" title="This field is required"/> <br/>
        <button @click="signup">admin signup</button>
        {{ error }}
    </div>
</template>

<script>
import { Api } from '../Api'

export default {
  name: 'adminsignup',
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
      const newAdmin = {
        adminName: this.name,
        password: this.password,
        email: this.email
      }
      console.log(newAdmin)
      Api.post('/adminSignup', newAdmin)
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token)
            this.$router.push('/adminHome')
          }
          console.log(res)
          this.error = ''
        }, err => {
          console.log(err.response)
          this.error = err.response.data.error
        })
    }
  }
}
</script>
