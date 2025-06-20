<script setup lang="ts">
import type {
  availableLanguages,
  componentSanitized,
} from "~/types/components";

const props = defineProps<{
  component: componentSanitized;
}>();

const config = useRuntimeConfig();
const languageSettings = useLanguageStore();
const { t } = useI18n();

const handlerImage = (component: componentSanitized) => {
  const languages = ["ar", "en", "es", "fr", "ru", "zh"];

  let imgSrc = `${config.public.IMAGE_URL}/sites/default/files/${component.type}s${component.url?.slice(component.url?.lastIndexOf("/"))}`;

  for (let language of languages) {
    if (imgSrc.endsWith(`-${language}.pdf`)) {
      return imgSrc.replace(`-${language}.pdf`, ".jpg");
    }
  }
  return `${imgSrc}.jpg`;
};

const handlerMissingImage = (event: Event) => {
  const image: HTMLImageElement = event.target as HTMLImageElement;
  image.src = "/images/content_replacement.svg";
};

const objectLocation = (
  language: string,
  city: string | undefined,
  country: string | undefined
) => {
  if (language === "ar") {
    return `${city ?? ""}${city && country ? "،" : ""} ${country ?? ""}`;
  } else if (language === "zh-hans") {
    return `${city ?? ""}${country ?? ""}`;
  } else {
    return `${city}${city && country ? "," : ""} ${country ?? ""}`;
  }
};
</script>

