<template>
  <div>
        <p> ID:{{ post._id }}</p>
        <br/>
        <img src="https://img.icons8.com/dusk/64/000000/lego-head.png"/>
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
  max-width: 50%;
  max-height: 100%;
}

.b-button{
        float: left;
}
</style>
