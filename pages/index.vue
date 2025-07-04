<script setup lang="ts">
import getComponents, {
  referencedGbfTargets,
} from "~/composables/componentApi";
import type { searchParams, componentSanitized } from "~/types/components";
import type { drupalEntitySearchParams } from "~/types/drupalEntityApi";

const languageSettings = useLanguageStore();

const {
  getArticles,
  getMeetings,
  getNotifications,
  getGbfTargets,
  getStatements,
  getPortals,
  getNbsaps,
} = getComponents();

const articlesParams: drupalEntitySearchParams = {
  entity: "article",
  sort: ["-changed"],
  limit: 4,
};

const meetingsParams: searchParams = {
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
  sort: ["abs(ms(startDate_dt,NOW)) asc"],
  rows: 4,
};

const notificationsParams: searchParams = {
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
  sort: ["date_s desc"],
  rows: 4,
};

const gbfTargetsParams: drupalEntitySearchParams = {
  entity: "gbf-targets",
  conditions: {
    "filter[field_menu][operator]": "CONTAINS",
    "filter[field_menu][value]": "cbd-gbf",
  },
  sort: ["changed"],
  limit: 4,
};

const statementsParams: searchParams = {
  q: "schema_s:statement",
  fl: ["symbol_s", "date_s", "url_ss", "title_??_s"],
  sort: ["date_s desc"],
  rows: 4,
};

const nbsapsParams: searchParams = {
  q: "schema_s:nbsap",
  fl: ["submittedDate_s", "url_ss", "title_??_s"],
  sort: ["submittedDate_s desc"],
  rows: 4,
};

const updates: componentSanitized[] = [];

const articles = (await getArticles(articlesParams)) ?? [];
const meetings = (await getMeetings(meetingsParams)) ?? [];
const notifications = (await getNotifications(notificationsParams)) ?? [];
await getStatements(statementsParams);
await getGbfTargets(gbfTargetsParams);
await getPortals();
await getNbsaps(nbsapsParams);

updates.push(...articles, ...meetings, ...notifications);
const sortedUpdates = updates
  .sort((a, b) => b.date.getTime() - a.date.getTime())
  .slice(0, 4);

const gbfSliceInt = Math.floor(Math.random() * 19);

watch(languageSettings, async () => {
  await getArticles(articlesParams);
  await getGbfTargets(gbfTargetsParams);
  await getPortals();
});

definePageMeta({
  layout: "landing-home",
});
</script>

<template>
  <ClientOnly>
    <Hero :articles="referencedArticles.general.slice(0, 3)" />
  </ClientOnly>

  <article class="cus-article container-xxl d-flex flex-column">
    <ClientOnly>
      <ContentobjectRow component-type="update" :components="sortedUpdates" />
      <ContentobjectRow
        component-type="meeting"
        :components="referencedMeetings.general"
      />
      <ContentobjectRow
        component-type="notification"
        :components="referencedNotifications.general"
      />
      <ContentobjectRow
        component-type="GBF Target"
        :components="referencedGbfTargets.slice(gbfSliceInt, gbfSliceInt + 3)"
      />
      <ContentobjectRow
        component-type="statement"
        :components="referencedStatements.general"
      />
      <ContentobjectRow
        component-type="portal"
        :components="referencedPortals"
      />
      <ContentobjectRow component-type="nbsap" :components="referencedNbsaps" />
    </ClientOnly>
  </article>
</template>
