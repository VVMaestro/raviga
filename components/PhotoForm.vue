<script setup lang="ts">
  import type { IPhotoData } from '../types/PhotoData';
  import { ref } from 'vue';
  import { 
    NButton,
    NDrawer, 
    NDrawerContent, 
    NInputNumber, 
    NUpload, 
    NUploadDragger,
    NForm,
    NFormItem,
    type UploadFileInfo,
    useNotification
  } from 'naive-ui';
  import { ImageUp, CircleX } from 'lucide-vue-next';

  const { 
    isOpen = false,
  } = defineProps<{
    isOpen?: boolean;
  }>();

  const emit = defineEmits<{
    (event: 'photoCreated', photoData: IPhotoData): void;
    (event: 'close'): void;
  }>();

  const notification = useNotification();

  const photoService = new Photo();

  const longitude = defineModel<number>('longitude');
  const latitude = defineModel<number>('latitude');
  const fileState = ref<File | null>(null);
  
  const onFileChange = (
    { 
      file,
    }: { 
      file: UploadFileInfo;
    }) => {
    if (file.file) {
      fileState.value = file.file;
    }
  };

  const onCreate = async (event: Event) => {
    const userId = Auth.getPB().authStore.record?.id;

    if (!userId) {
      notification.error({ content: 'No User Id was provided', duration: 5000 });

      return;
    }

    if (!fileState.value) {
      notification.error({ content: 'No File was provided', duration: 5000 });

      return;
    }

    if (longitude.value === undefined || latitude.value === undefined) {
      notification.error({ content: 'Not all position coordinates was provided', duration: 5000 });
      
      return;
    }

    const photoRecord = await photoService.createPhoto(
      { 
        user: userId,
        file: fileState.value,
        position: {
          longitude: longitude.value,
          latitude: latitude.value,
          user: userId,
        }
      }
    );

    notification.success({ content: 'Photo was successfuly created', duration: 4000 });

    emit('photoCreated', photoService.getMapPhotoData(photoRecord));
  };

  const onClose = () => {
    emit('close');
  }

  const onUpdateLong = (value: number | undefined | null) => {
    if (value) {
      longitude.value = value
    }
  };

  const onUpdateLat = (value: number | undefined | null) => {
    if (value) {
      latitude.value = value
    }
  }; 
</script>

<template>
  <n-drawer :show="isOpen" :show-mask="false">
    <n-drawer-content>
      <n-form id="addPhotoForm" @submit.prevent="onCreate">
        <n-form-item label="Долгота">
          <n-input-number :value="longitude" @update:value="onUpdateLong"  />
        </n-form-item>

        <n-form-item label="Широта">
          <n-input-number :value="latitude" @update:value="onUpdateLat" />
        </n-form-item>

        <n-form-item label="Фото">
          <n-upload
            directory-dnd
            @change="onFileChange"
          >
            <n-upload-dragger class="group flex justify-center">
              <image-up class="stroke-slate-400 group-hover:stroke-emerald-500 transition-colors" :size="40" />
            </n-upload-dragger>
          </n-upload>
        </n-form-item>
      </n-form>

      <template #footer>
        <div class="flex justify-between w-full">
          <n-button secondary @click="onClose">
            <template #icon>
              <circle-x />
            </template>
            Закрыть
          </n-button>
          <n-button attr-type="submit" form="addPhotoForm">Создать</n-button>
        </div>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>