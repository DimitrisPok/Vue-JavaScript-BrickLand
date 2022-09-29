<template>
    <div>
        <p> Caption : {{post.caption}}, Instructions : {{post.instructions}}, Img: {{post.img}}, Date : {{post.createdAt}}, {{post.review}}</p>
        <br/>
        <br/>
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
    background-color: aqua;
}
img {
  display: block;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  max-width: 10%;
  max-height: 10%;
}

.b-button{
        float: left;
}
</style>
