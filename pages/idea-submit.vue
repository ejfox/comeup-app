<template>
  <div>
    <h2>Submit an idea</h2>
    <!-- an input form to submit an idea -->
    <form @submit.prevent="submitIdea">
      <input
        type="text"
        class="w-100 h5"
        v-model="ideaText"
        placeholder="What is your idea?"
      />
      <!-- author field -->
      <input
        type="text"
        class="w-100"
        v-model="ideaAuthor"
        placeholder="Author"
      />
      <input type="submit" value="Submit" />

      <div v-if="ideaSubmitted" class="bg-green white">
        Your idea has been submitted!
      </div>
    </form>
  </div>
</template>
<script setup>
const supabase = useSupabaseClient();
definePageMeta({
  middleware: "auth",
});

const ideaSubmitted = ref(false);
const ideaText = ref("");
const ideaAuthor = ref("");

// an idea looks like this:
// const idea = {
//   text: 'We should make an app that makes apps',
//   author: 'EJ', // this is the username
//   votes: 0,
// }

function submitIdea() {
  console.log("📤 submitting idea");

  // take the form on the page and turn it into an idea object
  // use supabase to update the `ideas` table and add a new row based on the form
  // set the ideaSubmitted variable to true
  // clear the form

  const idea = {
    text: ideaText.value,
    author: ideaAuthor.value,
    votes: 0,
  };

  supabase
    .from("ideas")
    .insert([idea])
    .then(({ data, error }) => {
      if (error) {
        console.log("error", error);
      } else {
        console.log("data", data);
        // after we add the idea, tell the user it was submitted
        ideaSubmitted.value = true;

        // clear the form
        ideaText.value = "";
        ideaAuthor.value = "";
      }
    });
}
</script>
