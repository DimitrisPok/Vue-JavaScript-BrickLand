<template>
  <div>
    <br>
    <br>
    <br>
    <div id="nav" class="navigation">
      <img src="@/views/htmlPics/lego-head.png">
      <router-link class="homeNav" to="users">| Users </router-link>
      <router-link class="homeNav" to="/AdminPosts">| Posts </router-link>
      <router-link class="homeNav" to="/post">| Post </router-link>
      <router-link class="homeNav" to="/AdminProfile">| Profile </router-link>
      <b-button variant="primary" @click="logout">Log out</b-button>
    </div>
    <br>
    <input type="adminName" placeholder="adminName" v-model="adminName" required/> <br />
    <input type="password" placeholder="password" v-model="password" required/> <br />
    <input type="text" placeholder="email" v-model="email" required/> <br />
    <br>
    <b-button @click="updateAdmin">update</b-button> <br />
    <br>
    <b-button class="deleteAcc" @click="deleteAdmin">delete account</b-button> <br />
    <br/>
    <b-button class = "deletePosts" @click="deleteAllPosts">delete all the posts</b-button> <br />
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'profilePage',
  data() {
    return {
      adminName: '',
      password: '',
      email: '',
      admin: {}
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
    fetch('http://localhost:3000/admin', {
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
      this.admin = responseData
      console.log(this.admin)
      console.log(jwttoken)
    }).catch(error => {
      console.error(error)
    })
  },
  isDisabled() {
    return this.adminName.length > 0
  },
  methods: {
    updateAdmin() {
      const newAdmin = {
        adminName: this.adminName || this.admin.adminName,
        password: this.password || this.admin.password,
        email: this.email || this.admin.email
      }
      Api.put(`/admins/${this.admin._id}`, newAdmin).then((res) => {
        console.log(res)
        this.$router.push('/adminhome', this.$router.go(0))
        // localStorage.clear()
      })
    },
    deleteAdmin() {
      Api.delete(`/admins/${this.admin._id}`)
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
.deleteAcc {
  background-color: rgb(152, 47, 47);
}
.deletePosts {
  background-color: rgb(152, 47, 47);
}

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
