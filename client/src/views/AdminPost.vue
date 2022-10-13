<template>
  <div>
    <div id="nav" class="navigation">
      <br />
      <br />
      <br />
      <img src="@/views/htmlPics/lego-head.png" />
      <router-link class="homeNav" to="users">| Users </router-link>
      <router-link class="homeNav" to="/AdminPosts">| Posts </router-link>
      <router-link class="homeNav" to="/AdminPost">| Post </router-link>
      <router-link class="homeNav" to="/AdminProfile">| Profile </router-link>
      <b-button variant="primary" @click="logout">Log out</b-button>
    </div>
    <router-view />
    <h1>Hello Admin! Want to add your own creation?</h1>
    <br />
    <br />
    <div>
      <b-form-input class="center" v-model="caption" placeholder="Enter the caption"></b-form-input>
      <b-form-input class="center" v-model="instructions" placeholder="Enter the instructions"></b-form-input>
      <input type="file" id="itemFile" v-on:change="readImage()" />
      <b-button class="postButton" @click="createPost">
        Create New Post</b-button
      >
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'adminpost',
  components: {
  },
  data() {
    return {
      caption: '',
      instructions: '',
      img: ''
    }
  },
  created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
  },
  methods: {
    createPost() {
      const newPost = {
        caption: this.caption,
        instructions: this.instructions,
        img: this.img
      }
      Api.post('/posts', newPost).then(
        (response) => {
          this.newPost = response.data
          this.stores = []
          this.stores.push(newPost)
          console.log(response.data)
        }
      )
      console.log(newPost)
    },
    readImage() {
      const file = document.getElementById('itemFile')
      console.log(file.value)
      this.img = file.value.split(/(\\|\/)/g).pop()
    },
    logout() {
      localStorage.clear()
      this.$router.push('/')
    }
  }
}

</script>

<style scoped>
h1 {
  color: black;
}
img {
  display: left;
  margin-left: auto;
  margin-right: auto;
  max-width: 10%;
  max-height: 10%;
}

  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navigation {
  text-align: left;
  background-color: rgb(25, 39, 34);
}
.homeNav {
  color: bisque;
}
</style>
