<template>
<div>
<h1 class="review_h"> All Reviews </h1>
<h2 class="title"> Comments: </h2>
    <div v-for= "reviews in reviews" v-bind:key="reviews._id" class="comments">
        <p>Comment: {{reviews.comment}}</p>
        <p>Like: {{reviews.like}}</p>
        <p>Created at: {{reviews.createdAt}}</p>

    </div>
</div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
/* import getReviews from '../components/getReviews.vue' */
export default {
  /* components: { getReviews }, */
  name: 'reviews',
  data() {
    return {
      reviews: []
    }
  },
  mounted() {
    Api.get('/reviews')
      .then(response => {
        this.reviews = response.data.review
      })
      .catch(error => {
        console.log(error)
      })
  },

  methods: {
    getMessage() {

    }
  }
}

</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
/* .review_h{
  color: bisque;
  background-color: rgb(25, 39, 34);
} */
.comments{
  background-color: bisque;
}
.title{
  color: bisque;
  background-color: rgb(25, 39, 34);
}
h1::before {
  transform: scaleX(0);
  transform-origin: bottom right;
}

h1:hover::before {
  transform: scaleX(1);
  transform-origin: bottom left;
}

h1::before {
  content: " ";
  display: block;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  inset: 0 0 0 0;
  background: hsl(400 100% 80%);
  z-index: -1;
  transition: transform .3s ease;
}

h1 {
  position: relative;
  font-size: 5rem;
}

html {
  block-size: 100%;
  inline-size: 100%;
}

body {
  min-block-size: 100%;
  min-inline-size: 100%;
  margin: 0;
  box-sizing: border-box;
  place-content: center;
  font-family: system-ui, sans-serif;
}

@media (orientation: landscape) {
  body {
    grid-auto-flow: column;
  }
}
</style>
