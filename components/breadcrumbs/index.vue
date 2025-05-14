<script setup lang="ts">
import type { componentSanitized } from "~/types/components";
import type { page } from "~/types/page";
const props = defineProps<{
  content?: componentSanitized[];
  page?: page;
}>();

const route = useRoute();
const routeArray = route.fullPath
  .split("/")
  .filter((step) => step.trim() != "");

const pathItems = ref<{
  level1: number;
  level2?: fetchedMenuItem;
  level3?: fetchedMenuItem;
  level4?: fetchedMenuItem;
}>({ level1: 0 });

if (props.submenuItems) {
  for (const [level2Index, level2Item] of props.submenuItems.entries()) {
    for (const [level3Index, level3Item] of level2Item.children.entries()) {
      for (const [level4Index, level4Item] of level3Item.children.entries()) {
        if (level4Item.link.includes(routeArray[routeArray.length - 1])) {
          pathItems.value.level2 = props.submenuItems[level2Index];
          pathItems.value.level3 = level2Item.children[level3Index];
          pathItems.value.level4 = level4Item;
        }
      }
    }
  }
}
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

      <li v-if="page" class="breadcrumb-item active" aria-current="page">
        {{ page.title }}
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
