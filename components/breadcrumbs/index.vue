<script setup lang="ts">
import type {
  componentSanitized,
  availableLanguages,
} from "~/types/components";
import type { page } from "~/types/page";

const props = defineProps<{
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

const fetchedComponents: {
  articles?: componentSanitized[];
  meetings?: componentSanitized[];
  notifications?: componentSanitized[];
  statements?: componentSanitized[];
  nbsaps?: componentSanitized[];
  portals?: componentSanitized[];
} = {
  articles: [referencedArticles.value.general[0]],
  meetings: [referencedMeetings.value.general[0]],
  notifications: [referencedNotifications.value.general[0]],
  statements: [referencedStatements.value.general[0]],
  nbsaps: [referencedNbsaps.value[0]],
  portals: [referencedPortals.value[0]],
};

onMounted(() => {
  fetchedComponents.articles = [referencedArticles.value.general[0]];
  fetchedComponents.meetings = [referencedMeetings.value.general[0]];
  fetchedComponents.notifications = [referencedNotifications.value.general[0]];
  fetchedComponents.statements = [referencedStatements.value.general[0]];
  fetchedComponents.nbsaps = [referencedNbsaps.value[0]];
  fetchedComponents.portals = [referencedPortals.value[0]];
});

watch(referencedStatements, () => {
  fetchedComponents.articles = [referencedArticles.value.general[0]];
  fetchedComponents.nbsaps = [referencedNbsaps.value[0]];
  fetchedComponents.portals = [referencedPortals.value[0]];
});
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

        <template v-else>
          <li class="breadcrumb-item active" aria-current="page">
            <template
              v-if="
                route.meta.pageType === 'componentArticle' &&
                fetchedComponents.articles
              "
            >
              {{ fetchedComponents.articles[0].title }}
            </template>
            <template
              v-else-if="
                route.meta.pageType === 'componentMeeting' &&
                fetchedComponents.meetings
              "
            >
              {{
                (fetchedComponents.meetings[0].title as availableLanguages)[
                  languageSettings.active_language
                ]
              }}
            </template>
            <template
              v-else-if="
                route.meta.pageType === 'componentNotification' &&
                fetchedComponents.notifications
              "
            >
              {{ fetchedComponents.notifications[0].symbol }}
            </template>
            <template
              v-else-if="
                route.meta.pageType === 'componentStatement' &&
                fetchedComponents.statements
              "
            >
              {{ fetchedComponents.statements[0].symbol }}
            </template>
            <template
              v-else-if="
                route.meta.pageType === 'componentNbsap' &&
                fetchedComponents.nbsaps
              "
            >
              {{
                (fetchedComponents.nbsaps[0].title as availableLanguages)[
                  languageSettings.active_language
                ]
              }}
            </template>
            <template
              v-else-if="
                route.meta.pageType === 'componentPortal' &&
                fetchedComponents.portals
              "
            >
              {{ fetchedComponents.portals[0].title }}
            </template>
          </li>
        </template>
      </template>
    </ol>
  </nav>
</template>
