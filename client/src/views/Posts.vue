<template>
    <div>
      <h1>Brick Land</h1>
        <p>Here Is The Feed:</p>
        <div class="video-container">
           <div v-for="post in posts" v-bind:key="post._id">
            <div class="video-box">

               <img :src="posts.img"/>
            <div>
          <post-item v-bind:post="post" v-on:del-post="deletePost" />
        </div>
            </div>
        </div>
        </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import PostItem from '../components/PostItem.vue'

export default {
  name: 'posts',
  components: { PostItem },
  mounted() {
    console.log('Page is ready')
    Api.get('/posts').then(response => {
      console.log(response.data.post)
      this.posts = response.data.post
      console.log(response.data.posts)
    })
      .catch(error => {
        console.error(error)
      })
  },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
    deletePost(id) {
      Api.delete(`/posts/${id}`)
        .then(response => {
          const index = this.posts.findIndex(post => post._id === id)
          this.posts.slice(index, 1)
          console.log(index)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
p {
  background-color: bisque;
}

.btn_message{
  margin-bottom: 1em;
}
</style>

<style scoped lang="scss">
  .video-container{
    .video-box{
      border: 1px solid rgb(108, 45, 233);
      border-radius: 10px;
      margin: 10px;
      padding: 10px;

      text-align: left;

      display: flex;
      justify-content: flex-start;
    }
  }
</style>
