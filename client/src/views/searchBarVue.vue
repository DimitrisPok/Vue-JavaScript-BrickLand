<template>
    <div>
      <h1>Hello</h1>
      <search-bar/>
    </div>

    </template>

<script>
import searchBar from '../components/SearchBar.vue'

export default {
  name: 'post',
  components: {
    searchBar
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
