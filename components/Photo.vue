<script lang="ts" setup>
  import type { DomEvent } from '@yandex/ymaps3-types';
  import { NImage } from 'naive-ui';

  const { url } = defineProps<{url: string}>();
</script>

<template>
  <div class="w-28 border-4 border-amber-50 bg-amber-50 shadow-2xl shadow-black">
    <n-image 
      :src="url"
      lazy
      @click="(event: DomEvent) => {event.stopPropagation();}"
    />
  </div>
</template>
