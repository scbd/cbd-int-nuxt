<script setup lang="ts">
import type { componentRequest } from "~/types/components";

const props = defineProps<{
  objectType: string;
  objects: componentRequest;
}>();
</script>

<template>
  <ClientOnly>
    <section
      class="content-row d-flex flex-column"
      :class="objectType === 'update' ? 'recent-updates' : objectType"
    >
      <div class="row-title">Recent {{ objectType }}s</div>
      <div class="content-wrapper d-flex">
        <ContentobjectBlock
          v-if="objects.meetings && objects.meetings.length > 0"
          v-for="meeting in objects?.meetings"
          :object-type="objectType"
          :object-title="
            meeting.title[active_language!.active_language.slice(0, 2)]
          "
          :object-start-date="meeting.date"
          :object-end-date="meeting.date_end"
          :object-event-city="
            meeting.event_city[active_language!.active_language.slice(0, 2)]
          "
          :object-event-country="
            meeting.event_country[active_language!.active_language.slice(0, 2)]
          "
          :object-link="meeting.url"
        />
        <ContentobjectBlock
          v-else-if="objects.notifications && objects.notifications.length > 0"
          v-for="notification in objects?.notifications"
          :object-type="objectType"
          :object-title="
            notification.title[active_language!.active_language.slice(0, 2)]
          "
          :object-symbol="notification.symbol"
          :object-start-date="notification.date"
          :object-action-required="notification.date_action"
          :object-description="
            notification.fulltext[active_language!.active_language.slice(0, 2)]
          "
          :object-subjects="
            notification.themes[active_language!.active_language.slice(0, 2)]
          "
          :object-link="notification.url"
        />
        <ContentobjectBlock
          v-else-if="objects.statements && objects.statements.length > 0"
          v-for="statement in objects.statements"
          :object-type="objectType"
          :object-symbol="statement.symbol"
          :object-title="
            statement.title[active_language!.active_language.slice(0, 2)]
          "
          :object-start-date="statement.date"
          :object-link="statement.url"
        />
      </div>
      <NuxtLink
        to="#"
        class="btn cbd-btn cbd-btn-outline-more-content"
        role="button"
        >More {{ objectType }}</NuxtLink
      >
    </section>
  </ClientOnly>
</template>
