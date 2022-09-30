<template>
    <div>
        <h2>{{user.name}}</h2>
        <h3>{{user.posts}}</h3>
        <b-button variant="danger" v-on:click="$emit('del-user', user._id)">DELETE</b-button>
    </div>
</template>

<script>

export default {
  name: 'user-item',
  props: ['user'],
  methods: {
    // deleteUser() {
    //  this.$emit('del-user', this.user_id)
    //  console.log('User with id:' + this.user_id + ' has been deleted.')
    // }
  }
}
</script>

<style scoped>
p {
    background-color: rgb(132, 80, 236);
}
</style>
