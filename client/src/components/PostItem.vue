<template>
  <div>
        <p> ID:{{post._id}}</p>
        <br/>
        <img v-bind:src="require(`@/assets/${post.img}`)" alt="...">
        <b-button class ="b-button" variant="danger" v-on:click="$emit('del-post', post._id)">X</b-button>
    </div>
</template>

<script>
export default {
  name: 'post-item',
  props: ['post']

}
</script>

<style scoped>
p {
    background-color: bisque;
}
img {
  display: block;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  max-width: 30%;
  max-height: 30%;
}

.b-button{
        float: left;
}
</style>
