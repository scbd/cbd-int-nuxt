<script setup lang="ts">
import type { fetchedMenuItem } from "~/types/drupalMenu";

const route = useRoute();

const props = defineProps<{
  submenuItems: fetchedMenuItem[];
}>();

const currentPath = route.path;
const fullPath = route.fullPath;

const handleVerticalNavigation = ref(false);
</script>

<template>
  <aside
    class="cus-aside aside-nav"
    :class="{ 'aside-collapsed': handleVerticalNavigation }"
  >
    <ul class="nav">
      <template v-for="level2Item of submenu">
        <template v-for="level3Item of level2Item.children">
          <li
            v-if="fullPath.includes(level3Item.link)"
            class="aside-nav-header nav-item"
          >
            <NuxtLink :to="level3Item.link">{{ level3Item.title }}</NuxtLink>
          </li>
          <li v-for="level4Item of level3Item.children" class="nav-item">
            <NuxtLink
              :to="level4Item.link"
              class="nav-link"
              :class="fullPath.includes(level4Item.link) ? 'current-page' : ''"
              >{{ level4Item.title }}</NuxtLink
            >
          </li>
        </template>
      </template>
    </ul>
    <div class="aside-collapse-controls">
      <button
        class="cbd-btn-aside-collapse btn"
        @click="handleVerticalNavigation = !handleVerticalNavigation"
      >
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36 66C52.53 66 66 52.53 66 36C66 19.47 52.53 6 36 6C19.47 6 6 19.47 6 36C6 52.53 19.47 66 36 66ZM27.63 34.41L38.22 23.82C38.67 23.37 39.24 23.16 39.81 23.16C40.38 23.16 40.95 23.37 41.4 23.82C42.27 24.69 42.27 26.13 41.4 27L32.4 36L41.4 45C42.27 45.87 42.27 47.31 41.4 48.18C40.53 49.05 39.09 49.05 38.22 48.18L27.63 37.59C26.73 36.72 26.73 35.28 27.63 34.41Z"
          />
        </svg>
      </button>
    </div>
  </aside>
</template>
