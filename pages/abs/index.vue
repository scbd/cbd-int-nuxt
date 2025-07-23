<script setup lang="ts">
import getComponents from "~/composables/componentApi";
import type { componentSanitized, searchParams } from "~/types/components";
import type { drupalEntitySearchParams } from "~/types/drupalEntityApi";

const languageSettings = useLanguageStore();
const route = useRoute();

const { getArticles, getGaiaComponents } = getComponents();

const articlesParams: drupalEntitySearchParams = {
  entity: "article",
  sort: ["-changed"],
  limit: 4,
};

const meetingsParams: searchParams = {
  q: "realm_ss:abs",
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
    "realm_ss",
  ],
  sort: {
    "abs(ms(startDate_dt,NOW))": "asc",
  },
  rows: 4,
};

const notificationsParams: searchParams = {
  q: "realm_ss:abs",
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
    "realm_ss",
  ],
  sort: {
    date_s: "desc",
  },
  rows: 4,
};

const statementsParams: searchParams = {
  q: "realm_ss:abs",
  fl: ["schema_s", "symbol_s", "date_s", "url_ss", "title_??_s", "realm_ss"],
  sort: {
    date_s: "desc",
  },
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

const routeArray = route.fullPath
  .split("/")
  .filter((step) => step.trim() != "");

Promise.allSettled([
  await getArticles(articlesParams),
  await getGaiaComponents(meetingsParams, ["meeting"]),
  await getGaiaComponents(notificationsParams, ["notification"]),
  await getGaiaComponents(statementsParams, ["statement"]),
  await getSubmenuNavigation("cbd-header-nagoya-protocol"),
]).then(async (results) => {
  handleUpdates();
});

const submenuInfo = await handleSubmenus(routeArray);

watch(languageSettings, async () => {
  await getArticles(articlesParams);
});

watch(referencedArticles.value, () => {
  handleUpdates();
});

definePageMeta({
  layout: "landing-protocol",
  protocol: "nagoya",
});
</script>

<template>
  <ClientOnly>
    <Hero :articles="referencedArticles.general.slice(0, 3)" />
    <NavigationSubmenuHorizontal
      :submenu-items="submenuInfo.submenuItems.value"
      :submenu-index="submenuInfo.displayChildren.value"
      :protocol="'nagoya'"
    />
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
        component-type="statement"
        :components="referencedStatements.general"
      />
    </ClientOnly>
  </article>
</template>
