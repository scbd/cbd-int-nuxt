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
      <template v-if="route.meta.pageType === 'componentMeeting'">
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
    <main class="cus-main d-flex flex-column" role="main">
      <NavigationSubmenuHorizontal
        v-if="
          referencedPage?.field_menu &&
          route.fullPath.includes(referencedPage.url)
        "
        :submenu-name="referencedPage.field_menu"
      />
      <NuxtPage :page-key="(route) => route.fullPath" />
    </main>
    <Footer />
  </div>
</template>
