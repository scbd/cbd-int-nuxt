<script setup lang="ts">
import type { drupalEntitySearchParams } from "~/types/drupalEntityApi";
import getComponents from "~/composables/componentApi";

const route = useRoute();
const { t } = useI18n();

const { getArticles } = getComponents();

const articlesParams: drupalEntitySearchParams = {
  entity: "article",
  sort: ["-changed"],
  limit: 20,
};

await getArticles(articlesParams);

definePageMeta({
  layout: "serp",
  acceptArticleData: true,
});
</script>
<template>
  <article class="cus-article container-xxl d-flex flex-column">
    <section>
      <h1>{{ t("components.articles.name_plural") }}</h1>
      <p>{{ t("forms.search_criteria") }}</p>
    </section>
    <section>
      <!-- <FormFilterAndSort :search-params="statementsParams" /> -->
    </section>

    <ClientOnly>
      <section class="search-results">
        <!-- pagination -->
        <div class="search-results-items">
          <ContentobjectSerpBlock
            v-for="article in referencedArticles.general"
            :component="article"
          />
        </div>
      </section>
    </ClientOnly>
  </article>
</template>
