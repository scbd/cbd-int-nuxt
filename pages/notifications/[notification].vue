<script setup lang="ts">
import type {
  availableLanguages,
  componentSanitized,
  searchParams,
} from "~/types/components";

import getComponents from "~/composables/componentApi";

const { getNotifications } = getComponents();
const route = useRoute();
const languageSettings = useLanguageStore();
const { t } = useI18n();

const props = defineProps<{
  notification?: componentSanitized;
}>();

const notificationsParams: searchParams = {
  q: `schema_s:notification AND symbol_s:${route.params.notification}`,
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
  rows: 1,
};

await getNotifications(notificationsParams);

const toNotificationsParams: searchParams = {
  q: `schema_s:notification`,
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
  rows: 1,
};

const router = useRouter();
router.beforeEach(async (to) => {
  if (to.meta.acceptNotificationData) {
    to.meta.notificationQuery = toNotificationsParams.q;
  }
});

definePageMeta({
  layout: "content",
  pageType: "componentNotification",
});
</script>
<template>
  <article class="cus-article container-xxl d-flex flex-column page-component">
    <ClientOnly>
      <section v-for="notification in referencedNotifications.general">
        <h1>
          {{ t("components.notifications.name") }} {{ notification.symbol }}
        </h1>

        <div class="content-object">
          <div class="information">
            <div class="date">
              {{
                Intl.DateTimeFormat(languageSettings.active_language, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(notification.date)
              }}
              <template v-if="notification.date_end">
                &nbsp;&ndash;&nbsp;
                {{
                  Intl.DateTimeFormat(languageSettings.active_language, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(notification.date_end)
                }}
              </template>
            </div>
            <div v-show="notification.date_action" class="action-required">
              {{ t("components.notifications.action_required") }}:
              {{
                Intl.DateTimeFormat(languageSettings.active_language, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(notification.date_action)
              }}
            </div>
            <div class="description">
              {{
                (notification.title as availableLanguages)[
                  languageSettings.active_language
                ]
              }}
            </div>
          </div>
          <div class="subjects-recipients">
            <div v-show="notification.recipient" class="recipients">
              <span class="fw-bold"
                >{{ t("components.notifications.recipients") }}:
              </span>
              <NuxtLink
                v-for="recipient of notification.recipient"
                @click="
                  toNotificationsParams.q = `${toNotificationsParams.q} AND recipient_ss:(*${recipient}*)`
                "
                :to="{
                  name: `notifications`,
                }"
                class="badge"
              >
                {{ recipient }}
              </NuxtLink>
            </div>
            <div
              v-show="notification.themes?.[languageSettings.active_language]"
              class="subjects"
            >
              <span class="fw-bold"
                >{{ t("components.notifications.subjects") }}:
              </span>
              {{ `${notification.themes?.[languageSettings.active_language]}` }}
            </div>
          </div>
          <template v-if="notification.files?.length">
            <div class="files">
              <div class="files-title">
                {{ t("components.notifications.download") }}
              </div>
              <div class="files-available">
                <NuxtLink
                  v-for="file in notification.files"
                  class="btn"
                  target="_blank"
                  :to="file.url"
                >
                  {{
                    new Intl.DisplayNames(languageSettings.active_language, {
                      type: "language",
                    }).of(file.language)
                  }}:
                  <img
                    v-show="file.type.includes('pdf')"
                    src="/images/icons/icon_file-pdf.svg"
                    :alt="t('components.notifications.download_pdf')"
                  />
                  <img
                    v-show="file.type.includes('doc')"
                    src="/images/icons/icon_file-pdf.svg"
                    :alt="t('components.notifications.download_doc')"
                  />
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>

        <div
          class="rendered-content"
          v-html="
            contentParser(
              (notification.fulltext as availableLanguages)[
                languageSettings.active_language
              ]
            )
          "
        ></div>
      </section>
    </ClientOnly>
  </article>
</template>
