<script setup lang="ts">
import getComponents from "~/composables/componentApi";
import type { drupalEntitySearchParams } from "~/types/drupalEntityApi";
import type { componentSanitized } from "~/types/components";

const languageSettings = useLanguageStore();

const { getArticles } = getComponents();

const route = useRoute();

const articleParams: drupalEntitySearchParams = {
  entity: "content-page",
  fl: route.fullPath,
  limit: 1,
};

const fetchedArticle = ref<componentSanitized[]>(
  (await getArticles(articleParams)) as componentSanitized[]
);

definePageMeta({
  layout: "content",
  pageType: "componentArticle",
});

watch(languageSettings, async () => {
  await getArticles(articleParams).then((article) => {
    fetchedArticle.value = article!;
  });
});
</script>
<template>
  <ClientOnly>
    <Breadcrumbs />
    <HeroContent :article="fetchedArticle" />
  </ClientOnly>
  <div class="container-xxl d-flex">
    <article class="cus-article container-fluid d-flex flex-column">
      <ClientOnly>
        <template v-for="article in referencedArticles.general">
          <section
            v-html="contentParser(article.content)"
            class="rendered-content"
          ></section>
        </template>
      </ClientOnly>
    </article>
  </div>
</template>
