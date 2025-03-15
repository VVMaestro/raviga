<script setup lang="ts">
  import { NCard, NInput, NButton, NForm, NFormItem, useNotification } from 'naive-ui';

  const nuxtApp = useNuxtApp()
  
  const notification = useNotification();

  const email = defineModel<string>('email');
  const password = defineModel<string>('password');

  const onUpdateEmail = (value: string | undefined | null) => {
    email.value = value ?? '';
  };

  const onUpdatePassword = (value: string | undefined | null) => {
    password.value = value ?? '';
  };

  const onAuth = async () => {
    if (!email.value || !password.value) {
      notification.warning({ content: 'Введи почту и пароль', duration: 2000 });

      return;
    }

    await Auth.authenticate(email.value, password.value);

    if(nuxtApp.$pb.authStore.isValid) {
      navigateTo('/');
    } else {
      notification.error({ content: 'Неверные почта или пароль', duration: 2000 })
    }
  };
</script>

<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <div class="w-52">
      <n-card title="Нужно авторизироваться" size="medium">
        <n-form @submit.prevent="onAuth">
          <n-form-item label="Почта">
            <n-input :value="email" @update:value="onUpdateEmail" placeholder="mail@mail.com" />
          </n-form-item>

          <n-form-item label="Пароль">
            <n-input type="password" :value="password" @update:value="onUpdatePassword" placeholder="*******" />
          </n-form-item>

          <n-button attr-type="submit" type="primary">Войти</n-button>
        </n-form>
      </n-card>
    </div>
  </div>
</template>
