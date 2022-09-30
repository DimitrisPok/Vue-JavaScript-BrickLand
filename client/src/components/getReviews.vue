<template>
<div>
  <p> {{reviews}} </p>
</div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'reviews',
  data() {
    return {
      reviews: []
    }
  },
  methods: {
    getMessage() {
      Api.get('/reviews')
        .then(response => {
          this.reviews = response.data.message
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
