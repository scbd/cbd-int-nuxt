<script setup lang="ts">
import type {
  componentSanitized,
  availableLanguages,
} from "~/types/components";

const props = defineProps<{
  objectType: string;
  objects: componentSanitized[];
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
          v-if="objectType === 'update'"
          v-for="update in objects"
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
            (notification.themes as availableLanguages)[
              active_language!.active_language.slice(0, 2)
            ]
          "
          :object-link="notification.url"
        />
      </div>

        <ContentobjectBlock
          v-else-if="objectType === 'statement'"
          v-for="statement in objects"
          :object-type="objectType"
          :object-symbol="statement.symbol"
          :object-title="
            (statement.title as availableLanguages)[
              active_language!.active_language.slice(0, 2)
            ]
          "
          :object-start-date="statement.date"
          :object-link="statement.url"
        />
        <ContentobjectBlock
          v-else-if="objectType === 'portal'"
          v-for="portal in objects"
          :object-type="objectType"
          :object-title="<string>portal.title"
          :object-link="portal.url"
          :object-img="portal.image"
        />
        <ContentobjectBlock
          v-else-if="objectType === 'nbsap'"
          v-for="nbsap in objects"
          :object-type="objectType"
          :object-title="
            (nbsap.title as availableLanguages)[
              active_language!.active_language.slice(0, 2)
            ]
          "
          :object-start-date="nbsap.date"
          :object-link="nbsap.url"
        />
      </div>
      <NuxtLink
        to="#"
        class="btn cbd-btn cbd-btn-outline-more-content"
        role="button"
      >
        {{ objectType === "nbsap" ? "All submissions" : `More ${objectType}s` }}
      </NuxtLink>
    </section>
  </ClientOnly>
</template>
