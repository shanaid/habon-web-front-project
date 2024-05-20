<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheHeaderNav from '@/components/common/TheHeaderNav.vue'
</script>

<template>
  <TheHeaderNav />
</template>

<style scoped>
  .v-application {
  font-family: 'BMEuljiro10yearslater', sans-serif !important;
}
@font-face {
  font-family:'BMEuljiro10yearslater';
  src: url('@/assets/fonts/BMEuljiro10yearslater.ttf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family:'BMEuljiro10yearslater';
  src: url('@/assets/fonts/BMEuljiro10yearslater.ttf') format('truetype');
  font-weight: 300;
}
@font-face {
  font-family:'BMEuljiro10yearslater';
  src: url('@/assets/fonts/BMEuljiro10yearslater.ttf') format('truetype');
  font-weight: 700;
}


</style>
