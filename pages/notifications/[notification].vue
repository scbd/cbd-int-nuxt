<script setup lang="ts">
import type {
  availableLanguages,
  componentSanitized,
  searchParams,
} from "~/types/components";

import getComponents from "~/composables/componentApi";

const { getNotifications } = getComponents();
const route = useRoute();

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
      <section v-for="notification in referencedNotifications">
        <h1>Notification {{ notification.symbol }}</h1>

        <div class="content-object">
          <div class="information">
            <div class="date">
              {{
                Intl.DateTimeFormat(
                  activeLanguage!.active_language.slice(0, 2),
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                ).format(notification.date)
              }}
              <template v-if="notification.date_end">
                &nbsp;&ndash;&nbsp;
                {{
                  Intl.DateTimeFormat(
                    activeLanguage!.active_language.slice(0, 2),
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  ).format(notification.date_end)
                }}
              </template>
            </div>
            <div v-show="notification.date_action" class="action-required">
              {{
                `Action required: 
            ${Intl.DateTimeFormat(activeLanguage!.active_language.slice(0, 2), {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(notification.date_action)}`
              }}
            </div>
            <div class="description">
              {{
                (notification.title as availableLanguages)[
                  activeLanguage!.active_language.slice(0, 2)
                ]
              }}
            </div>
          </div>
          <div class="subjects-recipients">
            <div v-show="notification.recipient" class="recipients">
              <span class="fw-bold">Recipient(s): </span>
              <NuxtLink
                v-for="recipient of notification.recipient"
                @click="
                  toNotificationsParams.q = `${toNotificationsParams.q} AND recipient_ss:(*${recipient}*)`
                "
                :to="{
                  name: 'notifications',
                }"
                class="badge bg-secondary"
              >
                {{ recipient }}
              </NuxtLink>
            </div>
            <div
              v-show="
                (notification.themes as availableLanguages)[
                  activeLanguage!.active_language.slice(0, 2)
                ]
              "
              class="subjects"
            >
              <span class="fw-bold">Subject(s): </span>
              {{
                `${(notification.themes as availableLanguages)[activeLanguage!.active_language.slice(0, 2)]}`
              }}
            </div>
          </div>
          <template v-if="notification.files?.length">
            <div class="files">
              <div class="files-title">
                Download notification in available languages
              </div>
              <div class="files-available">
                <NuxtLink
                  v-for="file in notification.files"
                  class="btn"
                  target="_blank"
                  :to="file.url"
                >
                  {{
                    new Intl.DisplayNames(activeLanguage!.active_language, {
                      type: "language",
                    }).of(file.language)
                  }}:
                  <img
                    v-show="file.type.includes('pdf')"
                    src="/images/icons/icon_file-pdf.svg"
                    :alt="`Download ${notification.title} Notification as a PDF Document`"
                  />
                  <img
                    v-show="file.type.includes('doc')"
                    src="/images/icons/icon_file-pdf.svg"
                    :alt="`Download ${notification.title} Notification as a DOC Document`"
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
                activeLanguage!.active_language.slice(0, 2)
              ]
            )
          "
        ></div>
      </section>
    </ClientOnly>
  </article>
</template>
