<script setup lang="ts">
  import { NNotificationProvider } from 'naive-ui';
  
  useHead({
    meta: [{ name: 'naive-ui-style' }]
  })
</script>

<template>
  <n-notification-provider>
    <div>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </n-notification-provider>
</template>
