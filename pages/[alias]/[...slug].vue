<script setup lang="ts">
import type { pageParamaters, pagePathProp } from "~/types/page";
import type { fetchedMenuItem } from "~/types/drupalMenu";
import getPages from "~/composables/pageApi";

const route = useRoute();
const languageSettings = useLanguageStore();

const params: pageParamaters = {
  alias: route.path,
};

const routeArray = route.fullPath
  .split("/")
  .filter((step) => step.trim() != "");

const pathItems = ref<{
  [pathName: pagePathProp]: number;
}>({});

const displayChildren = ref<number>(0);
const displayVerticalNav = ref<boolean>(false);
const submenuStart = ref<number>(0);

const handleSubmenu = async (
  routeArray: string[],
  level = 0,
  items: fetchedMenuItem[]
) => {
  for (const [index, item] of items.entries()) {
    const itemArray = item.link.split("/").filter((step) => step.trim() != "");

    if (itemArray[itemArray.length - 1] === routeArray[level]) {
      pathItems.value[`level${level}`] = index;

      if (level === 0) {
        displayChildren.value = index;
      } else if (level >= 2) {
        displayVerticalNav.value = true;
      }

      level++;

      if (item.children) {
        handleSubmenu(routeArray, level, item.children);
      }
    } else {
      submenuStart.value = 1;
      if (
        itemArray.slice(1)[itemArray.slice(1).length - 1] ===
        routeArray.slice(1)[level]
      ) {
        pathItems.value[`level${level - 1}`] = index;

        if (level === 0) {
          displayChildren.value = index;
        } else if (level >= 2) {
          displayVerticalNav.value = true;
        }

        level++;

        if (item.children) {
          handleSubmenu(routeArray, level, item.children);
        }
      }
    }
  }
};

await getPages(params);
if (referencedPage.value) {
  await handlerSubmenuNavigation(referencedPage.value.field_menu).then(
    async () => {
      await handleSubmenu(routeArray, 0, submenu.value);
    }
  );
}

definePageMeta({
  layout: "content",
  pageType: "page",
});

watch(languageSettings, async () => {
  if (referencedPage.value) {
    await handlerSubmenuNavigation(referencedPage.value.field_menu);
  }
});
</script>

<template>
  <div class="main-wrapper">
    <ClientOnly>
      <NavigationSubmenuHorizontal
        v-if="referencedPage && route.fullPath.includes(referencedPage.url)"
        :submenu-index="displayChildren"
        :submenu-start="submenuStart"
      />
    </ClientOnly>

    <div class="container-xxl d-flex">
      <ClientOnly>
        <NavigationSubmenuVertical
          v-if="referencedPage && displayVerticalNav"
          :submenu-index="displayChildren"
        />
      </ClientOnly>

      <article class="cus-article container-fluid d-flex flex-column">
        <ClientOnly>
          <template v-if="route.meta.pageType === 'page'">
            <Breadcrumbs :page="referencedPage" :submenuItemIndex="pathItems" />
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
