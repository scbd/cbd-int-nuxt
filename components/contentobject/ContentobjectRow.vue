<script setup lang="ts">
import type { componentRequest, componentSanitized } from "~/types/components";

const props = defineProps<{
  objectType: string;
  objects: componentRequest | componentSanitized[];
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
          v-if="(objects as componentSanitized[]).length > 0"
          v-for="update in objects as componentSanitized[]"
          :object-type="update.type"
          :object-title="
            typeof update.title === 'string'
              ? <string>update.title
              : update.title[active_language!.active_language.slice(0, 2)]
          "
          :object-start-date="update.date"
          :object-img="update.image_cover"
          :object-link="update.url"
          :object-end-date="update.date_end"
          :object-action-required="update.date_action"
          :object-symbol="update.symbol"
          :object-event-city="
            update.event_city?.[active_language!.active_language.slice(0, 2)]
          "
          :object-event-country="
            update.event_country?.[active_language!.active_language.slice(0, 2)]
          "
          :object-description="
            update.fulltext?.[active_language!.active_language.slice(0, 2)]
          "
        />

        <ContentobjectBlock
          v-if="(objects as componentRequest).meetings"
          v-for="content_object in (objects as componentRequest)?.meetings"
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
          v-if="(objects as componentRequest).notifications"
          v-for="content_object in (objects as componentRequest).notifications"
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
