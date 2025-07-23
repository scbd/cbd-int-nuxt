<script setup lang="ts">
import type { pageParamaters } from "~/types/page";
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

await getPages(params);
if (referencedPage.value) {
  await getSubmenuNavigation(referencedPage.value.field_menu);
  console.log(referencedPage.value.field_menu);
}

const submenuInfo = await handleSubmenus(routeArray);
console.dir(submenuInfo.submenuItems.value);

definePageMeta({
  layout: "content",
  pageType: "page",
});

watch(languageSettings, async () => {
  if (referencedPage.value) {
    await getSubmenuNavigation(referencedPage.value.field_menu);
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
        :submenu-items="submenuInfo.submenuItems.value"
        :submenu-index="submenuInfo.displayChildren.value"
      />
    </ClientOnly>

    <div class="container-xxl d-flex">
      <ClientOnly>
        <NavigationSubmenuVertical
          v-if="referencedPage && submenuInfo.displayVerticalNav.value"
          :submenu-items="submenuInfo.submenuItems.value"
        />
      </ClientOnly>

      <article class="cus-article container-fluid d-flex flex-column">
        <ClientOnly>
          <template v-if="route.meta.pageType === 'page'">
            <Breadcrumbs
              :page="referencedPage"
              :submenuItemIndex="submenuInfo.pathItems.value"
            />
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
