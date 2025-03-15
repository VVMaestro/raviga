<script lang="ts" setup>
  import { ref, watchEffect } from 'vue';
  import type { IPhotoData } from '../types/PhotoData';
  import type { LngLat } from '@yandex/ymaps3-types';
  import { NFloatButton } from 'naive-ui';
  import { LogOutIcon, SquirrelIcon } from 'lucide-vue-next';

  definePageMeta({
    middleware: ['authenticated'],
  });

  const userPhotos = ref<IPhotoData[]>([]);

  watchEffect(async () => {
    userPhotos.value = await new Photo().getUserPhotos();
  });

  const isPhotoDrawerOpen = ref(false);

  const longitude = ref(0);
  const latitude = ref(0);

  const onMapClick = (coordinates: LngLat) => {
    if (!isPhotoDrawerOpen.value) {
      isPhotoDrawerOpen.value = true;
    }

    longitude.value = coordinates[0];
    latitude.value = coordinates[1];
  };

  const onPhotoCreated = (photoMapData: IPhotoData) => {
    userPhotos.value.push(photoMapData);
    isPhotoDrawerOpen.value = false;
  };

  const onDrawerClose = () => {
    isPhotoDrawerOpen.value = false;
  }

  const onLogOut = async () => {
    await Auth.logout();
  };
</script>

<template>
  <main class="relative bg-white">
    <Map @map-click="onMapClick" :user-photos="userPhotos" :show-current-position="isPhotoDrawerOpen" />

    <photo-form
      :is-open="isPhotoDrawerOpen"
      v-model:longitude="longitude"
      v-model:latitude="latitude"
      @photo-created="onPhotoCreated"
      @close="onDrawerClose"
    />

    <n-float-button circle class="bottom-3 left-3" menu-trigger="click">
      <squirrel-icon />

      <template #menu>
        <n-float-button @click="onLogOut">
          <log-out-icon />
        </n-float-button>
      </template>
    </n-float-button>
  </main>
</template>