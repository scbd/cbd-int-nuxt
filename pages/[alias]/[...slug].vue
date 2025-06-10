<script setup lang="ts">
import type { pageParamaters } from "~/types/page";
import type { fetchedMenuItem } from "~/types/drupalMenu";
import getPages from "~/composables/pageApi";
import type { RefSymbol } from "@vue/reactivity";

const route = useRoute();
const languageSettings = useLanguageStore();

const submenuItems = ref<fetchedMenuItem[]>([]);

const params: pageParamaters = {
  alias: route.path,
};

const routeArray = route.fullPath
  .split("/")
  .filter((step) => step.trim() != "");

const displayChildren = ref<number>(0);
const displayVerticalNav = ref<boolean>(false);

await getPages(params);
if (referencedPage.value) {
  await handlerSubmenuNavigation(referencedPage.value.field_menu);
  if (submenu.value.length > 0) {
    submenuItems.value.length = 0;
    for await (const [level2Index, level2Item] of submenu.value.entries()) {
      if (level2Item.link.includes(routeArray[routeArray.length - 1])) {
        submenuItems.value.push(level2Item);
        displayChildren.value = level2Index;
      } else {
        for (const level3Item of level2Item.children) {
          if (level3Item.link.includes(routeArray[routeArray.length - 1])) {
            submenuItems.value.push(level2Item);
            displayChildren.value = level2Index;
            if (level3Item.children.length > 0) {
              displayVerticalNav.value = true;
            }
          } else {
            for (const level4Item of level3Item.children) {
              if (level4Item.link.includes(routeArray[routeArray.length - 1])) {
                submenuItems.value.push(level2Item);
                displayChildren.value = level2Index;
                displayVerticalNav.value = true;
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
  // embedIframe.value!.style.height = `${embedIframe.value?.contentWindow?.document.body.scrollHeight}px`;
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
          <h2>National targets submitted to the Secretariat</h2>
          <iframe
            ref="embedIframe"
            class="embedIframe"
            :src="`https://ort.cbd.int/${languageSettings.active_language}/national-targets/analyzer?embed=true&recordTypes=nationalTarget7&globalTargets=GBF-TARGET-${Number(routeArray[routeArray.length - 1]) < 10 ? '0' + routeArray[routeArray.length - 1] : routeArray[routeArray.length - 1]}`"
          ></iframe>
        </section>
      </article>
    </div>
  </div>
</template>
