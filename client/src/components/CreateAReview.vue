<template>
<body class="center">
  <h1 class="center">Have something to say? Add a review!</h1>
    <div>
      <b-form-input class="center" v-model="comment" placeholder="Enter the comment"></b-form-input>
            <b-button class="postButton" @click="createReview">Post Review</b-button>
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
  name: 'create-a-review',
  data() {
    return {
      reviews: []
    }
  },
  methods: {
    createReview() {
      const newReview = {
        comment: this.comment
      }
      Api.post('/posts/' + this.$route.params.id + '/reviews', newReview)
        .then(response => {
          this.newReview = response.data
          console.log(response.data)
        })
      console.log(newReview)
    }
  }
}
</script>

<style scoped>
.center {
  text-align: center;
}

</style>
