<template>
    <div>
      <div>
    <input type="name" placeholder="name" v-model="name" /> <br />
    <input type="password" placeholder="password" v-model="password" /> <br />
    <input type="text" placeholder="email" v-model="email" /> <br />
    <button @click="updateUser">update</button> <br/>
    <button @click="deleteUser">delete account</button> <br/>
  </div>
  <div>
        <users-posts/>
        </div>
        </div>
</template>

<script>
import { Api } from '@/Api'
import UsersPosts from '../components/getUsersPost.vue'
export default {
  components: { UsersPosts },
  name: 'profile',
  data() {
    return {
      reviews: [],
      name: '',
      password: '',
      email: '',
      user: {}
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
      console.log(jwttoken)
    }).catch(error => {
      console.error(error)
    })
  },
  methods: {
    updateUser() {
      const newUser = {
        name: this.name || this.user.name,
        password: this.password || this.user.password,
        email: this.email || this.user.email
      }
      Api.patch(`/users/${this.user._id}`, newUser).then(
        (res) => {
          console.log(res)
        }
      )
    },
    deleteUser() {
      Api.delete(`/users/${this.user._id}`)
        .then((res) => {
          localStorage.clear()
          console.log(res)
          this.$router.push('/login', this.$router.go(0))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

</script>

<style scoped></style>
