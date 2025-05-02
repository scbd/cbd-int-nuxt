<script setup lang="ts">
const props = defineProps<{
  objectType: string;
  objectTitle: string;
  objectSymbol?: string;
  objectStartDate?: Date;
  objectEndDate?: Date;
  objectSubjects?: string;
  objectEventCity?: string;
  objectEventCountry?: string;
  objectActionRequired?: Date;
  objectDescription?: string;
  objectLink?: string;
  objectImg?: {
    url: string;
    width?: number;
    height?: number;
    mime_type?: string;
    file_size?: number;
    title?: string;
    alt: string;
  };
  objectInfo?: {
    source?: string;
    type?: string;
  };
  objectGBFtarget?: {
    number: number;
    description: string;
    colour: string;
    resources: string[];
  };
}>();

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
  <template v-if="objectType === 'update'"> </template>

  <template v-else-if="objectType === 'meeting'">
    <div
      v-if="meetings_status.status === 'OK'"
      class="content-object"
      :class="objectType"
    >
      <div class="date">
        {{
          Intl.DateTimeFormat(active_language!.active_language.slice(0, 2), {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(objectStartDate)
        }}
        <template v-if="objectEndDate">
          &nbsp;&ndash;&nbsp;
          {{
            Intl.DateTimeFormat(active_language!.active_language.slice(0, 2), {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(objectEndDate)
          }}
        </template>
      </div>
      <div class="title">{{ objectTitle }}</div>
      <div v-show="objectEventCity || objectEventCountry" class="location">
        {{
          objectLocation(
            active_language!.active_language,
            objectEventCity,
            objectEventCountry
          )
        }}
      </div>
      <div v-show="objectDescription" class="description">
        {{ objectDescription }}
      </div>
      <div class="read-on-wrapper">
        <NuxtLink :to="objectLink" class="read-on"
          >View {{ objectType }}</NuxtLink
        >
      </div>
    </div>
    <Loader
      v-else
      :class="meetings_status.status === 'error' ? 'error-loader' : ''"
    />
  </template>

  <template v-else-if="objectType === 'notification'">
    <div
      v-if="notifications_status.status === 'OK'"
      class="content-object"
      :class="objectType"
    >
      <div class="date">
        {{
          Intl.DateTimeFormat(active_language!.active_language.slice(0, 2), {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(objectStartDate)
        }}
        <template v-if="objectEndDate">
          &nbsp;&ndash;&nbsp;
          {{
            Intl.DateTimeFormat(active_language!.active_language.slice(0, 2), {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(objectEndDate)
          }}
        </template>
      </div>
      <div class="title">{{ `${objectSymbol} &ndash; ${objectTitle}` }}</div>
      <div v-show="objectActionRequired" class="action-required">
        {{
          `Action required: 
          ${Intl.DateTimeFormat(active_language!.active_language.slice(0, 2), {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(objectActionRequired)}`
        }}
      </div>
      <div v-show="objectSubjects" class="subjects">
        {{ `Subject(s): ${objectSubjects}` }}
      </div>
      <div class="description">{{ objectDescription }}</div>
      <div class="read-on-wrapper">
        <NuxtLink :to="objectLink" class="read-on"
          >View {{ objectType }}</NuxtLink
        >
      </div>
    </div>
    <Loader
      v-else
      :class="meetings_status.status === 'error' ? 'error-loader' : ''"
    />
  </template>

  <template v-else-if="objectType === 'statement'">
    <div
      v-if="statements_status.status === 'OK'"
      class="content-object"
      :class="objectType"
    >
      <div class="date">
        {{
          Intl.DateTimeFormat(active_language!.active_language.slice(0, 2), {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(objectStartDate)
        }}
      </div>
      <div class="title">{{ objectTitle }}</div>
      <div class="read-on-wrapper">
        <NuxtLink :to="objectLink" class="read-on" target="_blank"
          >View {{ objectType }}</NuxtLink
        >
      </div>
    </div>
    <Loader
      v-else
      :class="statements_status.status === 'error' ? 'error-loader' : ''"
    />
  </template>

  <div
    v-else-if="objectType === 'gbf-target'"
    class="content-object"
    :class="`gbf-target-${objectGBFtarget?.number}`"
  ></div>

  <template v-else-if="objectType === 'portal'">
    <div
      v-if="portals_status.status === 'OK'"
      class="content-object portal-resource"
    >
      <NuxtLink :to="objectLink" class="content-link">
        <NuxtImg
          :src="objectImg?.url"
          :alt="objectImg?.alt"
          class="content-image"
        />
        <div class="title">{{ objectTitle }}</div>
      </NuxtLink>
    </div>
    <Loader
      v-else
      :class="portals_status.status === 'error' ? 'error-loader' : ''"
    />
  </template>

  <template v-else-if="objectType === 'nbsap'">
    <div
      v-if="nbsaps_status.status === 'OK'"
      class="content-object"
      :class="objectType"
    >
      <div class="date">
        {{
          Intl.DateTimeFormat(active_language!.active_language.slice(0, 2), {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(objectStartDate)
        }}
      </div>
      <div class="title">{{ objectTitle }}</div>
      <div class="read-on-wrapper">
        <NuxtLink :to="objectLink" class="read-on" target="_blank"
          >Read {{ objectType }}</NuxtLink
        >
      </div>
    </div>
    <Loader
      v-else
      :class="nbsaps_status.status === 'error' ? 'error-loader' : ''"
    />
  </template>

  <Loader v-else class="error-loader" />
</template>
