<script setup lang="ts">
import type {
  availableLanguages,
  componentSanitized,
} from "~/types/components";

const props = defineProps<{
  component: componentSanitized;
}>();

const config = useRuntimeConfig();

const handlerMissingImage = (component: componentSanitized) => {
  const languages = ["ar", "en", "es", "fr", "ru", "zh"];

  let imgSrc = `${config.public.IMAGE_URL}/sites/default/files/${component.type}s${component.url?.slice(component.url?.lastIndexOf("/"))}`;

  for (let language of languages) {
    if (imgSrc.endsWith(`-${language}.pdf`)) {
      return imgSrc.replace(`-${language}.pdf`, ".jpg");
    }
  }
  return `${imgSrc}.jpg`;
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
  <template v-if="component.type === 'notification'">
    <div
      v-if="notificationsStatus.status === 'OK'"
      class="search-item content-object"
      :class="`object-type-${component.type}`"
    >
      <div class="content-image-wrapper">
        <img
          :src="handlerMissingImage(component)"
          onerror="this.onerror=null; this.src='/images/content_replacement.svg'"
          alt=""
          class="content-image"
        />
      </div>

      <div class="content-information-wrapper">
        <div class="information">
          <div class="date">
            {{
              Intl.DateTimeFormat(activeLanguage!.active_language.slice(0, 2), {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(component.date)
            }}
            <template v-if="component.date_end">
              &nbsp;&ndash;&nbsp;
              {{
                Intl.DateTimeFormat(
                  activeLanguage!.active_language.slice(0, 2),
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
              `${component.symbol} &ndash; ${(component.title as availableLanguages)[activeLanguage!.active_language.slice(0, 2)]}`
            }}
          </NuxtLink>
          <div v-show="component.date_action" class="action-required">
            {{
              `Action required: 
            ${Intl.DateTimeFormat(activeLanguage!.active_language.slice(0, 2), {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(component.date_action)}`
            }}
          </div>
          <div v-show="component.themes" class="subjects">
            {{
              `Subject(s): ${(component.themes as availableLanguages)[activeLanguage!.active_language.slice(0, 2)]}`
            }}
          </div>
          <div class="description">
            {{
              (component.fulltext as availableLanguages)[
                activeLanguage!.active_language.slice(0, 2)
              ]
            }}
          </div>
        </div>
        <template v-if="component.files?.length">
          <div class="files">
            <div class="files-title">Files</div>
            <div class="files-available">
              <NuxtLink
                v-for="file in component.files"
                v-show="
                  file.language === activeLanguage!.active_language.slice(0, 2)
                "
                class="btn"
                target="_blank"
                :to="file.url"
              >
                <img
                  v-show="file.type.includes('pdf')"
                  src="/images/icons/icon_file-pdf.svg"
                  :alt="`Download ${component.title} Notification as a PDF Document`"
                />
                <img
                  v-show="file.type.includes('doc')"
                  src="/images/icons/icon_file-pdf.svg"
                  :alt="`Download ${component.title} Notification as a DOC Document`"
                />
              </NuxtLink>
            </div>
          </div>
        </template>
        <div class="read-on-wrapper">
          <NuxtLink
            :to="component.url"
            :notification="component"
            class="btn cbd-btn-more-content"
            >View {{ component.type }}</NuxtLink
          >
        </div>
      </div>
    </div>
    <Loader
      v-else
      :class="notificationsStatus.status === 'error' ? 'error-loader' : ''"
    />
  </template>
</template>
