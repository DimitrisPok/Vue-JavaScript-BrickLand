<template>
  <div>
    <br>
    <br>
    <br>
    <div id="nav" class="navigation">
      <img src="@/views/htmlPics/lego-head.png">
      <router-link class="homeNav" to="users">| Users </router-link>
      <router-link class="homeNav" to="/AdminPosts">| Posts </router-link>
      <router-link class="homeNav" to="/AdminPost">| Post </router-link>
      <router-link class="homeNav" to="/AdminProfile">| Profile </router-link>
      <b-button variant="primary" @click="logout">Log out</b-button>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
    <h1 class="display-4" ma-4 d-flex justify-center>
      All Posts
    </h1>
        <p>Here Is The Feed:</p>
        <b-button variant="danger" @click="deleteAllPosts">Delete all posts</b-button> <br/>
           <div class="d-flex flex-wrap">
            <div v-for="post in posts" v-bind:key="post._id">
              <b-card width="340px" hover>
                <div class="video-box">
                  <div>
                  <router-link :to="{ name: 'posts-view', params: {id: post._id }}">
                  <h3 v-html="post.caption"></h3>
                  </router-link>
              <post-item v-bind:post="post" v-on:del-post="deletePost" />
              </div>
              </div>
              <v-spacer></v-spacer>
              </b-card>
          </div>
      </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import PostItem from '../components/PostItem.vue'

export default {
  name: 'posts',
  props: ['post'],
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
  computed: {
    imagePath() {
      return Api.get('/posts' + 'uploads/{this.posts.img}')
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
          this.posts.splice(index, 1)
          console.log(index)
        })
        .catch(error => {
          console.log(error)
        })
    },
    logout() {
      localStorage.clear()
      this.$router.push('/')
    },
    deleteAllPosts() {
      Api.delete('/posts').then((res) => {
        console.log(res)
        this.$bvModal.msgBoxOk('All posts have been successfully deleted!')
      }).catch((error) => {
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
    width: 340px;
    .video-box{
      border: 1px solid rgb(25, 39, 34);
      border-radius: 10px;
      margin: 10px;
      padding: 10px;

      text-align: left;

      display: flex;
      justify-content: flex-start;
    }
  }

  .card {
    width: 340px;
    height: 340px;
    display: flex;
    border: 1px solid rgb(25, 39, 34);
      border-radius: 10px;
      margin: 10px;
      padding: 10px;

      text-align: left;

  }
  .deletePosts{
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
.logOutB {
  background-color: grey;
  border-color: gray;
}
</style>
