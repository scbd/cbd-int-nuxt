<script setup lang="ts">
import type { pageParamaters } from "~/types/page";
import getPages from "~/composables/pageApi";

const route = useRoute();

const params: pageParamaters = {
  alias: route.path,
};

await getPages(params);

definePageMeta({
  layout: "content",
  pageType: "page",
});
</script>

<template>
  <div class="container-xxl d-flex">
    <article class="cus-article container-fluid d-flex flex-column">
      <ClientOnly>
        <section
          v-html="referencedPage?.content"
          class="rendered-content"
        ></section>
      </ClientOnly>
    </article>
  </div>
</template>
