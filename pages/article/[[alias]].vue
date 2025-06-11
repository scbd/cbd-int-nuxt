<script setup lang="ts">
import getComponents from "~/composables/componentApi";
import type { drupalEntitySearchParams } from "~/types/drupalEntityApi";

const languageSettings = useLanguageStore();

const { getArticles } = getComponents();

const route = useRoute();

const articleParams: drupalEntitySearchParams = {
  entity: "content-page",
  fl: route.fullPath,
  limit: 1,
};

await getArticles(articleParams);

definePageMeta({
  layout: "content",
  pageType: "componentArticle",
});

watch(languageSettings, async () => {
  await getArticles(articleParams);
});
</script>
<template>
  <div class="container-xxl d-flex">
    <article class="cus-article container-fluid d-flex flex-column">
      <ClientOnly>
        <template v-for="article in referencedArticles">
          <section
            v-html="contentParser(article.content)"
            class="rendered-content"
          ></section>
        </template>
      </ClientOnly>
    </article>
  </div>
</template>
