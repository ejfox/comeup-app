export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  if (!user) return
  if (!user.value)
  //reroute to login saving the current destination in the redirect query param
  return navigateTo({ name: 'user', query: { redirect: to.path } })



  // watch user.value.role and if it changes to 'authenticated' then route to /user/
  // actually, this is specific implementation is incredibly annoying, but if for some reason you wanted to do this, this is how
  // watch(user, () => {
  //   if (user.value?.role === 'authenticated')
  //     return navigateTo({ name: 'user' })
  // }
  // )
})
