<script setup lang="ts">
import type { componentRequest, componentMeeting } from "~/types/components";

const props = defineProps<{
  objectType: string;
  objects: componentRequest;
}>();
</script>

<template>
  <ClientOnly>
    <section class="content-row content-updates d-flex flex-column">
      <div class="row-title">Recent {{ objectType }}s</div>
      <div class="content-wrapper d-flex">
        <ContentobjectBlock
          v-if="objects.meetings && objects.meetings.length > 0"
          v-for="content_object in objects?.meetings"
          :object-type="props.objectType"
          :object-title="
            content_object.title[active_language!.active_language.slice(0, 2)]
          "
          :object-start-date="content_object.start_date"
          :object-end-date="content_object.end_date"
          :object-event-city="
            content_object.event_city[
              active_language!.active_language.slice(0, 2)
            ]
          "
          :object-event-country="
            content_object.event_country[
              active_language!.active_language.slice(0, 2)
            ]
          "
          :object-link="content_object.url"
        />
        <ContentobjectBlock
          v-if="objects.notifications && objects.notifications.length > 0"
          v-for="content_object in objects?.notifications"
          :object-type="props.objectType"
          :object-title="
            content_object.title[active_language!.active_language.slice(0, 2)]
          "
          :object-start-date="content_object.date"
          :object-action-required="content_object.action_date"
          :object-description="
            content_object.fulltext[
              active_language!.active_language.slice(0, 2)
            ]
          "
          :object-subjects="
            content_object.themes[active_language!.active_language.slice(0, 2)]
          "
          :object-link="content_object.url"
        />
      </div>
    </section>
  </ClientOnly>
</template>
