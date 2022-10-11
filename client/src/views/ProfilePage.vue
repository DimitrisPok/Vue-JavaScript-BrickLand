<template>
    <div>
      <div id="nav" class="navigation">
      <br>
      <br>
      <br>
      <img src="@/htmlPics/lego-head.png">
      <router-link class="homeNav" to="/posts">| Posts </router-link>
      <router-link class="homeNav" to="/post">| Post </router-link>
      <router-link class="homeNav" to="/Profile">| Profile </router-link>
      <button @click="logout">Log out</button>
    </div>
      <div>
        <br>
      <br>
      <br>
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
      this.$router.push('/')
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
    },
    logout() {
      localStorage.clear()
      this.$router.push('/')
    }
  }
}

</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navigation{
  text-align: left;
  background-color: rgb(25, 39, 34);
}
.homeNav{
  color: bisque;
}
</style>
