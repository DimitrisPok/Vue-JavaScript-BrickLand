<template>
<div>
    <h1>{{ post.caption }}</h1>
    <div class="d-flex flex-wrap">
              <b-card width="340px" hover>
                <div class="video-box">
                  <img src="https://img.icons8.com/dusk/64/000000/lego-head.png"/>
                  <h3>Here is how you can recreate this post: {{ post.instructions }}</h3>
              </div>
              <v-spacer></v-spacer>
              </b-card>
              <Create-A-Review/>
              <get-reviews/>
          </div>
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
      this.$router.push('/login')
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

<style scoped lang="scss">
  .b-card{
    .video-box{
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
     width: 1500px;;
    display: flex;
    border: 1px solid rgb(108, 45, 233);
      border-radius: 10px;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.50);
      margin: 10px;
      padding: 10px;
      text-align: left;
      display: flex;
      justify-content: flex-start;
  }
</style>

<style scoped>
</style>
