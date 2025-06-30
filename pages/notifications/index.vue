<script setup lang="ts">
import type { searchParams } from "~/types/components";
import getComponents from "~/composables/componentApi";

const route = useRoute();
const { t } = useI18n();

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
      <h1>{{ t("components.notifications.name_plural") }}</h1>
      <p>{{ t("forms.search_criteria") }}</p>
    </section>
    <section>
      <FormFilterAndSort
        :search-params="notificationsParams"
        :component-type="'notification'"
      />
    </section>

    <ClientOnly>
      <section class="search-results">
        <FormPagination
          component-type="notification"
          :component-search="notificationsParams"
        />
        <div class="search-results-items">
          <ContentobjectSerpBlock
            v-for="notification in referencedNotifications.general"
            :component="notification"
          />
        </div>
        <FormPagination
          component-type="notification"
          :component-search="notificationsParams"
        />
      </section>
    </ClientOnly>
  </article>
</template>
