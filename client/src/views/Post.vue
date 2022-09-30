<template>
    <div>
 <h1>Here You Can Make A Post</h1>
 <br/>
 <br/>
<Create-A-Post/>
    </div>

</template>

<script>

import CreateAPost from '../components/CreateAPost.vue'

export default {
  name: 'post',
  components: {
    CreateAPost
  },
  methods: {
  }
}
</script>
<style scoped>
h1{
  color: black;
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 10%;
  max-height: 10%;
}
</style>
