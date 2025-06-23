<script setup lang="ts">
const route = useRoute();

const fetchedArticle = [referencedArticles.value.general[0]];
</script>

<template>
  <div class="body-replace">
    <header class="cus-navigation">
      <nav class="navbar navbar-expand-xl d-flex flex-column">
        <NavigationOptions />
        <NavigationMegamenu />
      </nav>
    </header>
    <ClientOnly>
      <template v-if="route.meta.pageType === 'componentArticle'">
        <Breadcrumbs />
        <HeroContent :article="fetchedArticle" />
      </template>
      <template v-else-if="route.meta.pageType === 'componentMeeting'">
        <Breadcrumbs />
      </template>
      <template v-else-if="route.meta.pageType === 'componentNotification'">
        <Breadcrumbs />
      </template>
      <template v-else-if="route.meta.pageType === 'componentStatement'">
        <Breadcrumbs />
      </template>
      <template v-else-if="route.meta.pageType === 'componentNbsap'">
        <Breadcrumbs />
      </template>
      <template v-else-if="route.meta.pageType === 'componentPortal'">
        <Breadcrumbs />
      </template>
    </ClientOnly>
    <main
      class="cus-main d-flex flex-column"
      :class="[{ 'cus-internal-page': route.meta.pageType === 'page' }]"
      role="main"
    >
      <NuxtPage :page-key="(route) => route.fullPath" />
    </main>
    <Footer />
  </div>
</template>
