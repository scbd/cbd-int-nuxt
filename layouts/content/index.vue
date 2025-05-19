<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="body-replace">
    <header class="cus-navigation">
      <nav class="navbar navbar-expand-xl d-flex flex-column">
        <NavigationOptions />
        <NavigationMegamenu />
      </nav>
    </header>
    {{ route.meta.componentType }}
    <ClientOnly>
      <template
        v-if="
          route.meta.pageType === 'page' ||
          route.meta.pageType === 'componentMeeting' ||
          route.meta.pageType === 'componentNotification' ||
          route.meta.pageType === 'componentStatement'
        "
      >
        <Breadcrumbs :page="referencedPage" />
      </template>
      <template v-else-if="route.meta.pageType === 'componentArticle'">
        <Breadcrumbs :content="referencedArticles" />
        <HeroContent :article="referencedArticles" />
      </template>
    </ClientOnly>
    <main class="cus-main d-flex flex-column" role="main">
      <NuxtPage :page-key="(route) => route.fullPath" />
    </main>
    <Footer />
  </div>
</template>
