<template>
  <!-- <div v-for="idea in ideaList">
{{idea}}
</div> -->
  <div>
    <pre class="f6">{{ ideaList }}</pre>
    <div class="red">
      {{ error }}
    </div>
  </div>
</template>
<script setup>
const supabase = useSupabaseClient();
// definePageMeta({
//   middleware: 'auth',
// })

// let { data, error } = await supabase
//   .from('ideas')
//   .select(`text, author, votes`)

// use realtime API to get a list of ideas from the idea table
const {
  data: ideaList,
  refresh: refreshIdeas,
  error,
} = await useAsyncData("ideas", async () => {
  const { data } = await supabase.from("ideas").select(`text, author, votes`);
  return data;
});

onMounted(() => {
  // Real time listener for new workouts
  const realtimeChannel = supabase
    .channel("public:ideas")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "ideas" },
      () => refreshIdeas()
    );
  realtimeChannel.subscribe();
});

// onUnmounted(() => {
//   supabase.removeChannel(realtimeChannel)
// })
</script>
