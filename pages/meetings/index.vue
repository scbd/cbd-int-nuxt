<script setup lang="ts">
import type {
  componentGaiaType,
  componentSanitized,
  searchParams,
} from "~/types/components";
import getComponents from "~/composables/componentApi";
import FormPagination from "~/components/form/FormPagination.vue";

const route = useRoute();
const { t } = useI18n();

const { getGaiaComponents } = getComponents();

const meetingsParams: searchParams = {
  q: (route.meta.meetingQuery as string) ?? "",
  fl: [
    "schema_s",
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
    createdDate_dt: "desc",
  },
  rows: 20,
};

const componentTypes: componentGaiaType = ["meeting"];
await getGaiaComponents(meetingsParams, componentTypes);

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
        :search-params="meetingsParams"
        :component-types="componentTypes"
      />
    </section>

    <ClientOnly>
      <section class="search-results">
        <FormPagination
          :component-types="componentTypes"
          :component-search="meetingsParams"
        />
        <div class="search-results-items">
          <ContentobjectSerpBlock
            v-for="meeting in referencedMeetings.general"
            :component="meeting"
          />
        </div>
        <FormPagination
          :component-types="componentTypes"
          :component-search="meetingsParams"
        />
      </section>
    </ClientOnly>
  </article>
</template>
