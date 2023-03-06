<template>
  <div>
    <ul class="ma0 pa2 bb b--light-gray bw2 mv2">
      <li v-for="page in pages" :key="page" class="dib mr2">
        <router-link :to="{ name: page }" class="black link underline dim">{{
          pageInfo[page]
        }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script setup>
const pages = ["queue", "user", "idea-submit", "chooser"];
const pageInfo = {
  queue: "Idea Queue",
  user: "Login",
  "idea-submit": "Submit Idea",
  chooser: "Choose an Idea",
};
</script>
