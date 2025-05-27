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

// await getPages(params).then(async (page) => {
//   if (page?.field_menu) {
//     await handlerSubmenuNavigation(page.field_menu).then(async (submenu) => {
//       if (submenu) {
//         for (const menuItem of submenu) {
//           for (const childItem of menuItem.children) {
//             if (currentPath.includes(childItem.link)) {
//               submenuItems.value.push(menuItem);
//             } else {
//               for (const grandchildItem of childItem.children) {
//                 if (
//                   currentPath.includes(grandchildItem.link) ||
//                   fullPath.includes(grandchildItem.link)
//                 ) {
//                   submenuItems.value.push(menuItem);
//                 }
//               }
//             }
//           }
//         }
//       }
//     });
//   }
// });

await getPages(params);
if (referencedPage.value) {
  await handlerSubmenuNavigation(referencedPage.value.field_menu);
  if (submenu.value.length > 0) {
    for (const menuItem of submenu.value) {
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
