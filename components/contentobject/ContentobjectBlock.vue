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

const objectLocation = (language: string, city?: string, country?: string) => {
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
      class="content-object"
      :class="[component.type, 'accent-cbd']"
    >
      <img
        :src="component.image_cover?.url ?? '/images/content_replacement.svg'"
        :alt="component.image_cover?.alt"
        :title="component.image_cover?.title"
        class="content-image"
      />
      <div class="information">
        <div class="taxonomy">
          <div class="source">{{ "CBD" }}</div>
          <div class="type">{{ "Article" }}</div>
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
      </div>
      <div class="title">{{ component.title }}</div>
      <div class="description">
        {{ component.content ?? "Description Placeholder" }}
      </div>
      <div class="read-on-wrapper">
        <NuxtLink :to="component.url" class="read-on">Read on</NuxtLink>
      </div>
    </div>
    <Loader
      v-else
      :class="articlesStatus.status === 'error' ? 'error-loader' : ''"
    />
  </template>

  <template v-else-if="component.type === 'meeting'">
    <div
      v-if="meetingsStatus.status === 'OK'"
      class="content-object"
      :class="component.type"
    >
      <div class="date">
        {{
          Intl.DateTimeFormat(languageSettings.active_language.slice(0, 2), {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(component.date)
        }}
        <template v-if="component.date_end">
          &nbsp;&ndash;&nbsp;
          {{
            Intl.DateTimeFormat(languageSettings.active_language.slice(0, 2), {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(component.date_end)
          }}
        </template>
      </div>

      <img
        :src="handlerImage(component)"
        @error="handlerMissingImage"
        class="content-image"
      />

      <div class="title">
        {{
          (component.title as availableLanguages)[
            languageSettings.active_language.slice(0, 2)
          ]
        }}
      </div>
      <div
        v-show="component.event_city || component.event_country"
        class="location"
      >
        {{
          objectLocation(
            languageSettings.active_language,
            (component.event_city as availableLanguages)[
              languageSettings.active_language.slice(0, 2)
            ],
            (component.event_country as availableLanguages)[
              languageSettings.active_language.slice(0, 2)
            ]
          )
        }}
      </div>
      <div class="read-on-wrapper">
        <NuxtLink :to="component.url" class="read-on"
          >View {{ component.type }}</NuxtLink
        >
      </div>
    </div>
    <Loader
      v-else
      :class="meetingsStatus.status === 'error' ? 'error-loader' : ''"
    />
  </template>

  <template v-else-if="component.type === 'notification'">
    <div
      v-if="notificationsStatus.status === 'OK'"
      class="content-object"
      :class="component.type"
    >
      <div class="date">
        {{
          Intl.DateTimeFormat(languageSettings.active_language.slice(0, 2), {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(component.date)
        }}
        <template v-if="component.date_end">
          &nbsp;&ndash;&nbsp;
          {{
            Intl.DateTimeFormat(languageSettings.active_language.slice(0, 2), {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(component.date_end)
          }}
        </template>
      </div>

      <img
        :src="handlerImage(component)"
        @error="handlerMissingImage"
        class="content-image"
      />

      <div class="title">
        {{
          `${component.symbol} &ndash; ${(component.title as availableLanguages)[languageSettings.active_language.slice(0, 2)]}`
        }}
      </div>
      <div v-show="component.date_action" class="action-required">
        {{
          `Action required: 
          ${Intl.DateTimeFormat(languageSettings.active_language.slice(0, 2), {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(component.date_action)}`
        }}
      </div>
      <div v-show="component.themes" class="subjects">
        {{
          `Subject(s): ${(component.themes as availableLanguages)[languageSettings.active_language.slice(0, 2)]}`
        }}
      </div>
      <div class="description">
        {{
          (component.fulltext as availableLanguages)[
            languageSettings.active_language.slice(0, 2)
          ]
        }}
      </div>
      <div class="read-on-wrapper">
        <NuxtLink :to="component.url" class="read-on"
          >View {{ component.type }}</NuxtLink
        >
      </div>
    </div>
    <Loader
      v-else
      :class="notificationsStatus.status === 'error' ? 'error-loader' : ''"
    />
  </template>

  <template v-else-if="component.type === 'GBF Target'">
    <div
      v-if="gbfTargetsStatus.status === 'OK'"
      class="content-object gbf-target"
    >
      <div class="header">
        <div class="information">
          <div class="title">{{ component.title }}</div>
          <div class="description" v-if="component.summary">
            {{ component.summary }}
          </div>
        </div>
      </div>
    </div>
    <Loader
      v-else
      :class="notificationsStatus.status === 'error' ? 'error-loader' : ''"
    />
  </template>

  <template v-else-if="component.type === 'statement'">
    <div
      v-if="statementsStatus.status === 'OK'"
      class="content-object"
      :class="component.type"
    >
      <div class="date">
        {{
          Intl.DateTimeFormat(languageSettings.active_language.slice(0, 2), {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(component.date)
        }}
      </div>

      <img
        :src="handlerImage(component)"
        @error="handlerMissingImage"
        class="content-image"
      />

      <div class="title">
        {{
          (component.title as availableLanguages)[
            languageSettings.active_language.slice(0, 2)
          ]
        }}
      </div>
      <div class="read-on-wrapper">
        <NuxtLink :to="component.url" class="read-on" target="_blank"
          >View {{ component.type }}</NuxtLink
        >
      </div>
    </div>
    <Loader
      v-else
      :class="statementsStatus.status === 'error' ? 'error-loader' : ''"
    />
  </template>

  <template v-else-if="component.type === 'portal'">
    <div
      v-if="portalsStatus.status === 'OK'"
      class="content-object portal-resource"
    >
      <NuxtLink :to="component.url" class="content-link">
        <NuxtImg
          :src="component.image?.url ?? '/images/absch-image.png'"
          :alt="component.image?.alt"
          class="content-image"
        />
        <div class="title">{{ component.title }}</div>
      </NuxtLink>
    </div>
    <Loader
      v-else
      :class="portalsStatus.status === 'error' ? 'error-loader' : ''"
    />
  </template>

  <template v-else-if="component.type === 'nbsap'">
    <div
      v-if="nbsapsStatus.status === 'OK'"
      class="content-object"
      :class="component.type"
    >
      <div class="date">
        {{
          Intl.DateTimeFormat(languageSettings.active_language.slice(0, 2), {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(component.date)
        }}
      </div>
      <div class="title">
        {{
          (component.title as availableLanguages)[
            languageSettings.active_language.slice(0, 2)
          ]
        }}
      </div>
      <div class="read-on-wrapper">
        <NuxtLink :to="component.url" class="read-on" target="_blank"
          >Read {{ component.type }}</NuxtLink
        >
      </div>
    </div>
    <Loader
      v-else
      :class="nbsapsStatus.status === 'error' ? 'error-loader' : ''"
    />
  </template>

  <Loader v-else class="error-loader" />
</template>
