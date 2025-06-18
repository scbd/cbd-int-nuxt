<script setup lang="ts">
const { setLocale, t } = useI18n();

const languageSettings = useLanguageStore();

useSeoMeta({
  title: () => t("page.title"),
  ogTitle: () => t("page.title"),
  description: () => t("page.description"),
  ogDescription: () => t("page.description"),
});

onMounted(() => {
  setLocale(
    languageSettings.active_language.slice(0, 2) as
      | "ar"
      | "en"
      | "fr"
      | "es"
      | "ru"
      | "zh"
  );
});

watch(languageSettings, () => {
  setLocale(
    languageSettings.active_language.slice(0, 2) as
      | "ar"
      | "en"
      | "fr"
      | "es"
      | "ru"
      | "zh"
  );
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout></NuxtLayout>
  </div>
</template>
