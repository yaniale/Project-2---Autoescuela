<template>
  <v-app-bar app color="green lighten-1">
    <v-toolbar-title id="nav-bar">eDriving</v-toolbar-title>
    <v-btn text :to="{ name: 'home' }">Home</v-btn>
    <v-btn text :to="{ name: 'about' }">About</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="scss" scoped>
#nav-bar{
  display: block;
  margin: 0 auto;
}
</style>
