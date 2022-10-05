<template>
    <div>
        <h1>Welcome to Brick Land</h1>
        <router-link class="homeNav" to="/adminLogin">
<b-button>Admin Log In</b-button>
</router-link> <br><br>
<router-link class="homeNav" to="/adminSignUp">
<b-button>Admin Sign Up</b-button>
</router-link>
    </div>
</template>

<script>
export default {
  name: 'adminChoice'
}
</script>

<style>

</style>
