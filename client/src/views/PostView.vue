<template>
<div>
  <br>
  <br>
  <br>
  <div id="nav" class="navigation">
      </div>
    <h1>{{ post.caption }}</h1>
    <div>
      <div class="d-flex flex-wrap">
      <b-card width="340px" hover>
        <div class="video-box">
          <p>Posted at: {{ post.createdAt }}</p>
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
      <get-reviews class="center"/>
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
  border: 1px solid rgb(25, 39, 34);
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
  margin-right: auto !important;
  margin-left: auto !important;
  text-align: center !important;
}

.center {
  width: 100%;
}
@media (min-width: 420px) and (max-width: 768px) {

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
    align-items: center !important;
  }

  .b-card{
    width: 100%;
    height: 100%;
    align-content: center;
  }

.center {
    width: 100% !important;
    margin-left: auto !important;
    margin-right: auto !important;
    text-align: center !important;
}
  }
  .logOutB {
  background-color: gray;
  border-color: gray;
}
</style>