<template>
  <template v-if="component.type === 'article'">
    <div
      v-if="articlesStatus.status === 'OK'"
      class="search-item content-object"
      :class="component.type"
    >
      <div class="content-image-wrapper">
        <img
          :src="component.image_cover?.url ?? '/images/content_replacement.svg'"
          :alt="component.image_cover?.alt"
          :title="component.image_cover?.title"
          class="content-image"
        />
      </div>
      <div class="content-information-wrapper">
        <div class="information">
          <div class="taxonomy">
            <div class="source">{{ "CBD" }}</div>
            <div class="type">{{ t("components.articles.name") }}</div>
          </div>
          <div class="date">
            {{
              Intl.DateTimeFormat(languageSettings.active_language, {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(component.date)
            }}
          </div>
          <NuxtLink :to="component.url" class="title">
            {{ component.title }}
          </NuxtLink>
          <div
            class="description"
            v-html="contentParser(component.content)"
          ></div>
        </div>
        <div class="read-on-wrapper">
          <NuxtLink :to="component.url" class="btn cbd-btn-more-content">{{
            t(`components.${component.type.replace(" ", "_")}s.view`)
          }}</NuxtLink>
        </div>
      </div>
    </div>
    <Loader
      v-else
      :class="[{ 'error-loader': articlesStatus.status === 'error' }]"
    />
  </template>
  <template v-if="component.type === 'notification'">
    <div
      v-if="notificationsStatus.status === 'OK'"
      class="search-item content-object"
      :class="`object-type-${component.type}`"
    >
      <div class="content-image-wrapper">
        <img
          :src="handlerImage(component)"
          @error="handlerMissingImage"
          alt=""
          class="content-image"
        />
      </div>

      <div class="content-information-wrapper">
        <div class="information">
          <div class="date">
            {{
              Intl.DateTimeFormat(
                languageSettings.active_language.slice(0, 2),
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              ).format(component.date)
            }}
            <template v-if="component.date_end">
              &nbsp;&ndash;&nbsp;
              {{
                Intl.DateTimeFormat(
                  languageSettings.active_language.slice(0, 2),
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                ).format(component.date_end)
              }}
            </template>
          </div>

          <NuxtLink class="title" :to="component.url">
            {{
              `${component.symbol} &ndash; ${(component.title as availableLanguages)[languageSettings.active_language.slice(0, 2)]}`
            }}
          </NuxtLink>
          <div v-show="component.date_action" class="action-required">
            {{ t("components.notifications.action_required") }}:
            {{
              Intl.DateTimeFormat(
                languageSettings.active_language.slice(0, 2),
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              ).format(component.date_action)
            }}
          </div>
          <div v-show="component.themes" class="subjects">
            {{ t("components.notifications.subjects") }}:
            {{
              component.themes?.[languageSettings.active_language.slice(0, 2)]
            }}
          </div>
          <div class="description">
            {{
              (component.fulltext as availableLanguages)[
                languageSettings.active_language.slice(0, 2)
              ]
            }}
          </div>
        </div>
        <template v-if="component.files?.length">
          <div class="files">
            <div class="files-title">{{ t("forms.files") }}</div>
            <div class="files-available">
              <NuxtLink
                v-for="file in component.files"
                v-show="
                  file.language === languageSettings.active_language.slice(0, 2)
                "
                class="btn"
                target="_blank"
                :to="file.url"
              >
                <img
                  v-show="file.type.includes('pdf')"
                  src="/images/icons/icon_file-pdf.svg"
                  :alt="t('components.notifications.download_pdf')"
                />
                <img
                  v-show="file.type.includes('doc')"
                  src="/images/icons/icon_file-doc.svg"
                  :alt="t('components.notifications.download_doc')"
                />
              </NuxtLink>
            </div>
          </div>
        </template>
        <div class="read-on-wrapper">
          <NuxtLink :to="component.url" class="btn cbd-btn-more-content">{{
            t(`components.${component.type.replace(" ", "_")}s.view`)
          }}</NuxtLink>
        </div>
      </div>
    </div>
    <Loader
      v-else
      :class="[{ 'error-loader': notificationsStatus.status === 'error' }]"
    />
  </template>
  <template v-if="component.type === 'statement'">
    <div
      v-if="statementsStatus.status === 'OK'"
      class="search-item content-object"
      :class="`object-type-${component.type}`"
    >
      <div class="content-image-wrapper">
        <img
          :src="handlerImage(component)"
          @error="handlerMissingImage"
          alt=""
          class="content-image"
        />
      </div>

      <div class="content-information-wrapper">
        <div class="information">
          <div class="date">
            {{
              Intl.DateTimeFormat(
                languageSettings.active_language.slice(0, 2),
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              ).format(component.date)
            }}
            <template v-if="component.date_end">
              &nbsp;&ndash;&nbsp;
              {{
                Intl.DateTimeFormat(
                  languageSettings.active_language.slice(0, 2),
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                ).format(component.date_end)
              }}
            </template>
          </div>

          <NuxtLink
            class="title"
            :to="{
              name: 'statements-statement',
              params: { statement: component.symbol },
            }"
          >
            {{
              `${component.symbol} &ndash; ${(component.title as availableLanguages)[languageSettings.active_language.slice(0, 2)]}`
            }}
          </NuxtLink>

          <div
            v-if="
              component.themes?.[languageSettings.active_language.slice(0, 2)]
            "
            class="subjects"
          >
            {{ t("components.statements.themes") }}:

            <template v-if="languageSettings.active_language === 'ar'">
              {{ component.themes["ar"].join("، ") }}
            </template>
            <template v-else>
              {{
                component.themes[
                  languageSettings.active_language.slice(0, 2)
                ].join(", ")
              }}
            </template>
          </div>
        </div>
        <template v-if="component.url">
          <div class="files">
            <div class="files-title">{{ t("forms.files") }}</div>
            <div class="files-available">
              <NuxtLink class="btn" target="_blank" :to="component.url">
                <img
                  v-show="component.url.includes('.pdf')"
                  src="/images/icons/icon_file-pdf.svg"
                  :alt="t('components.notifications.download_pdf')"
                />
                <img
                  v-show="component.url.includes('.doc')"
                  src="/images/icons/icon_file-doc.svg"
                  :alt="t('components.notifications.download_doc')"
                />
              </NuxtLink>
            </div>
          </div>
        </template>
        <div class="read-on-wrapper">
          <NuxtLink
            :to="{
              name: 'statements-statement',
              params: { statement: component.symbol },
            }"
            class="btn cbd-btn-more-content"
            >{{
              t(`components.${component.type.replace(" ", "_")}s.view`)
            }}</NuxtLink
          >
        </div>
      </div>
    </div>
    <Loader
      v-else
      :class="[{ 'error-loader': statementsStatus.status === 'error' }]"
    />
  </template>
</template>
