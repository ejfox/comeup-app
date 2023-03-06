<template>
  <div>
    <!-- make a link to each page -->
    <ul>
      <li v-for="page in pages" :key="page">
        <router-link :to="{ name: page }">{{ page }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script setup>
const pages = ["queue", "user", "idea-submit", "chooser"];
</script>
