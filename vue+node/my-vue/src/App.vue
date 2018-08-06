<template>
  <div class="container-fluid">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'

export default {
  name: 'App',
  components: {
    AppHeader,

  }
};
</script>

<style>

</style>
