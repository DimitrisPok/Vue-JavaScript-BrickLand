<template>
 <div id="app">
  <div id="nav" class="navigation">
    <div id="nav" class="navigation">
      <h1>Welcome to Brick Land</h1>
      <router-link class="homeNav" to="/login"><b-button>Log In</b-button></router-link> <br><br>
      <router-link class="homeNav" to="/SignUp"><b-button>Sign Up</b-button></router-link>
    <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'signin'
}
</script>
