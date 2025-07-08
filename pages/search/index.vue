<script setup lang="ts">
import type { drupalEntitySearchParams } from "~/types/drupalEntityApi";
import type {
  componentGaiaType,
  componentSanitized,
  searchParams,
} from "~/types/components";
import getComponents, {
  referencedComponents,
} from "~/composables/componentApi";
import FormPagination from "~/components/form/FormPagination.vue";

const route = useRoute();
const { t } = useI18n();

const { getGaiaComponents } = getComponents();

const searchParams: searchParams = {
  q: "",
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
    "recipient_ss",
    "fulltext_??_s",
    "symbol_s",
    "date_s",
    "actionDate_s",
    "deadline_s",
    "sender",
    "reference_s",
  ],
  sort: {
    createdDate_dt: "desc",
    date_s: "desc",
    startDate_dt: "desc",
  },
  rows: 20,
};

const componentTypes: componentGaiaType = [
  "meeting",
  "notification",
  "statement",
];
await getGaiaComponents(searchParams, componentTypes);

const updates = ref<componentSanitized[]>([]);

definePageMeta({
  layout: "serp",
});
</script>
<template>
  <article class="cus-article container-xxl d-flex flex-column">
    <section>
      <FormFilterAndSort
        :search-params="searchParams"
        :component-types="componentTypes"
      />
    </section>
    <ClientOnly>
      <section class="search-results">
        <FormPagination
          :component-types="componentTypes"
          :component-search="searchParams"
        />
        <div class="search-results-items">
          <ContentobjectSerpBlock
            v-for="update in referencedComponents.searchResults.sort(
              (a, b) => b.date.getTime() - a.date.getTime()
            )"
            :component="update"
          />
        </div>
      </section>
    </ClientOnly>
  </article>
</template>
