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
              : update.title[activeLanguage!.active_language.slice(0, 2)]
          "
          :object-start-date="update.date"
          :object-img="update.image_cover"
          :object-link="update.url"
          :object-end-date="update.date_end"
          :object-action-required="update.date_action"
          :object-symbol="update.symbol"
          :object-event-city="
            update.event_city?.[activeLanguage!.active_language.slice(0, 2)]
          "
          :object-event-country="
            update.event_country?.[activeLanguage!.active_language.slice(0, 2)]
          "
          :object-description="
            update.fulltext?.[activeLanguage!.active_language.slice(0, 2)]
          "
        />

        <ContentobjectBlock
          v-if="objectType === 'meeting'"
          v-for="meeting in objects"
          :object-type="props.objectType"
          :object-title="
            (meeting.title as availableLanguages)[
              activeLanguage!.active_language.slice(0, 2)
            ]
          "
          :object-start-date="meeting.date"
          :object-end-date="meeting.date_end"
          :object-event-city="
            meeting.event_city?.[activeLanguage!.active_language.slice(0, 2)]
          "
          :object-event-country="
            meeting.event_country?.[activeLanguage!.active_language.slice(0, 2)]
          "
          :object-link="meeting.url"
        />
        <ContentobjectBlock
          v-else-if="objectType === 'notification'"
          v-for="notification in objects"
          :object-type="objectType"
          :object-title="
            (notification.title as availableLanguages)[
              activeLanguage!.active_language.slice(0, 2)
            ]
          "
          :object-symbol="notification.symbol"
          :object-start-date="notification.date"
          :object-action-required="notification.date_action"
          :object-description="
            (notification.fulltext as availableLanguages)[
              activeLanguage!.active_language.slice(0, 2)
            ]
          "
          :object-subjects="
            (notification.themes as availableLanguages)[
              activeLanguage!.active_language.slice(0, 2)
            ]
          "
          :object-link="notification.url"
        />
        <ContentobjectBlock
          v-else-if="objectType === 'statement'"
          v-for="statement in objects"
          :object-type="objectType"
          :object-symbol="statement.symbol"
          :object-title="
            (statement.title as availableLanguages)[
              activeLanguage!.active_language.slice(0, 2)
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
        />
        <ContentobjectBlock
          v-else-if="objectType === 'nbsap'"
          v-for="nbsap in objects"
          :object-type="objectType"
          :object-title="
            (nbsap.title as availableLanguages)[
              activeLanguage!.active_language.slice(0, 2)
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
