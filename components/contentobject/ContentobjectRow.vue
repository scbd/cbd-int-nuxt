<script setup lang="ts">
import type { componentRequest } from "~/types/components";

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
          v-for="content_object in objects?.meetings"
          :object-type="props.objectType"
          :object-title="content_object.title[active_language!.active_language]"
          :object-date="content_object.start_date"
          :object-event-city="
            content_object.event_city[active_language!.active_language]
          "
          :object-event-country="
            content_object.event_country[active_language!.active_language]
          "
          :object-link="content_object.url"
        />
      </div>
    </section>
  </ClientOnly>
</template>
