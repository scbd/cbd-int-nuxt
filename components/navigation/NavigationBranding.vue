<script setup lang="ts">
const languageSettings = useLanguageStore();
</script>

<template>
  <ClientOnly>
    <NuxtLink v-if="languageStatus.status === 'OK'" to="/" class="navbar-brand">
      <img
        class="cus-logo"
        :src="`/images/CBD-logo-${languageSettings.active_language.slice(0, 2).toUpperCase()}.png`"
        alt="Convention of Biological Diversity Logo"
      />
    </NuxtLink>

    <Loader
      v-else
      :class="languageStatus.status === 'error' ? 'error-loader' : ''"
    />
  </ClientOnly>
</template>
