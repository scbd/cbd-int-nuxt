<script setup lang="ts">
import getComponents, { referenced_nbsaps } from "~/composables/componentApi";
import type { searchParams, componentSanitized } from "~/types/components";

const { getMeetings, getNotifications, getNbsaps, getPortals, getStatements } =
  getComponents();

const articles_params: searchParams = {
  q: "article",
  rows: 10,
};

const meetings_params: searchParams = {
  q: "schema_s:meeting",
  fl: [
    "startDate_dt",
    "endDate_dt",
    "EVT_CD",
    "title_*_s",
    "url_ss",
    "symbol_s",
    "eventCity_*_s",
    "eventCountry_??_s",
    "status_s",
  ],
  sort: {
    params: "abs(ms(startDate_dt,NOW))",
    direction: "asc",
  },
  rows: 4,
};

const notifications_params: searchParams = {
  q: "schema_s:notification",
  fl: [
    "symbol_s",
    "date_s",
    "actionDate_s",
    "deadline_s",
    "sender",
    "reference_s",
    "url_ss",
    "recipient_ss",
    "title_??_s",
    "themes_??_ss",
    "fulltext_??_s",
  ],
  sort: {
    params: "date_s",
    direction: "desc",
  },
  rows: 4,
};

const statements_params: searchParams = {
  q: "schema_s:statement",
  fl: ["symbol_s", "date_s", "url_ss", "title_??_s"],
  sort: {
    params: "date_s",
    direction: "desc",
  },
  rows: 4,
};

const nbsaps_params: searchParams = {
  q: "schema_s:nbsap",
  fl: ["submittedDate_s", "url_ss", "title_??_s"],
  sort: {
    params: "submittedDate_s",
    direction: "desc",
  },
  rows: 4,
};

// const meetings = (await getMeetings(meetings_params)) ?? [];
// const notifications = (await getNotifications(notifications_params)) ?? [];

await getMeetings(meetings_params);
await getNotifications(notifications_params);
await getStatements(statements_params);
await getPortals();
await getNbsaps(nbsaps_params);

watch(active_language, async () => {
  await getPortals();
});

definePageMeta({
  layout: "landing-home",
});
</script>

<template>
  <article class="cus-article container-xxl d-flex flex-column">
    <ClientOnly>
      <ContentobjectRow object-type="meeting" :objects="referenced_meetings" />
      <ContentobjectRow
        object-type="notification"
        :objects="referenced_notifications"
      />
      <ContentobjectRow
        object-type="statement"
        :objects="referenced_statements"
      />
      <ContentobjectRow object-type="portal" :objects="referenced_portals" />
      <ContentobjectRow object-type="nbsap" :objects="referenced_nbsaps" />
    </ClientOnly>
  </article>
</template>
