<script setup lang="ts">
import type {
  componentSanitized,
  availableLanguages,
} from "~/types/components";
import type { fetchedMenuItem } from "~/types/drupalMenu";
import type { page } from "~/types/page";

const props = defineProps<{
  content?: componentSanitized[];
  page?: page;
  submenuItems?: fetchedMenuItem[];
}>();

const languageSettings = useLanguageStore();

const route = useRoute();
const routeArray = route.fullPath
  .split("/")
  .filter((step) => step.trim() != "");

const pathItems = ref<{
  level2?: fetchedMenuItem;
  level3?: fetchedMenuItem;
  level4?: fetchedMenuItem;
}>({ level2: props.submenuItems?.[0] });

if (props.submenuItems) {
  for (const [level2Index, level2Item] of props.submenuItems.entries()) {
    if (level2Item.link.includes(routeArray[routeArray.length - 1])) {
      pathItems.value.level2 = props.submenuItems[level2Index];
    } else {
      for (const [level3Index, level3Item] of level2Item.children.entries()) {
        if (level3Item.link.includes(routeArray[routeArray.length - 1])) {
          pathItems.value.level2 = props.submenuItems[level2Index];
          pathItems.value.level3 = level2Item.children[level3Index];
        } else {
          for (const [
            level4Index,
            level4Item,
          ] of level3Item.children.entries()) {
            if (level4Item.link.includes(routeArray[routeArray.length - 1])) {
              pathItems.value.level2 = props.submenuItems[level2Index];
              pathItems.value.level3 = level2Item.children[level3Index];
              pathItems.value.level4 = level4Item;
            }
          }
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

      <template v-if="pathItems.level2">
        <li v-if="pathItems.level2.children" class="breadcrumb-item">
          <NuxtLink
            :to="
              pathItems.level2.link !== '<nolink>' ? pathItems.level2.link : ''
            "
            >{{ pathItems.level2.title }}</NuxtLink
          >
        </li>
        <li v-else class="breadcrumb-item active" aria-current="page">
          {{ pathItems.level2.title }}
        </li>

        <li v-if="pathItems.level3 && pathItems.level4" class="breadcrumb-item">
          <NuxtLink
            :to="
              pathItems.level3.link !== '<nolink>' ? pathItems.level3.link : ''
            "
            >{{ pathItems.level3.title }}</NuxtLink
          >
        </li>
        <li
          v-else-if="pathItems.level3 && !pathItems.level4"
          class="breadcrumb-item active"
          aria-current="page"
        >
          {{ pathItems.level3.title }}
        </li>

        <li
          v-if="pathItems.level4"
          class="breadcrumb-item active"
          aria-current="page"
        >
          {{ pathItems.level4.title }}
        </li>
      </template>
      <template v-else>
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
                languageSettings.active_language
              ]
            }}
          </template>
        </li>
      </template>
    </ol>
  </nav>
</template>
