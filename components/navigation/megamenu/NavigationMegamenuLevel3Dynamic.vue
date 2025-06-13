<script setup lang="ts">
import type { fetchedMenuItem } from "~/types/drupalMenu";
import getComponents from "~/composables/componentApi";
import type { availableLanguages, searchParams } from "~/types/components";
import type { drupalEntitySearchParams } from "~/types/drupalEntityApi";

const { getArticles, getMeetings, getNotifications, getStatements } =
  getComponents();

const languageSettings = useLanguageStore();

const props = defineProps<{
  parent: fetchedMenuItem;
}>();

const componentObject = {
  component: props.parent.options?.attributes?.component,
  type: "",
};

if (componentObject.component?.includes("News")) {
  try {
    if (!referencedArticles.value.length) {
      const search_params: drupalEntitySearchParams = {
        entity: "article",
        sort: ["-changed"],
        limit: 3,
      };
      await getArticles(search_params);
    }
  } catch (error) {
    console.error(error);
  }
  componentObject.type = "article";
} else if (componentObject.component?.includes("Meetings")) {
  try {
    if (!referencedMeetings.value.length) {
      const search_params: searchParams = {
        q: "schema_s:meeting",
        fl: ["startDate_dt", "endDate_dt", "title_*_s", "url_ss"],
        sort: ["abs(ms(startDate_dt,NOW)) asc"],
        rows: 3,
      };
      await getMeetings(search_params);
    }
  } catch (error) {
    console.error(error);
  }
  componentObject.type = "meeting";
} else if (componentObject.component?.includes("Notifications")) {
  try {
    if (!referencedNotifications.value.length) {
      const search_params: searchParams = {
        q: "schema_s:notification",
        fl: ["title_*_s", "symbol_s", "date_s", "url_ss"],
        sort: ["date_s desc"],
        rows: 3,
      };
      await getNotifications(search_params);
    }
  } catch (error) {
    console.error(error);
  }
  componentObject.type = "notification";
} else if (componentObject.component?.includes("Statements")) {
  try {
    if (!referencedStatements.value.length) {
      const search_params: searchParams = {
        q: "schema_s:statement",
        fl: ["symbol_s", "date_s", "url_ss", "title_??_s"],
        sort: ["date_s desc"],
        rows: 3,
      };
      await getStatements(search_params);
    }
  } catch (error) {
    console.log(error);
  }
  componentObject.type = "statement";
}
</script>

<template>
  <li
    v-if="componentObject.type === 'article'"
    v-for="article in referencedArticles"
    class="nav-item"
  >
    <NuxtLink class="nav-link" :to="article.url">
      {{
        Intl.DateTimeFormat(languageSettings.active_language.slice(0, 2), {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(article.date)
      }}
      <br />
      {{ article.title }}
    </NuxtLink>
  </li>

  <li
    v-else-if="componentObject.type === 'meeting'"
    v-for="meeting in referencedMeetings"
    class="nav-item"
  >
    <NuxtLink class="nav-link" :to="meeting.url">
      {{
        Intl.DateTimeFormat(languageSettings.active_language.slice(0, 2), {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(meeting.date)
      }}
      <template v-if="meeting.date_end">
        &nbsp;&ndash;&nbsp;
        {{
          Intl.DateTimeFormat(languageSettings.active_language.slice(0, 2), {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(meeting.date_end)
        }}
      </template>
      <br />
      {{
        (meeting.title as availableLanguages)[
          languageSettings.active_language.slice(0, 2)
        ]
      }}
    </NuxtLink>
  </li>

  <li
    v-else-if="componentObject.type === 'notification'"
    v-for="notification in referencedNotifications"
    class="nav-item"
  >
    <NuxtLink class="nav-link" :to="notification.url">
      {{
        Intl.DateTimeFormat(languageSettings.active_language.slice(0, 2), {
          year: "numeric",
          month: "long",
          day: "2-digit",
        }).format(notification.date)
      }}
      <br />
      {{
        `${notification.symbol}: ${(notification.title as availableLanguages)[languageSettings.active_language.slice(0, 2)]}`
      }}
    </NuxtLink>
  </li>

  <li
    v-else-if="componentObject.type === 'statement'"
    v-for="statement in referencedStatements"
    class="nav-item"
  >
    <NuxtLink class="nav-link" :to="statement.url">
      {{
        Intl.DateTimeFormat(languageSettings.active_language.slice(0, 2), {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(statement.date)
      }}
      <br />
      {{
        (statement.title as availableLanguages)[
          languageSettings.active_language.slice(0, 2)
        ]
      }}
    </NuxtLink>
  </li>

  <li v-else v-for="i = 1 in 3" class="nav-item">
    <NuxtLink class="nav-link" to="#">
      {{
        `${parent.options?.attributes?.component ?? "Dynamic Placeholder"} - ${i}`
      }}
    </NuxtLink>
  </li>
</template>
