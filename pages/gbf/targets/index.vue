<script setup lang="ts">
import type { pageParamaters } from "~/types/page";
import type { fetchedMenuItem } from "~/types/drupalMenu";
import getPages from "~/composables/pageApi";

const route = useRoute();
const languageSettings = useLanguageStore();
const { t } = useI18n();

const submenuItems = ref<fetchedMenuItem[]>([]);

const params: pageParamaters = {
  alias: route.path,
};

const pathItems = ref<{
  level2?: number;
  level3?: number;
  level4?: number;
}>({});

const displayChildren = ref<number>(0);
const displayVerticalNav = ref<boolean>(false);

await getPages(params);
if (referencedPage.value) {
  await handlerSubmenuNavigation(referencedPage.value.field_menu);
  if (submenu.value.length > 0) {
    submenuItems.value.length = 0;
    for await (const [level2Index, level2Item] of submenu.value.entries()) {
      if (level2Item.link === route.path) {
        submenuItems.value.push(level2Item);
        displayChildren.value = level2Index;
        pathItems.value.level2 = level2Index;
      } else {
        for (const [level3Index, level3Item] of level2Item.children.entries()) {
          if (level3Item.link === route.path) {
            submenuItems.value.push(level2Item);
            displayChildren.value = level2Index;
            pathItems.value.level2 = level2Index;
            pathItems.value.level3 = level3Index;
            if (level3Item.children.length > 0) {
              displayVerticalNav.value = true;
            }
          } else {
            for (const [
              level4Index,
              level4Item,
            ] of level3Item.children.entries()) {
              if (level4Item.link === route.path) {
                submenuItems.value.push(level2Item);
                displayChildren.value = level2Index;
                displayVerticalNav.value = true;
                pathItems.value.level2 = level2Index;
                pathItems.value.level3 = level3Index;
                pathItems.value.level4 = level4Index;
              }
            }
          }
        }
      }
    }

    if (submenuItems.value.length === 0) {
      submenuItems.value = [submenu.value[0]];
    }
  }
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

const embedIframe = useTemplateRef("embedIframe");

onMounted(() => {
  window.addEventListener(
    "message",
    (event) => {
      if (event.origin == "https://ort.cbd.int") {
        const message: { height: number; type: string } = JSON.parse(
          event.data
        );
        embedIframe.value!.style.height = `${message.height}px`;
      }
    },
    false
  );
});
</script>
<template>
  <div class="main-wrapper">
    <ClientOnly>
      <NavigationSubmenuHorizontal
        v-if="referencedPage && route.fullPath.includes(referencedPage.url)"
        :submenu-items="submenuItems"
        :submenu-index="displayChildren"
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
            <Breadcrumbs :page="referencedPage" :submenu-items="submenuItems" />
          </template>
        </ClientOnly>
        <ClientOnly>
          <section
            v-html="contentParser(referencedPage?.content, 'page')"
            class="rendered-content"
          ></section>
        </ClientOnly>
        <section v-if="referencedPage?.field_menu === 'cbd-gbf'">
          <h2>{{ t("content_pages.gbf.targets_submitted") }}</h2>
          <iframe
            ref="embedIframe"
            class="embedIframe"
            :src="`https://ort.cbd.int/${languageSettings.active_language}/national-targets/analyzer?embed=true&recordTypes=nationalTarget7`"
          ></iframe>
        </section>
      </article>
    </div>
  </div>
</template>
