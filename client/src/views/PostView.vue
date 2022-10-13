<template>
<div>
  <br>
  <br>
  <div id="nav" class="navigation">
  <img src="/Users/sadhanaanandan/group-21-web/group-21-web/client/src/views/htmlPics/lego-head.png">
      <router-link class="homeNav" to="/posts">| Posts </router-link>
      <router-link class="homeNav" to="/post">| Post </router-link>
      <router-link class="homeNav" to="/Profile">| Profile </router-link>
      <b-button variant="primary" @click="logout">Log out</b-button>
      </div>
    <h1>{{ post.caption }}</h1>
    <div class="center">
      <div class="d-flex flex-wrap">
      <b-card width="340px" hover>
        <div class="video-box">
          <h3>Posted by: {{ id }}</h3>
          <p>Posted at: {{ post.createdAt }}</p>
          <p>Last updated at: {{ post.updatedAt }}</p>
          <br />
          <img v-bind:src="require(`@/assets/${post.img}`)" alt="...">
          <br />
          <div>
            <h3>You can recreate the model by following the instructions:</h3>
            <br />
            <p>{{ post.instructions }}</p>
          </div>
        </div>
        <v-spacer></v-spacer>
      </b-card>
      <Create-A-Review/>
      <get-reviews />
    </div>
    </div>
    <!-- Render the content of the current page view -->
    <router-view />
  </div>
</template>

<script>
import { Api } from '../Api'
import getReviews from '../components/getReviews.vue'
import CreateAReview from '../components/CreateAReview.vue'

export default {
  name: 'posts-view',
  components: { getReviews, CreateAReview },
  data() {
    return {
      id: this.$route.params.id,
      post: {}
    }
  },
  created() {
    // user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/')
    }
  },
  mounted() {
    this.getPost()

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
    })
      .then((response) => {
        return response.json()
      })
      .then((responseData) => {
        this.user = responseData
        console.log(this.user)
        console.log(jwttoken)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  methods: {
    getPost() {
      Api.get('/posts/' + this.$route.params.id)
        .then((response) => {
          this.post = response.data
          console.log(this.post)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    logout() {
      localStorage.clear()
      this.$router.push('/')
    }
  }
  /* computed: {
    currentPost() {
      return Api.get('/posts/.id')._id === this.$route.params.id
    }
  } */
}
</script>

<style scoped lang="scss">
.b-card {
  .video-box {
    border: 1px solid rgb(44, 10, 146);
    border-radius: 10px;
    margin: 10px;
    padding: 10px;

    text-align: left;

    display: flex;
    justify-content: flex-start;
  }
}
.card {
  width: 1500px;
  display: flex;
  border: 1px solid rgb(108, 45, 233);
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 10px;
  padding: 10px;
  text-align: left;
  img {
    border: 1px solid rgb(107, 104, 109);
    border-radius: 4px;
    padding: 5px;
    width: 400px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  display: flex;
  justify-content: flex-start;
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

.navigation {
  text-align: left;
  background-color: rgb(25, 39, 34);
}
.homeNav {
  color: bisque;
}

.review {
  font-family: 'Courier New', Courier, monospace;
}
@media (min-width: 360px) and (max-height: 1000px) {
  .card {

    img {
      width: 100px;
      text-align: center;
    }
  }

  .review {
    margin-right: auto !important;
    margin-left: auto !important;
    text-align: center !important;
  }

  .video-box {
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .b-card{
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
  }

.center {
    width: 100% !important;
    height: 100%;
    margin-left: auto !important;
    margin-right: auto !important;
    text-align: center !important;
}

  }
</style>
