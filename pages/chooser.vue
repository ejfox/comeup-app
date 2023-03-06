<template>
  <!-- <div v-for="idea in ideaList">
{{idea}}
</div> -->
  <div
  :class="[spinning ? 'spinning' : '',

'vh-100 pv5']"
  >
    <!-- <pre class="f6">{{ ideaList }}</pre> -->
    <div class="red">
      {{ error }}
    </div>

    <!-- a button to trigger the animation -->
    <!-- <button @click="focusRandomIdea({animDuration: 1000})">Spin</button> -->

    <!-- a beautiful, stylish spin button -->
    <button
      @click="focusRandomIdea({animDuration: 2000})"
      class="bg-white pa2 ba ma5 tc br3 w-10 overflow-hidden center db">
      Spin
    </button>

    <div id="spinner-animation"
    v-if="focusIdea"
    :class="[spinning ? 'spinning-spinner' : '',
    'bg-white pa4 f1 ba ma5 tc br3 w-50 overflow-hidden center'
    ]">
      {{ focusIdea?.text }}

      <!-- lil gray author -->
      <div class="f6 gray">
        {{ focusIdea?.author }}
      </div>
      
    </div>
  </div>
</template>
<script setup>
import anime from 'animejs/lib/anime.es.js'
import { useSound } from '@vueuse/sound'
import spinningSound from '~~/assets/spinning.wav'

const supabase = useSupabaseClient();


const focusIdea = ref(null)
const spinning = ref(false)

const { play, stop } = useSound(spinningSound)

// watch spinning; when it changes to true, play the sound
// when it changes to false, stop the sound
watch(spinning, (newVal) => {
  if (newVal) {
    play()
  } else {
    stop()
  }
})

function focusRandomIdea({animDuration = 1000}) {
  // for the animDuration, every 10ms, we want to change the focusIdea to a random idea

  // get a random idea from the list
  // const randomIdea = ideaList.value[Math.floor(Math.random() * ideaList.value.length)];

  // use anime to spin the text around for animDuration
  

  // use requestAnimationFrame to change the focusIdea every 10ms
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    // console.log(Math.floor(elapsed / 10));
    if (elapsed < animDuration) {
      spinning.value = true
      // get a random idea from the list
      const randomIdea = ideaList.value[Math.floor(Math.random() * ideaList.value.length)];
      focusIdea.value = randomIdea
      window.requestAnimationFrame(step);
    } else {
      spinning.value = false
      // stop the animation
      // check if the animation is running, and if it is, stop it
      if (anime.running.length > 0) {
        anime.running.forEach((anim) => {
          anim.pause();
        });
      }
    }
  }

  window.requestAnimationFrame(step);


}



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
<style>

/* when spinning class is applied, the background color of the element animates across the rainbow in a really beautiful way using css background positions */
.spinning {
  background: linear-gradient(90deg, #ff0000 0%, #ff7f00 12.5%, #ffff00 25%, #00ff00 37.5%, #0000ff 50%, #4b0082 62.5%, #ee82ee 75%, #ff0000 87.5%);
  background-size: 1800% 1800%;
  animation: rainbow 10s ease infinite;
}

@keyframes rainbow {
  0% {
    background-position: 0% 82%;
  }
  50% {
    background-position: 100% 19%;
  }
  100% {
    background-position: 0% 82%;
  }
}

#spinning-animation {
/* tweak the transfomr-origin to change where the text rotates around */
  transform-origin: right;
}

/* create a spinning animation that rotates the text around the center of the div */
.spinning-spinner {
  animation: spin 150ms linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


</style>