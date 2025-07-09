<script setup lang="ts">
import type { componentGaiaType, searchParams } from "~/types/components";
import getComponents from "~/composables/componentApi";
import FormPagination from "~/components/form/FormPagination.vue";

const route = useRoute();
const { t } = useI18n();

const { getGaiaComponents } = getComponents();

const statementsParams: searchParams = {
  q: route.meta.statementQuery as string,
  fl: [
    "schema_s",
    "symbol_s",
    "date_s",
    "url_ss",
    "title_??_s",
    "themes_??_ss",
  ],
  sort: {
    date_s: "desc",
  },
  rows: 20,
};
const componentTypes: componentGaiaType = ["statement"];

await getGaiaComponents(statementsParams, componentTypes);

definePageMeta({
  layout: "serp",
  acceptStatementData: true,
});
</script>
<template>
  <article class="cus-article container-xxl d-flex flex-column">
    <section>
      <h1>{{ t("components.statements.name_plural") }}</h1>
      <p>{{ t("forms.search_criteria") }}</p>
    </section>
    <section>
      <FormFilterAndSort
        :search-params="statementsParams"
        :component-types="componentTypes"
      />
    </section>

    <ClientOnly>
      <section class="search-results">
        <FormPagination
          :component-types="componentTypes"
          :component-search="statementsParams"
        />
        <div class="search-results-items">
          <ContentobjectSerpBlock
            v-for="statement in referencedStatements.general"
            :component="statement"
          />
        </div>
        <FormPagination
          :component-types="componentTypes"
          :component-search="statementsParams"
        />
      </section>
    </ClientOnly>
  </article>
</template>
