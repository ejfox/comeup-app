<template>
  <div class="pa5 vh-100">
    <form class="row flex-center flex" @submit.prevent="handleLogin">
      <div class="col-6 form-widget">
        <h1 class="header">Supabase + Nuxt 3</h1>
        <p class="description">Sign in via magic link with your email below</p>
        <div>
          <input
            class="inputField"
            type="email"
            placeholder="Your email"
            v-model="email"
          />
        </div>
        <div>
          <input
            type="submit"
            class="button block"
            :value="loading ? 'Loading' : 'Send magic link'"
            :disabled="loading"
          />
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
const supabase = useSupabaseClient();
const config = useRuntimeConfig()
const route = useRoute()

const authRedirectUrl = config.SUPABASE_AUTH_REDIRECT_URL
const redirectUrl = route.query.redirect

const loading = ref(false);
const email = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({ email: email.value },
    { redirectTo: authRedirectUrl + redirectUrl });
    if (error) throw error;
    alert("Check your email for the login link!");
  } catch (error) {
    alert(error.error_description || error.message);
  } finally {
    loading.value = false;
  }
};
</script>
