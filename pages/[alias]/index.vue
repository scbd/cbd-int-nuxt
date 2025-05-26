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
});
</script>

<template>
  <div class="container-xxl d-flex">
    <article class="cus-article container-fluid d-flex flex-column">
      <ClientOnly>
        <template v-if="route.meta.pageType === 'page'">
          <Breadcrumbs :page="referencedPage" />
        </template>
        <template v-else-if="route.meta.pageType === 'componentMeeting'">
          <Breadcrumbs :content="referencedMeetings" />
        </template>
        <template v-else-if="route.meta.pageType === 'componentNotification'">
          <Breadcrumbs :content="referencedNotifications" />
        </template>
        <template v-else-if="route.meta.pageType === 'componentStatement'">
          <Breadcrumbs :content="referencedStatements" />
        </template>
        <template v-else-if="route.meta.pageType === 'componentNbsap'">
          <Breadcrumbs :content="referencedNbsaps" />
        </template>
        <template v-else-if="route.meta.pageType === 'componentPortal'">
          <Breadcrumbs :content="referencedPortals" />
        </template>
        <template v-else-if="route.meta.pageType === 'componentArticle'">
          <Breadcrumbs :content="referencedArticles" />
          <HeroContent :article="referencedArticles" />
        </template>
      </ClientOnly>
      <ClientOnly>
        <section
          v-html="contentParser(referencedPage?.content, 'page')"
          class="rendered-content"
        ></section>
      </ClientOnly>
    </article>
  </div>
</template>
