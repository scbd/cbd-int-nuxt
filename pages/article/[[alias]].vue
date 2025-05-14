<script setup lang="ts">
import type { searchParams } from "~/types/components";
import getComponents from "~/composables/componentApi";

const { getArticles } = getComponents();

const route = useRoute();

const articleParams: searchParams = {
  q: "content-page",
  fl: route.fullPath,
  rows: 1,
};

await getArticles(articleParams);

watch(activeLanguage, async () => {
  await getArticles(articleParams);
});

definePageMeta({
  layout: "content",
});
</script>
<template>
  <div class="container-xxl d-flex">
    <article class="cus-article container-fluid d-flex flex-column">
      <ClientOnly>
        <template v-for="article in referencedArticles">
          <section v-html="article.content" class="rendered-content"></section>
        </template>
      </ClientOnly>
    </article>
  </div>
</template>
