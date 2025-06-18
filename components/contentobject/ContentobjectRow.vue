<script setup lang="ts">
import type { componentSanitized } from "~/types/components";

const props = defineProps<{
  componentType: string;
  components: componentSanitized[];
}>();

const { t } = useI18n();
</script>

<template>
  <ClientOnly>
    <section
      class="content-row d-flex flex-column"
      :class="[
        componentType === 'update' ? 'recent-updates' : componentType,
        { 'gbf-targets': componentType === 'GBF Target' },
      ]"
    >
      <div class="row-title">
        {{ t(`components.${componentType.replace(" ", "_")}s.recent`) }}
      </div>
      <div class="content-wrapper d-flex">
        <ContentobjectBlock
          v-if="componentType === 'update'"
          v-for="update in components"
          :component="update"
        />

        <ContentobjectBlock
          v-if="componentType === 'meeting'"
          v-for="meeting in components"
          :component="meeting"
        />
        <ContentobjectBlock
          v-else-if="componentType === 'notification'"
          v-for="notification in components"
          :component="notification"
        />
        <ContentobjectBlock
          v-else-if="componentType === 'GBF Target'"
          v-for="gbfTarget in components"
          :component="gbfTarget"
        />
        <ContentobjectBlock
          v-else-if="componentType === 'statement'"
          v-for="statement in components"
          :component="statement"
        />
        <ContentobjectBlock
          v-else-if="componentType === 'portal'"
          v-for="portal in components"
          :component="portal"
        />
        <ContentobjectBlock
          v-else-if="componentType === 'nbsap'"
          v-for="nbsap in components"
          :component="nbsap"
        />
      </div>
      <NuxtLink
        :to="
          componentType === 'GBF Target'
            ? '/gbf/targets'
            : { path: `/${componentType}s` }
        "
        class="btn cbd-btn cbd-btn-outline-more-content"
        role="button"
      >
        {{ t(`components.${componentType.replace(" ", "_")}s.more`) }}
      </NuxtLink>
    </section>
  </ClientOnly>
</template>
