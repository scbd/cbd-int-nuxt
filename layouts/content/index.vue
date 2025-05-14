<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <header class="cus-navigation">
    <nav class="navbar navbar-expand-xl d-flex flex-column">
      <NavigationOptions />
      <NavigationMegamenu />
    </nav>
  </header>
  <ClientOnly>
    <template v-if="referencedPage">
      <Breadcrumbs :page="referencedPage" />
    </template>
    <template v-else-if="referencedArticles.length > 0">
      <Breadcrumbs :content="referencedArticles" />
      <HeroContent :article="referencedArticles" />
    </template>
  </ClientOnly>
  <main class="cus-main d-flex flex-column" role="main">
    <NuxtPage :page-key="(route) => route.fullPath" />
  </main>
  <Footer />
</template>
