<template>
<body class="center">
  <h1 class="center">Please Fill in The Following Fields</h1>
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
  methods: {
    createPost() {
      const newPost = {
        caption: this.caption,
        instructions: this.instructions,
        img: this.img
      }
      Api.post('/posts', newPost)
        .then(response => {
          this.newPost = response.data
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

</style>
