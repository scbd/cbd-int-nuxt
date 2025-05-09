<script setup lang="ts"></script>

<template>
  <header class="cus-navigation">
    <nav class="navbar navbar-expand-xl d-flex flex-column">
      <NavigationOptions />
      <NavigationMegamenu />
    </nav>
  </header>
  <ClientOnly>
    <template v-if="referencedArticles.length > 0">
      <Breadcrumbs :content="referencedArticles" />
      <HeroContent :article="referencedArticles" />
    </template>
  </ClientOnly>
  <main class="cus-main cus-landing-page d-flex flex-column" role="main">
    <NuxtPage :page-key="(route) => route.fullPath" />
  </main>
  <Footer />
</template>
