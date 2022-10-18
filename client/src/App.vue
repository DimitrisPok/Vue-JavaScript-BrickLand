<template>
 <div id="app">
    <div id="nav" class="navigation">
      <div>
    </div>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <a class="navbar-brand float-left" target="_blank">
           BrickLand
        </a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/login">Log In</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/signup">Sign up</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-danger" to="/adminlogin">Admin</router-link>
          </li>
        </ul>
      </div>
    </nav>
    </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navigation{
  text-align: left;
  background-color: rgb(233, 220, 181);
}
.homeNav{
  color: bisque;
}

@media (min-width: 360px) and (max-width: 768px) {

  .container {
    font-size: small;
  }
  .homeNav{
    width: 100%;
    position: sticky-bottom;
    padding: 0;
  }
}

</style>
{{this.$router.push(route, () => {'/welcome'})}}
