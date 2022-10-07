<template>
    <div>
        <users-posts/>
        </div>
</template>

<script>
import UsersPosts from '../components/getUsersPost.vue'
export default {
  components: { UsersPosts },
  name: 'profile',
  data() {
    return {
      reviews: []
    }
  }
}
</script>

<style scoped>

</style>
