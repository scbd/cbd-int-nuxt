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
    <ClientOnly>
      <template
        v-if="
          route.meta.pageType === 'componentMeeting' ||
          route.meta.pageType === 'componentNotification' ||
          route.meta.pageType === 'componentStatement' ||
          route.meta.pageType === 'componentNbsap'
        "
      >
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
