<template>
<div class="topnav">
  <input type="text"
  placeholder="Search.."
  v-model="searchValue"
  class="search-input"/>

<div v-for="(post, index) in postsLists()" :key="index">
    {{post.caption}}
</div>
</div>

</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'search-post',

  components: {},
  data: () => {
    return {
      searchValue: '',
      posts: []
    }
  },
  methods: {
    /*
    postsLists() {
      this.filtered = this.posts.filter(post => {
       return  post.caption.includes(this.searchValue))
      }
    } */
  },
  mounted() {
    Api.get('/posts').then(response => {
      console.log(response.data.post)
      this.posts = response.data.post
      console.log(response.data.posts)
    })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>

<style scoped>

.search-input {
width: 200xp;
height: 30px;
border-radius: 5px;
}
</style>
