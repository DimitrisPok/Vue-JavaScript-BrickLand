<template>
    <div>
        <p>{{user._id}}'s name is {{user.name}}</p>
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
    background-color: rgb(241, 147, 214);
}
</style>
