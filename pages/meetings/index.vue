<script setup lang="ts">
import type { searchParams } from "~/types/components";
import getComponents from "~/composables/componentApi";
import FormPagination from "~/components/form/FormPagination.vue";

const route = useRoute();
const { t } = useI18n();

const { getMeetings } = getComponents();

const meetingssParams: searchParams = {
  q: (route.meta.meetingQuery as string) ?? "schema_s:meeting",
  fl: [
    "startDate_dt",
    "endDate_dt",
    "EVT_CD",
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

await getMeetings(meetingssParams);

definePageMeta({
  layout: "serp",
  acceptMeetingData: true,
});
</script>
<template>
  <article class="cus-article container-xxl d-flex flex-column">
    <section>
      <h1>{{ t("components.meetings.name_plural") }}</h1>
      <p>{{ t("forms.search_criteria") }}</p>
    </section>
    <section>
      <FormFilterAndSort
        :search-params="meetingssParams"
        component-type="meeting"
      />
    </section>

    <ClientOnly>
      <section class="search-results">
        <FormPagination />
        <div class="search-results-items">
          <ContentobjectSerpBlock
            v-for="meeting in referencedMeetings.general"
            :component="meeting"
          />
        </div>
        <FormPagination />
      </section>
    </ClientOnly>
  </article>
</template>
