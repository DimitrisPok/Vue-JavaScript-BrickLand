<template>
  <div>
        <br/>
        <img v-bind:src="require(`@/assets/${post.img}`)" alt="...">
    </div>
</template>

<script>
export default {
  name: 'post-item-user',
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
  max-height: 100%;
}

.b-button{
        float: left;
}
</style>
