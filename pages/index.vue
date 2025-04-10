<script setup lang="ts">
import getComponents from "~/composables/componentApi";
import type { searchParams } from "~/types/components";

const { getMeetings, getNotifications } = getComponents();

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

onMounted(async () => {
  await getMeetings(meetings_params);
  await getNotifications(notifications_params);
});

definePageMeta({
  layout: "landing-home",
});
</script>

<template>
  <!-- <HeroSinglefeature /> -->
  <article class="cus-article container-xxl d-flex flex-column">
    <!-- <ContentobjectRow object-type="update" /> -->
    <ContentobjectRow object-type="meeting" :objects="meetings" />
    <ContentobjectRow object-type="notification" :objects="notifications" />
  </article>
</template>
