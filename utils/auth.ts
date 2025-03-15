export class Auth {
  public static getPB() {
    const nuxtApp = useNuxtApp();

    if (!nuxtApp.$pb.authStore.isValid) {
      navigateTo('/login');
    }

    return nuxtApp.$pb;
  }

  public static async authenticate(login: string, password: string) {
    try {
      const nuxtApp = useNuxtApp();
      
      await nuxtApp.$pb.collection('users').authWithPassword(login, password);
    } catch (err: unknown) {
      console.error(`${err}`);
    }
  }

  public static async logout() {
    const nuxtApp = useNuxtApp();

    nuxtApp.$pb.authStore.clear();

    navigateTo('/login');
  }
}