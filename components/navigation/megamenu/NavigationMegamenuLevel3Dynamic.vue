<script setup lang="ts">
import type { fetchedMenuItem } from "~/types/drupalMenu";
import getComponents from "~/composables/componentApi";
import type { availableLanguages, searchParams } from "~/types/components";
import type { drupalEntitySearchParams } from "~/types/drupalEntityApi";

const { getArticles, getGaiaComponents } = getComponents();

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
    const searchParams: drupalEntitySearchParams = {
      entity: "article",
      sort: ["-changed"],
      limit: 4,
    };
    await getArticles(searchParams, true);
  } catch (error) {
    console.error(error);
  }
  componentObject.type = "article";
} else if (componentObject.component?.includes("Meetings")) {
  try {
    const searchParams: searchParams = {
      q: "",
      fl: ["schema_s", "startDate_dt", "endDate_dt", "title_??_s", "url_ss"],
      sort: {
        "abs(ms(startDate_dt,NOW))": "asc",
      },
      rows: 4,
    };
    await getGaiaComponents(searchParams, ["meeting"], true);
  } catch (error) {
    console.error(error);
  }
  componentObject.type = "meeting";
} else if (componentObject.component?.includes("Notifications")) {
  try {
    const searchParams: searchParams = {
      q: "",
      fl: ["schema_s", "title_*_s", "symbol_s", "date_s", "url_ss"],
      sort: {
        date_s: "desc",
      },
      rows: 4,
    };
    await getGaiaComponents(searchParams, ["notification"], true);
  } catch (error) {
    console.error(error);
  }
  componentObject.type = "notification";
} else if (componentObject.component?.includes("Statements")) {
  try {
    const searchParams: searchParams = {
      q: "",
      fl: ["schema_s", "symbol_s", "date_s", "url_ss", "title_??_s"],
      sort: {
        date_s: "desc",
      },
      rows: 4,
    };
    await getGaiaComponents(searchParams, ["statement"], true);
  } catch (error) {
    console.log(error);
  }
  componentObject.type = "statement";
}
</script>

<template>
  <li
    v-if="componentObject.type === 'article'"
    v-for="article in referencedArticles.megamenu"
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
    v-for="meeting in referencedMeetings.megamenu"
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
    v-for="notification in referencedNotifications.megamenu"
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
    v-for="statement in referencedStatements.megamenu"
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
