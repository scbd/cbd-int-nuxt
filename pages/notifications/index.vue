<script setup lang="ts">
import type { searchParams } from "~/types/components";
import getComponents from "~/composables/componentApi";

const route = useRoute();

const { getNotifications } = getComponents();

const notificationsParams: searchParams = {
  q: (route.meta.notificationQuery as string) ?? "schema_s:notification",
  fl: [
    "symbol_s",
    "date_s",
    "actionDate_s",
    "deadline_s",
    "sender",
    "reference_s",
    "url_ss",
    "recipient_ss",
    "title_??_s",
    "themes_??_ss",
    "fulltext_??_s",
    "files_ss",
  ],
  sort: ["date_s desc"],
  rows: 20,
};

await getNotifications(notificationsParams);

definePageMeta({
  layout: "serp",
  acceptNotificationData: true,
});
</script>
<template>
  <article class="cus-article container-xxl d-flex flex-column">
    <section>
      <h1>Notifications</h1>
      <p>Search Criteria</p>
    </section>
    <section>
      <FormFilterAndSort :search-params="notificationsParams" />
    </section>

    <ClientOnly>
      <section class="search-results">
        <!-- pagination -->
        <div class="search-results-items">
          <ContentobjectSerpBlock
            v-for="notification in referencedNotifications"
            :component="notification"
          />
        </div>
      </section>
    </ClientOnly>
  </article>
</template>
