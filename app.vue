<template>
  <div class="bg-light-gray sans-serif f3 vh-100">
    <!-- use Nuxt Pages -->
    <NavBar />
    <NuxtPage />
  </div>
</template>

<script setup>
const msg = ref("Best app ever");
</script>
<style>
/* remove padding and margins */
* {
  padding: 0;
  margin: 0;
}
/* make the body take up the whole screen */
body {
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
