<script setup lang="ts">
import { useI18n } from "#imports";
const { t } = useI18n();

useSeoMeta({
  title: () => t("page.title"),
  ogTitle: () => t("page.title"),
  description: () => t("page.description"),
  ogDescription: () => t("page.description"),
});

const languageSettings = useLanguageStore();

setActiveLanguage(languageSettings.active_language ?? "en");
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout></NuxtLayout>
  </div>
</template>
