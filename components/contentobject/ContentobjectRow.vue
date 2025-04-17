<script setup lang="ts">
import type { componentRequest, componentMeeting } from "~/types/components";

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
          v-if="objects.articles && objects.articles.length > 0"
          v-for="content_object in objects?.articles"
          :object-type="props.objectType"
          :object-title="content_object.title"
          :object-start-date="content_object.date_created"
          :object-img="{ imgSrc: content_object.image_cover }"
          :object-link="content_object.url"
        />

        <ContentobjectBlock
          v-if="objects.meetings && objects.meetings.length > 0"
          v-for="content_object in objects?.meetings"
          :object-type="props.objectType"
          :object-title="
            content_object.title[active_language!.active_language.slice(0, 2)]
          "
          :object-start-date="content_object.date_start"
          :object-end-date="content_object.date_end"
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
          :object-symbol="content_object.symbol"
          :object-start-date="content_object.date"
          :object-action-required="content_object.date_action"
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
