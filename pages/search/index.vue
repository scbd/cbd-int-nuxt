<script setup lang="ts">
import type { drupalEntitySearchParams } from "~/types/drupalEntityApi";
import type { componentGaiaType, searchParams } from "~/types/components";
import getComponents, {
  referencedComponents,
} from "~/composables/componentApi";
import FormPagination from "~/components/form/FormPagination.vue";

const route = useRoute();
const { t } = useI18n();

const { getGaiaComponents } = getComponents();

const componentSearch: searchParams = {
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
// await getGaiaComponents(componentSearch, componentTypes);

definePageMeta({
  layout: "serp",
  middleware: ["serp-middleware"],
});
</script>
<template>
  <article class="cus-article container-xxl d-flex flex-column">
    <section>
      <h1>{{ t("forms.search") }}</h1>
      <p>{{ t("forms.search_criteria") }}</p>
    </section>
    <section>
      <FormFilterAndSort
        :search-params="componentSearch"
        :component-types="componentTypes"
      />
    </section>
    <ClientOnly>
      <section class="search-results">
        <FormPagination
          :component-types="componentTypes"
          :component-search="componentSearch"
        />
        <div class="search-results-items">
          <ContentobjectSerpBlock
            v-for="update in referencedComponents.searchResults.sort(
              (a, b) => b.date.getTime() - a.date.getTime()
            )"
            :component="update"
          />
        </div>
        <FormPagination
          :component-types="componentTypes"
          :component-search="componentSearch"
        />
      </section>
    </ClientOnly>
  </article>
</template>
