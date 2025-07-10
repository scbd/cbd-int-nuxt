<script setup lang="ts">
import type { componentGaiaType, searchParams } from "~/types/components";
import getComponents from "~/composables/componentApi";

const { getGaiaComponents } = getComponents();
const route = useRoute();
const languageSettings = useLanguageStore();
const { t } = useI18n();

const props = defineProps<{
  searchParams: searchParams;
  componentTypes: componentGaiaType;
}>();

const inputFilterTitle = ref<string>();
const inputFilterReference = ref<string>();
const inputFilterThemes = ref<string>();
const inputFilterRecipients = ref<string>();
const selectFilterYear = ref<number>(0);
const selectSortName = ref<"asc" | "desc">("desc");
const selectSortDate = ref<"asc" | "desc">("desc");

const query: {
  title?: string;
  year: number;
  recipient?: string;
  theme?: string;
} = {
  year: 0,
};
const displayQuery = ref(query);

if (props.searchParams) {
  if (props.searchParams.q.includes("recipient_ss")) {
    displayQuery.value.recipient = props.searchParams.q.substring(
      props.searchParams.q.indexOf("*") + 1,
      props.searchParams.q.lastIndexOf("*")
    );
  }
  if (
    props.searchParams.q.includes(
      `themes_${languageSettings.active_language.slice(0, 2).toUpperCase()}_ss`
    )
  ) {
    displayQuery.value.theme = props.searchParams.q.substring(
      props.searchParams.q.indexOf('("') + 2,
      props.searchParams.q.lastIndexOf('")')
    );
  }
}

const params: searchParams = props.searchParams;
const componentTypes: componentGaiaType = props.componentTypes;

const searchHandler = async () => {
  let paramQuery: string[] = [];
  type propSort = {
    sort: {
      [field_name: string]: "asc" | "desc";
    };
  };
  const paramSort: propSort = { sort: {} };

  displayQuery.value.recipient = "";

  if (selectFilterYear.value > 0) {
    paramQuery.push(`date_s:(${selectFilterYear.value}*)`);

    displayQuery.value.year = selectFilterYear.value;
  }

  if (inputFilterTitle.value) {
    const titles: string[] = inputFilterTitle.value.split(" ");
    const titlesString = titles
      .map(
        (title) =>
          `*${title.replaceAll(/[^a-zA-Z0-9 ]/gi, (match) => `\\${match}`)}*`
      )
      .join(" AND ");

    paramQuery.push(
      `title_${languageSettings.active_language.toUpperCase()}_s:(${titlesString})`
    );
  }

  if (inputFilterThemes.value) {
    const themes: string[] = inputFilterThemes.value.split(" ");
    const themesString = themes
      .map(
        (theme) =>
          `*${theme.replaceAll(/[^a-zA-Z0-9 ]/gi, (match) => `\\${match}`)}*`
      )
      .join(" AND ");

    paramQuery.push(
      `themes_${languageSettings.active_language.toUpperCase()}_ss:(${themesString})`
    );
  }

  if (inputFilterRecipients.value) {
    const recipients: string[] = inputFilterRecipients.value.split(" ");
    const recipientsString = recipients
      .map(
        (recipient) =>
          `*${recipient.replaceAll(/[^a-zA-Z0-9 ]/gi, (match) => `\\${match}`)}*`
      )
      .join(" AND ");

    paramQuery.push(
      `recipient_${languageSettings.active_language.toUpperCase()}_ss:(${recipientsString})`
    );
  }

  if (selectSortDate.value) {
    paramSort.sort["createdDate_dt"] = selectSortDate.value;
  }

  if (selectSortName.value) {
    paramSort.sort[
      `title_${languageSettings.active_language.slice(0, 2).toUpperCase()}_s`
    ] = selectSortName.value;
  }

  displayQuery.value.title = inputFilterTitle.value;
  displayQuery.value.theme = inputFilterThemes.value;
  displayQuery.value.recipient = inputFilterRecipients.value;

  params.q = paramQuery.join(" AND ");
  params.sort = paramSort.sort;

  getGaiaComponents(params, componentTypes);
};
</script>
<template>
  <div class="filter-and-sort-wrapper container-fluid">
    <button
      class="btn cbd-btn-outline-icon filter-and-sort"
      type="button"
      data-bs-toggle="collapse"
      aria-expanded="true"
      data-bs-target="#searchForm"
      aria-controls="searchForm"
    >
      {{ t("forms.filter_and_sort") }}
    </button>

    <form
      @submit.prevent="null"
      action="#"
      id="searchForm"
      class="filter-and-sort-form collapse show"
    >
      <label for="fsTitle">
        {{ t("forms.title_contains") }}
        <input
          v-model="inputFilterTitle"
          id="fsTitle"
          type="text"
          class="form-control"
        />
      </label>

      <label for="fsThemes">
        {{ t("components.statements.themes") }}
        <input
          v-model="inputFilterThemes"
          type="text"
          name="fsThemes"
          id="fsThemes"
          class="form-control"
      /></label>

      <label for="fsRecipients">
        {{ t("components.notifications.recipients") }}
        <input
          v-model="inputFilterRecipients"
          type="text"
          name="fsRecipients"
          id="fsRecipients"
          class="form-control"
      /></label>

      <div class="filter-row row">
        <div class="form_section-header">{{ t("forms.filter") }}</div>
        <div class="form_section-options">
          <select v-model="selectFilterYear" name="" id="" class="form-select">
            <option :value="0" :selected="true">
              {{ t("forms.year_any") }}
            </option>
            <option
              v-for="year of [...Array(new Date().getFullYear() + 1).keys()]
                .slice(1991)
                .reverse()"
              :value="year"
            >
              {{ year }}
            </option>
          </select>
        </div>
      </div>

      <div class="form_section-options column">
        <div class="form_section-header">Sort</div>
        <div class="form_section-options">
          <select
            v-model="selectSortName"
            id="sortName"
            name="sortName"
            class="form-select"
          >
            <option value="asc" selected>Name ASC</option>
            <option value="desc">Name DSC</option>
          </select>
          <select
            v-model="selectSortDate"
            id="sortDate"
            name="sortDate"
            class="form-select"
          >
            <option value="asc">Date ASC</option>
            <option value="desc" selected>Date DSC</option>
          </select>
        </div>
      </div>

      <input
        class="btn cbd-btn-primary"
        type="submit"
        :value="t('forms.search')"
        @click="searchHandler()"
      />
    </form>

    <div
      class="search-terms"
      v-if="
        referencedComponents.searchResults.length +
          referencedMeetings.general.length +
          referencedNotifications.general.length +
          referencedStatements.general.length >
        0
      "
    >
      <span class="fw-bold">{{ t("forms.search_terms") }}:</span>
      <span v-show="displayQuery.title" class="badge bg-secondary">
        {{ t("forms.title_contains") }} - {{ displayQuery.title }}</span
      >
      <span v-show="displayQuery.year" class="badge bg-secondary">
        {{ t("forms.year") }} -
        {{
          displayQuery.year > 0 ? displayQuery.year : t("forms.year_any")
        }}</span
      >
      <span v-if="displayQuery.recipient" class="badge bg-secondary">
        {{ t("components.notifications.recipients") }} -
        {{ decodeURIComponent(displayQuery.recipient) }}
      </span>

      <span v-if="displayQuery.theme" class="badge bg-secondary">
        {{ t("components.statements.themes") }} -
        {{ decodeURIComponent(displayQuery.theme) }}
      </span>
    </div>
  </div>
</template>
