import PocketBase, { type AuthRecord } from 'pocketbase';
import { AUTH_STORE_COOKIE, POCKET_BASE_URL } from '~/constants';
import type { TypedPocketBase } from '~/types/PocketBase';

export const usePocketbase = () => {
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
    cookie.value = {
      token: pb.authStore.token,
      record: pb.authStore.record,
    };
  });

  return pb;
}
