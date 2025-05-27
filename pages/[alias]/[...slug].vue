<script setup lang="ts">
import type { pageParamaters } from "~/types/page";
import type { fetchedMenuItem } from "~/types/drupalMenu";
import getPages from "~/composables/pageApi";

const route = useRoute();
const submenuItems = ref<fetchedMenuItem[]>([]);

const params: pageParamaters = {
  alias: route.path,
};

const currentPath = route.path;
const fullPath = route.fullPath;

const displayVerticalNav = ref<boolean>(false);

await getPages(params);
if (referencedPage.value) {
  await handlerSubmenuNavigation(referencedPage.value.field_menu);
  if (submenu.value.length > 0) {
    for (const level2Item of submenu.value) {
      for (const level3Item of level2Item.children) {
        if (currentPath.includes(level3Item.link)) {
          submenuItems.value.push(level2Item);
        } else {
          for (const level4Item of level3Item.children) {
            if (
              currentPath.includes(level4Item.link) ||
              fullPath.includes(level4Item.link)
            ) {
              submenuItems.value.push(level2Item);
            }
          }
        }
        if (
          currentPath.includes(level3Item.link) &&
          level3Item.children.length > 0
        ) {
          displayVerticalNav.value = true;
        }
      }
    }
  }
}

definePageMeta({
  layout: "content",
  pageType: "page",
});
</script>

<template>
  <div class="main-wrapper">
    <ClientOnly>
      <NavigationSubmenuHorizontal
        v-if="referencedPage && route.fullPath.includes(referencedPage.url)"
        :submenu-items="submenuItems"
      />
    </ClientOnly>

    <div class="container-xxl d-flex">
      <ClientOnly>
        <NavigationSubmenuVertical
          v-if="referencedPage && displayVerticalNav"
          :submenu-items="submenuItems"
        />
      </ClientOnly>

      <article class="cus-article container-fluid d-flex flex-column">
        <ClientOnly>
          <template v-if="route.meta.pageType === 'page'">
            <Breadcrumbs :page="referencedPage" />
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
  </div>
</template>
