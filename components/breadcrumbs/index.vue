<script setup lang="ts">
import type { componentSanitized } from "~/types/components";
const props = defineProps<{
  content: componentSanitized[];
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
        <a :href="route.fullPath.replace(step[index - 1], '')">{{ step }}</a>
      </li>
      <li
        v-for="crumbs in content"
        class="breadcrumb-item active"
        aria-current="page"
      >
        {{ crumbs.title }}
      </li>
    </ol>
  </nav>
</template>
