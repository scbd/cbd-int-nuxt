<script setup lang="ts">
import type { fetchedMenuItem } from "~/types/drupalMenu";
import getComponents from "~/composables/componentApi";
import type { searchParams } from "~/types/components";

const { getMeetings, getNotifications } = getComponents();

const props = defineProps<{
  parent: fetchedMenuItem;
}>();

const component_component = props.parent.options?.attributes?.component;
const component_object = {
  type: "",
};

if (component_component?.includes("Meetings")) {
  try {
    if (!meetings.value.meetings?.length) {
      const search_params: searchParams = {
        q: "schema_s:meeting",
        fl: ["title_*_s", "url_ss"],
        sort: {
          params: "abs(ms(startDate_dt,NOW))",
          direction: "asc",
        },
        rows: 4,
      };
      await getMeetings(search_params);
    }
  } catch (error) {
    console.error(error);
  }
  component_object.type = "meeting";
} else if (component_component?.includes("Notifications")) {
  try {
    if (!notifications.value.notifications?.length) {
      const search_params: searchParams = {
        q: "schema_s:notification",
        fl: ["title_*_s", "symbol_s", "date_s", "url_ss"],
        sort: {
          params: "date_s",
          direction: "desc",
        },
        rows: 3,
      };
      await getNotifications(search_params);
    }
  } catch (error) {
    console.error(error);
  }
  component_object.type = "notification";
}
</script>

<template>
  <template v-if="component_object.type === 'meeting'">
    <li v-for="meeting in meetings.meetings" class="nav-item">
      <NuxtLink class="nav-link" :to="meeting.url">
        {{
          `(${Intl.DateTimeFormat(
            active_language!.active_language.slice(0, 2),
            {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            }
          ).format(meeting.start_date)})`
        }}
        {{ meeting.title[active_language!.active_language.slice(0, 2)] }}
      </NuxtLink>
    </li>
  </template>

  <li
    v-else-if="component_object.type === 'notification'"
    v-for="notification in notifications.notifications"
    class="nav-item"
  >
    <NuxtLink class="nav-link" :to="notification.url">
      {{
        `(${Intl.DateTimeFormat(active_language!.active_language.slice(0, 2), {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        }).format(notification.date)})`
      }}
      {{
        `${notification.symbol}: ${notification.title[active_language!.active_language.slice(0, 2)]}`
      }}
    </NuxtLink>
  </li>

  <li v-else v-for="i = 1 in 3" class="nav-item">
    <NuxtLink class="nav-link" to="#">
      {{
        `${props.parent.options?.attributes?.component ?? "Dynamic Placeholder"} - ${i}`
      }}
    </NuxtLink>
  </li>
</template>
