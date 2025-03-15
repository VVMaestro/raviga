<script setup lang="ts">
  import {
    YandexMap,
    YandexMapClusterer,
    YandexMapDefaultSchemeLayer,
    YandexMapDefaultFeaturesLayer,
    YandexMapListener,
    YandexMapMarker,
  } from 'vue-yandex-maps';
  import type { IPhotoData } from '../types/PhotoData';
  import { MapPinPlus } from 'lucide-vue-next';
  import type { DomEventHandler, LngLat } from '@yandex/ymaps3-types';

  const { onMapClick, userPhotos, showCurrentPosition = false } = defineProps<{
    onMapClick?: (coordinates: LngLat) => void;
    userPhotos: IPhotoData[];
    showCurrentPosition?: boolean;
  }>();

  const LOCATION = {
    center: [37.588144, 55.733842],
    zoom: 16,
  };

  const currentPositionCoordinates = ref<LngLat>([0, 0]);

  const mapClickHandler: DomEventHandler = (object, event) => {
    currentPositionCoordinates.value = event.coordinates;

    onMapClick?.(event.coordinates);
  };
</script>

<template>
  <div class="w-screen h-screen">
    <yandex-map :settings="{location: LOCATION}">
      <yandex-map-default-scheme-layer />

      <yandex-map-default-features-layer />
      
      <yandex-map-listener :settings="{ onClick: mapClickHandler}" />
      
      <yandex-map-clusterer>
        <yandex-map-marker
          v-for="({geometry, url}, index) in userPhotos"
          :key="index"
          :settings="{coordinates: geometry.coordinates}"
          :draggable="true"
        >
          <div class="w-28 border-4 border-amber-50 bg-amber-50 shadow-2xl shadow-black">
            <img :src="url" />
          </div>
        </yandex-map-marker>

        <template #cluster="{length}">
          <div class="w-12 h-12 bg-emerald-700 rounded-full border-4 border-emerald-500 flex justify-center items-center text-2xl text-amber-50">
            {{length}}
          </div>
        </template>
      </yandex-map-clusterer>

      <yandex-map-marker v-if="showCurrentPosition" :settings="{coordinates: currentPositionCoordinates}" z-index="1">
        <map-pin-plus class="-translate-x-6 -translate-y-12 stroke-teal-900 fill-teal-500 stroke-2 w-12 h-12 drop-shadow-2xl" />
      </yandex-map-marker>
    </yandex-map>
  </div>
</template>