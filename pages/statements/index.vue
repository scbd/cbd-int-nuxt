<script setup lang="ts">
import type { searchParams } from "~/types/components";
import getComponents from "~/composables/componentApi";
import FormPagination from "~/components/form/FormPagination.vue";

const route = useRoute();
const { t } = useI18n();

const { getStatements } = getComponents();

const statementsParams: searchParams = {
  q: (route.meta.statementQuery as string) ?? "schema_s:statement",
  fl: ["symbol_s", "date_s", "url_ss", "title_??_s", "themes_??_ss"],
  sort: ["date_s desc"],
  rows: 20,
};

await getStatements(statementsParams);

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
        component-type="statement"
      />
    </section>

    <ClientOnly>
      <section class="search-results">
        <FormPagination
          component-type="statement"
          :component-search="statementsParams"
        />
        <div class="search-results-items">
          <ContentobjectSerpBlock
            v-for="statement in referencedStatements.general"
            :component="statement"
          />
        </div>
        <FormPagination
          component-type="statement"
          :component-search="statementsParams"
        />
      </section>
    </ClientOnly>
  </article>
</template>
