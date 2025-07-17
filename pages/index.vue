<script setup lang="ts">
import getComponents, {
  referencedGbfTargets,
} from "~/composables/componentApi";
import type { componentSanitized, searchParams } from "~/types/components";
import type { drupalEntitySearchParams } from "~/types/drupalEntityApi";

const languageSettings = useLanguageStore();

const { getArticles, getGbfTargets, getPortals, getGaiaComponents } =
  getComponents();

const articlesParams: drupalEntitySearchParams = {
  entity: "article",
  sort: ["-changed"],
  limit: 4,
};

const meetingsParams: searchParams = {
  q: "",
  fl: [
    "schema_s",
    "symbol_s",
    "startDate_dt",
    "endDate_dt",
    "title_??_s",
    "themes_??_ss",
    "url_ss",
    "symbol_s",
    "eventCity_*_s",
    "eventCountry_??_s",
    "status_s",
  ],
  sort: {
    "abs(ms(startDate_dt,NOW))": "asc",
  },
  rows: 4,
};

const notificationsParams: searchParams = {
  q: "",
  fl: [
    "schema_s",
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
    date_s: "desc",
  },
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
  q: "",
  fl: ["schema_s", "symbol_s", "date_s", "url_ss", "title_??_s"],
  sort: {
    date_s: "desc",
  },
  rows: 4,
};

const nbsapsParams: searchParams = {
  q: "",
  fl: ["schema_s", "submittedDate_s", "url_ss", "title_??_s"],
  sort: { submittedDate_s: "desc" },
  rows: 4,
};

const referencedUpdates = ref<componentSanitized[]>([]);

const handleUpdates = async () => {
  const updates: componentSanitized[] = [];

  updates.push(
    ...referencedArticles.value.general,
    ...referencedMeetings.value.general,
    ...referencedNotifications.value.general
  );

  referencedUpdates.value = updates
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 4);
};

Promise.allSettled([
  await getArticles(articlesParams),
  await getGaiaComponents(meetingsParams, ["meeting"]),
  await getGaiaComponents(notificationsParams, ["notification"]),
  await getGaiaComponents(statementsParams, ["statement"]),
]).then((results) => {
  handleUpdates();
});

await getGbfTargets(gbfTargetsParams);
await getPortals();
await getGaiaComponents(nbsapsParams, ["nbsap"]);

const gbfSliceInt = Math.floor(Math.random() * 19);

watch(languageSettings, async () => {
  await getArticles(articlesParams);
  await getGbfTargets(gbfTargetsParams);
  await getPortals();
});

watch(referencedArticles.value, () => {
  handleUpdates();
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
      <ContentobjectRow
        component-type="update"
        :components="referencedUpdates"
      />
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
      <ContentobjectRow
        component-type="nbsap"
        :components="referencedNbsaps.general"
      />
    </ClientOnly>
  </article>
</template>
