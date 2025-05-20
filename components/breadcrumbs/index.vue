<script setup lang="ts">
import type {
  componentSanitized,
  availableLanguages,
} from "~/types/components";
import type { page } from "~/types/page";
const props = defineProps<{
  content?: componentSanitized[];
  page?: page;
}>();

const route = useRoute();
const routeArray = route.fullPath.split("/").slice(1, -1);
</script>

<template>
  <nav class="breadcrumbs" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <NuxtLink to="/"> Home </NuxtLink>
      </li>
      <li v-for="(step, index) in routeArray" class="breadcrumb-item">
        <NuxtLink :to="`/${routeArray.slice(0, index + 1).join('/')}`">{{
          step
        }}</NuxtLink>
      </li>

      <li v-if="page" class="breadcrumb-item active" aria-current="page">
        {{ page.title }}
      </li>

      <li
        v-if="content"
        v-for="crumbs in content"
        class="breadcrumb-item active"
        aria-current="page"
      >
        {{
          crumbs.symbol ??
          (crumbs.title as availableLanguages)[
            activeLanguage!.active_language.slice(0, 2)
          ]
        }}
      </li>
    </ol>
  </nav>
</template>
