export default defineNuxtRouteMiddleware((to, from) => {
  const nuxtApp = useNuxtApp();

  if (!nuxtApp.$pb.authStore.isValid) {
    return navigateTo('/login');
  }
});
