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
const routeArray = route.fullPath
  .split("/")
  .filter((step) => step.trim() != "");
</script>

<template>
  <nav class="breadcrumbs" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <NuxtLink to="/"> Home </NuxtLink>
      </li>
      <template v-for="(step, index) in routeArray">
        <li
          v-if="step !== routeArray[routeArray.length - 1]"
          class="breadcrumb-item"
        >
          <NuxtLink :to="`/${routeArray.slice(0, index + 1).join('/')}`">{{
            step
          }}</NuxtLink>
        </li>
      </template>

      <li v-if="page" class="breadcrumb-item active" aria-current="page">
        {{ page.title }}
      </li>
      <li
        v-else
        v-for="crumbs in content"
        class="breadcrumb-item active"
        aria-current="page"
      >
        <template v-if="crumbs.type === 'article'">
          {{ crumbs.title }}
        </template>
        <template v-else>
          {{
            crumbs.symbol ??
            (crumbs.title as availableLanguages)[
              activeLanguage!.active_language.slice(0, 2)
            ]
          }}
        </template>
      </li>
    </ol>
  </nav>
</template>
