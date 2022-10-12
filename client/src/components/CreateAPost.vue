<template>
<body class="center">
  <h1 class="centerTitle">Add your Post's details:</h1>
    <div>
      <b-form-input class="center" v-model="caption" placeholder="Enter the caption"></b-form-input>
      <b-form-input class="center" v-model="instructions" placeholder="Enter the instructions"></b-form-input>
      <b-form-input class="center" v-model="img"  placeholder="Paste the image link here"></b-form-input>
            <b-button class="postButton" @click="createPost"> Create New Post</b-button>
          </div>
     <br/>
</body>
</template>

<script>
/*
  <form method="POST" action="posts" enctype="multipart/form-data">
      <input type="file" name="img">
      <input type="submit">
    </form>
    <b-form-input v-model="caption" placeholder="Enter the caption"></b-form-input>
    <b-form-input v-model="instructions" placeholder="Enter the instructions"></b-form-input>
     <b-form-file v-model="img" class="mt-3" plain></b-form-file>
    <b-button v-on:click="createPost"> Create New Post</b-button>
    <b-button class="postButton" @click="createPost()"> Create New Post</b-button>
  */
// import { object } from 'webidl-conversions'
import { Api } from '@/Api'

export default {
  name: 'create-a-post',
  data() {
    return {
      caption: '',
      instructions: '',
      img: ''
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
    createPost() {
      const newPost = {
        caption: this.caption,
        instructions: this.instructions,
        img: this.img
      }
      Api.post(`/users/${this.user._id}/posts/image`, newPost)
        .then(response => {
          this.newPost = response.data
          this.stores = []
          this.stores.push(newPost)
          console.log(response.data)
        })
      console.log(newPost)
    }
  }
}
</script>

<style scoped>
.center {
  text-align: center;
}
.centerTitle {
  text-align: center;
  background-color: bisque;
}
</style>
