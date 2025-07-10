<script setup lang="ts">
import type { fetchedMenuItem } from "~/types/drupalMenu";

const props = defineProps<{
  parent: fetchedMenuItem;
}>();
</script>

<template>
  <li
    v-for="level2_item in parent.children"
    class="level-2-item nav-item"
    :class="[{ 'level-3-items-multi-col': level2_item.children.length > 8 }]"
  >
    <NuxtLink
      class="nav-link"
      :to="level2_item.link !== '<nolink>' ? level2_item.link : ''"
    >
      {{ level2_item.title }}
    </NuxtLink>

    <ul
      v-if="level2_item.options?.attributes?.component"
      class="level-3-items nav"
    >
      <NavigationMegamenuLevel3Dynamic :parent="level2_item" />
    </ul>

    <ul
      v-else-if="level2_item.children.length > 0"
      class="level-3-items nav"
      :style="`--column-count: ${Math.ceil(level2_item.children.length / 8).toString()}`"
    >
      <NavigationMegamenuLevel3 :parent="level2_item" />
    </ul>
  </li>
</template>
