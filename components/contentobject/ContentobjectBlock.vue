<script setup lang="ts">
defineProps<{
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
    imgSrc?: string;
    imgDescription?: string;
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
  <template v-if="objectType === 'update'">
    <div
      v-if="meetings_status.status === 'OK'"
      class="content-object"
      :class="[
        objectType,
        objectInfo?.source ? `accent-${objectInfo.source}` : 'accent-cbd',
      ]"
    >
      <img
        v-show="objectImg"
        :src="objectImg?.imgSrc ?? '/images/update-1.jpg'"
        :alt="objectImg?.imgDescription"
        class="content-image"
      />
      <div class="information">
        <div class="taxonomy">
          <div class="source">{{ objectInfo?.source ?? "CBD" }}</div>
          <div class="type">{{ objectInfo?.type ?? "Article" }}</div>
        </div>
        <div class="date">
          {{
            Intl.DateTimeFormat(active_language!.active_language, {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(objectStartDate)
          }}
        </div>
      </div>
      <div class="title">{{ objectTitle }}</div>
      <div class="description">
        {{ objectDescription ?? "Description Placeholder" }}
      </div>
      <div class="read-on-wrapper">
        <NuxtLink :to="objectLink" class="read-on">Read on</NuxtLink>
      </div>
    </div>
    <Loader
      v-else
      :class="meetings_status.status === 'error' ? 'error-loader' : ''"
    />
  </template>

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

  <div
    v-else-if="objectType === 'gbf-target'"
    class="content-object"
    :class="`gbf-target-${objectGBFtarget?.number}`"
  >
    <div class="resources">
      <div class="resource-title">Head line indicators</div>
    </div>
    <div class="links">
      <NuxtLink to="#">Why is this target important?</NuxtLink>
      <NuxtLink to="#">Target Explanation</NuxtLink>
      <NuxtLink to="#">Guiding Questions</NuxtLink>
      <NuxtLink to="#">Links to other elements</NuxtLink>
      <NuxtLink to="#">Relevant Resources</NuxtLink>
      <NuxtLink to="#">Indicators</NuxtLink>
    </div>
    <NuxtLink :to="objectLink" class="view-target">View Target</NuxtLink>
  </div>

  <div
    v-else-if="
      objectType === 'portals-resources' || objectType === 'submissions'
    "
    class="content-object"
    :class="objectType"
  >
    <NuxtLink :to="objectLink" class="content-link">
      <img
        v-show="objectImg"
        :src="objectImg?.imgSrc"
        :alt="objectImg?.imgDescription"
        class="content-image"
      />
      <div class="title">{{ objectTitle }}</div>
    </NuxtLink>
  </div>

  <Loader v-else class="error-loader" />
</template>
