<template>
  <v-app class="grey lighten-2 app">
    <Navbar/>
    <v-main class="mx-4 mb-4">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'


export default {
  name: 'App',
  components: {
    Navbar
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss">
#app {
  background: #f5f5f5;
}


</style>
