<script setup lang="ts">
import type {
  componentSanitized,
  availableLanguages,
} from "~/types/components";
import type { page } from "~/types/page";

const props = defineProps<{
  content?: componentSanitized[];
  page?: page;
  submenuItemIndex?: {
    level2?: number;
    level3?: number;
    level4?: number;
  };
}>();

const languageSettings = useLanguageStore();

const route = useRoute();
const routeArray = route.fullPath
  .split("/")
  .filter((step) => step.trim() != "");
const routePath = route.fullPath.replace(/\/+$/, "");
</script>

<template>
  <nav class="breadcrumbs" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <NuxtLink to="/"> Home </NuxtLink>
      </li>

      <template
        v-if="submenuItemIndex?.level2 || submenuItemIndex?.level2 === 0"
      >
        <li
          v-if="submenu[submenuItemIndex.level2].link !== routePath"
          class="breadcrumb-item"
        >
          <NuxtLink
            :to="
              submenu[submenuItemIndex.level2].link !== '<nolink>'
                ? submenu[submenuItemIndex.level2].link
                : ''
            "
            >{{ submenu[submenuItemIndex.level2].title }}</NuxtLink
          >
        </li>
        <li v-else class="breadcrumb-item active" aria-current="page">
          {{ submenu[submenuItemIndex.level2].title }}
        </li>
        <template v-if="submenuItemIndex.level3">
          <li
            v-if="
              submenu[submenuItemIndex.level2].children[submenuItemIndex.level3]
                .link !== routePath
            "
            class="breadcrumb-item"
          >
            <NuxtLink
              :to="
                submenu[submenuItemIndex.level2].children[
                  submenuItemIndex.level3
                ].link !== '<nolink>'
                  ? submenu[submenuItemIndex.level2].children[
                      submenuItemIndex.level3
                    ].link
                  : ''
              "
              >{{
                submenu[submenuItemIndex.level2].children[
                  submenuItemIndex.level3
                ].title
              }}
            </NuxtLink>
          </li>
          <li v-else class="breadcrumb-item active" aria-current="page">
            {{
              submenu[submenuItemIndex.level2].children[submenuItemIndex.level3]
                .title
            }}
          </li>
        </template>
        <template v-if="submenuItemIndex.level3 && submenuItemIndex.level4">
          <li class="breadcrumb-item active" aria-current="page">
            {{
              submenu[submenuItemIndex.level2].children[submenuItemIndex.level3]
                .children[submenuItemIndex.level4].title
            }}
          </li>
        </template>
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
