<template>
<div>
    <h1>Hello! Let's view a post</h1>
    <h3>{{ post }}</h3>
    <h3>{{ post.caption }}</h3>
    <p>{{ post.review }}</p>
     <h3>{{ this.$route.params.id }}</h3>
</div>
</template>

<script>
import { Api } from '../Api'
// import Posts from '../views/Posts.vue'

export default {
  name: 'posts-view',
  data() {
    return {
      id: this.$route.params.id,
      post: {}
    }
  },
  mounted() {
    this.getPost()
  },
  methods: {
    getPost() {
      Api.get('/posts/' + this.$route.params.id)
        .then(response => {
          this.post = response.data
          console.log(this.post)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
  /* computed: {
    currentPost() {
      return Api.get('/posts/.id')._id === this.$route.params.id
    }
  } */
}
</script>

<style>

</style>
