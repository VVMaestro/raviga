import PocketBase, { type AuthRecord } from 'pocketbase';
import { POCKET_BASE_URL, AUTH_STORE_COOKIE } from '~/constants';
import type { TypedPocketBase } from '~/types/PocketBase';

export default defineNuxtPlugin(async (nuxtApp) => {
  const pb = new PocketBase(POCKET_BASE_URL) as TypedPocketBase;

  const cookie = useCookie<{ token: string; record: AuthRecord }>(AUTH_STORE_COOKIE, {
    path: '/',
    secure: false,
    sameSite: 'strict',
    httpOnly: false,
    maxAge: 604800,
  });

  pb.authStore.save(cookie.value?.token, cookie.value?.record);

  pb.authStore.onChange(() => {
    console.log("ONCHANGE:SSR:", pb.authStore.token, pb.authStore.record);

    cookie.value = {
      token: pb.authStore.token,
      record: pb.authStore.record,
    };
  });

  try {
    if (pb.authStore.isValid) {
      await pb.collection('users').authRefresh();
    }
  } catch (_) {
    pb.authStore.clear();
  }

  return {
    provide: { pb },
  };
});
