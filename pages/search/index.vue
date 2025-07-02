<script setup lang="ts">
import type { drupalEntitySearchParams } from "~/types/drupalEntityApi";
import type { componentSanitized, searchParams } from "~/types/components";
import getComponents from "~/composables/componentApi";
import FormPagination from "~/components/form/FormPagination.vue";

const route = useRoute();
const { t } = useI18n();

const { getArticles, getMeetings, getNotifications, getStatements } =
  getComponents();

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
    "title_*_s",
    "themes_??_ss",
    "url_ss",
    "symbol_s",
    "eventCity_*_s",
    "eventCountry_??_s",
    "status_s",
  ],
  sort: ["abs(ms(startDate_dt,NOW)) asc"],
  rows: 20,
};

const notificationsParams: searchParams = {
  q: (route.meta.notificationQuery as string) ?? "schema_s:notification",
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
    "files_ss",
  ],
  sort: ["date_s desc"],
  rows: 20,
};

const statementsParams: searchParams = {
  q: (route.meta.statementQuery as string) ?? "schema_s:statement",
  fl: ["symbol_s", "date_s", "url_ss", "title_??_s", "themes_??_ss"],
  sort: ["date_s desc"],
  rows: 20,
};

// const updates: componentSanitized[] = [];
const updates = ref<componentSanitized[]>([]);

await getMeetings(meetingsParams);
await getNotifications(notificationsParams);
await getStatements(statementsParams);

updates.value = [
  referencedMeetings.value.general,
  referencedNotifications.value.general,
  referencedStatements.value.general,
].flat();
updates.value.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 20);

definePageMeta({
  layout: "serp",
});

watch(referencedMeetings, () => {
  console.log("CHANGE!");
  console.log(referencedMeetings);
});
</script>
<template>
  <article class="cus-article container-xxl d-flex flex-column">
    <section>
      <FormFilterAndSort
        :search-params="[meetingsParams, notificationsParams, statementsParams]"
        component-type="updates"
      />
    </section>
    <ClientOnly>
      <section class="search-results">
        <div class="search-results-items">
          <ContentobjectSerpBlock
            v-for="update in [
              ...referencedMeetings.general,
              ...referencedNotifications.general,
              ...referencedStatements.general,
            ]
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .slice(0, 100)"
            :component="update"
          />
        </div>
      </section>
    </ClientOnly>
  </article>
</template>
