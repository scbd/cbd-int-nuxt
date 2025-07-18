<script setup lang="ts">
import type {
  availableLanguages,
  componentSanitized,
} from "~/types/components";
import type { langCode } from "~/types/drupalLanguages";

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

const objectLocation = (city?: string, country?: string) => {
  if (languageSettings.active_language === "ar") {
    return `${city ?? ""}${city && country ? "،" : ""} ${country ?? ""}`;
  } else if (languageSettings.active_language === "zh-hans") {
    return `${city ?? ""}${country ?? ""}`;
  } else {
    return `${city}${city && country ? "," : ""} ${country ?? ""}`;
  }
};

const gbfTargetRef = ref<string[]>([]);

if (props.component.type === "GBF Target") {
  const title =
    props.component.title_short?.[languageSettings.active_language] ??
    props.component.title_short!.en;
  const titleSplit = (title as string)?.split(".");
  const targetTitle = titleSplit?.[0].replace(/GBF-T0|GBF-T/, "Target ");
  const targetImage = titleSplit?.[0].replace("-T", "_Targets-");

  titleSplit![0] = targetTitle;
  titleSplit[1] = titleSplit[1].trim();
  titleSplit.push(targetImage);

  gbfTargetRef.value = titleSplit;
}
</script>

<template>
  <template v-if="component.type === 'article'">
    <div
      v-if="articlesStatus.status === 'OK'"
      class="content-object"
      :class="[component.type, 'accent-cbd']"
    >
      <div class="information">
        <div class="taxonomy">
          <div class="source">{{ "CBD" }}</div>
          <div class="type">{{ t("components.articles.name") }}:</div>
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
      <img
        :src="component.image_cover?.url ?? '/images/content_replacement.svg'"
        :alt="component.image_cover?.alt"
        :title="component.image_cover?.title"
        class="content-image"
      />
      <div class="title">{{ component.title }}</div>
      <div class="description" v-html="component.content"></div>
      <div class="read-on-wrapper">
        <NuxtLink :to="component.url" class="read-on">{{
          t("components.articles.view")
        }}</NuxtLink>
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
          Intl.DateTimeFormat(languageSettings.active_language, {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(component.date)
        }}
        <template v-if="component.date_end">
          &nbsp;&ndash;&nbsp;
          {{
            Intl.DateTimeFormat(languageSettings.active_language, {
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
            languageSettings.active_language
          ]
        }}
      </div>
      <div
        v-show="component.event_city || component.event_country"
        class="location"
      >
        {{
          objectLocation(
            (component.event_city as availableLanguages)[
              languageSettings.active_language
            ] as string,
            (component.event_country as availableLanguages)[
              languageSettings.active_language
            ] as string
          )
        }}
      </div>
      <div class="read-on-wrapper">
        <NuxtLink :to="component.url" class="read-on">{{
          t("components.meetings.view")
        }}</NuxtLink>
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
          Intl.DateTimeFormat(languageSettings.active_language, {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(component.date)
        }}
        <template v-if="component.date_end">
          &nbsp;&ndash;&nbsp;
          {{
            Intl.DateTimeFormat(languageSettings.active_language, {
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
          `${component.symbol} &ndash; ${(component.title as availableLanguages)[languageSettings.active_language]}`
        }}
      </div>
      <div v-show="component.date_action" class="action-required">
        {{ t("components.notifications.action_required") }}:
        {{
          Intl.DateTimeFormat(languageSettings.active_language, {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(component.date_action)
        }}
      </div>
      <div
        v-if="component.themes?.[languageSettings.active_language]"
        class="subjects"
      >
        {{ t("components.notifications.subjects") }}:
        {{
          (component.themes[languageSettings.active_language] as string[]).join(
            ", "
          )
        }}
      </div>
      <div class="description">
        {{
          (component.fulltext as availableLanguages)[
            languageSettings.active_language
          ]
        }}
      </div>
      <div class="read-on-wrapper">
        <NuxtLink :to="component.url" class="read-on">{{
          t("components.notifications.view")
        }}</NuxtLink>
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
      :class="`gbf-target-${component.identifier?.slice(-2)}`"
    >
      <div
        class="header"
        :style="`background-image: url(${config.public.IMAGE_URL}/sites/default/files/gbf/${gbfTargetRef[2]}.png)`"
      >
        <div class="information">
          <div class="title">
            <NuxtLink :to="component.url"> {{ gbfTargetRef[0] }} </NuxtLink>
          </div>
          <div v-if="component.description_long" class="description">
            <NuxtLink :to="component.url">{{
              component.description_long[languageSettings.active_language] ??
              component.description_long["en"]
            }}</NuxtLink>
          </div>
        </div>
      </div>
      <div class="resources"></div>
      <div class="links">
        <NuxtLink :to="component.url">{{
          t("components.GBF_Targets.quick_links.important")
        }}</NuxtLink>
        <NuxtLink :to="component.url">{{
          t("components.GBF_Targets.quick_links.explanation")
        }}</NuxtLink>
        <NuxtLink :to="component.url">{{
          t("components.GBF_Targets.quick_links.guiding_questions")
        }}</NuxtLink>
        <NuxtLink :to="component.url">{{
          t("components.GBF_Targets.quick_links.links")
        }}</NuxtLink>
        <NuxtLink :to="component.url">{{
          t("components.GBF_Targets.quick_links.relevant_resources")
        }}</NuxtLink>
        <NuxtLink :to="component.url">{{
          t("components.GBF_Targets.quick_links.indicators")
        }}</NuxtLink>
      </div>
      <NuxtLink :to="component.url" class="view-target">{{
        t("components.GBF_Targets.view")
      }}</NuxtLink>
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
          Intl.DateTimeFormat(languageSettings.active_language, {
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
            languageSettings.active_language
          ]
        }}
      </div>

      <div
        v-if="component.themes?.[languageSettings.active_language]"
        class="subjects"
      >
        {{ t("components.statements.themes") }}:
        {{
          (component.themes[languageSettings.active_language] as string[]).join(
            ", "
          )
        }}
      </div>
      <div class="read-on-wrapper">
        <NuxtLink
          :to="{
            name: 'statements-statement',
            params: { statement: component.symbol },
          }"
          class="read-on"
          >{{ t("components.statements.view") }}</NuxtLink
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
      <div class="read-on-wrapper">
        <NuxtLink :to="component.url" class="read-on">{{
          t("components.portals.view")
        }}</NuxtLink>
      </div>
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
          Intl.DateTimeFormat(languageSettings.active_language, {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(component.date)
        }}
      </div>
      <div class="title">
        {{
          (component.title as availableLanguages)[
            languageSettings.active_language
          ]
        }}
      </div>
      <div class="read-on-wrapper">
        <NuxtLink :to="component.url" class="read-on" target="_blank">{{
          t("components.nbsaps.view")
        }}</NuxtLink>
      </div>
    </div>
    <Loader
      v-else
      :class="nbsapsStatus.status === 'error' ? 'error-loader' : ''"
    />
  </template>

  <Loader v-else class="error-loader" />
</template>
