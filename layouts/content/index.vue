<script setup lang="ts">
import type { fetchedMenuItem } from "~/types/drupalMenu";

const route = useRoute();

const submenuItems = ref<fetchedMenuItem[]>([]);

if (referencedPage.value?.field_menu) {
  await handlerSubmenuNavigation(referencedPage.value.field_menu);

  const currentPath = route.path;
  const fullPath = route.fullPath;

  for await (const menuItem of submenu.value) {
    for (const childItem of menuItem.children) {
      if (currentPath.includes(childItem.link)) {
        submenuItems.value.push(menuItem);
      } else {
        for (const grandchildItem of childItem.children) {
          if (
            currentPath.includes(grandchildItem.link) ||
            fullPath.includes(grandchildItem.link)
          ) {
            submenuItems.value.push(menuItem);
          }
        }
      }
    }
  }
}
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
    <main
      class="cus-main d-flex flex-column"
      :class="route.meta.pageType === 'page' ? 'cus-internal-page' : ''"
      role="main"
    >
      <NavigationSubmenuHorizontal
        v-if="referencedPage && route.fullPath.includes(referencedPage.url)"
        :submenu-items="submenuItems"
      />
      <NuxtPage :page-key="(route) => route.fullPath" />
    </main>
    <Footer />
  </div>
</template>
