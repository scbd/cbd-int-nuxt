<script setup lang="ts">
import type { fetchedMenuItem } from "~/types/drupalMenu";

const { t } = useI18n();

const props = defineProps<{
  parent: fetchedMenuItem;
}>();
</script>

<template>
  <nav class="mega-menu-drawer dropdown-menu container-fluid">
    <ul class="mega-menu-drawer-internal nav">
      <li class="sections-header">{{ t("navigation.megamenu.sections") }}</li>
      <li class="level-1-item nav-item">
        <NuxtLink
          class="nav-link"
          :to="parent.link !== '<nolink>' ? parent.link : ''"
        >
          {{ parent.title }}
        </NuxtLink>
      </li>

      <div
        v-if="parent.children.length > 0"
        :style="
          parent.children.length < 5
            ? `--level2-column-count: ${parent.children.length}`
            : ''
        "
        class="level-2-items"
      >
        <NavigationMegamenuLevel2 :parent="parent" />
      </div>
    </ul>

    <NavigationMegamenuSocialmedia />
  </nav>
</template>
