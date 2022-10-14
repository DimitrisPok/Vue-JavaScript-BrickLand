<template>
    <div>
      <div id="nav" class="navigation">
      <br>
      <br>
      <br>
      <img src="@/views/htmlPics/lego-head.png">
      <router-link class="homeNav" to="/posts">| Posts </router-link>
      <router-link class="homeNav" to="/post">| Post </router-link>
      <router-link class="homeNav" to="/Profile">| Profile </router-link>
      <b-button class="logOutB"  variant="primary" @click="logout">Log out</b-button>
    </div>
    <div class="details">
      <h1>Hello {{ user.name }}!</h1>
      <p class="urPost">Your details:</p>
      <p>Email: {{ user.email }}</p>
      <p>Created account on: {{user.entryDate}}</p>
    </div>
    <div class="details">
        <p class="urPost">Your Posts:</p>
        <div>
        <users-posts/>
        </div>
        </div>
        <div class="editFields">
      <p class="urPost">Enter The Details That You Want To Change Below:</p>
      <input type="name" placeholder="name" v-model="name" /> <br />
      <input type="password" placeholder="password" v-model="password" /> <br />
      <input type="text" placeholder="email" v-model="email" /> <br />
      <p>             ㅤ        </p>
      </div>

      <b-button id = "updateUser" @click="updateUser">update</b-button> <br/><br>
      <b-button id = "deleteUser" @click="deleteUser">delete account</b-button> <br/>
        <br>
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
#deleteUser{
  background-color: rgb(152, 47, 47);
}
#updateUser{
  color: bisque;
  background-color: rgb(18, 43, 18);
}
.editFields{
  background-color: bisque;
}
.urPost {
  background-color: rgb(18, 43, 18);
  color: bisque;
}
.details {
  background: bisque;
}
.logOutB {
  background-color: grey;
}
</style>
