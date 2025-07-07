<script setup lang="ts">
import type { componentGaiaType, searchParams } from "~/types/components";
import getComponents from "~/composables/componentApi";

const route = useRoute();
const { t } = useI18n();

const { getGaiaComponents } = getComponents();

const notificationsParams: searchParams = {
  q: "",
  fl: [
    "schema_s",
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
  sort: {
    date_s: "desc",
  },
  rows: 20,
};

const componentTypes: componentGaiaType = ["notification"];
await getGaiaComponents(notificationsParams, componentTypes);

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
      <section>
        <FormFilterAndSort
          :search-params="notificationsParams"
          :component-types="componentTypes"
        />
      </section>
    </section>

    <ClientOnly>
      <section class="search-results">
        <FormPagination
          :component-types="componentTypes"
          :component-search="notificationsParams"
        />
        <div class="search-results-items">
          <ContentobjectSerpBlock
            v-for="notification in referencedNotifications.general"
            :component="notification"
          />
        </div>
        <FormPagination
          :component-types="componentTypes"
          :component-search="notificationsParams"
        />
      </section>
    </ClientOnly>
  </article>
</template>
