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

type queryProps = "title" | "year" | "recipients" | "themes";
type query = Partial<Record<queryProps, string>>;

const selectSortName = ref<"asc" | "desc">("desc");
const selectSortDate = ref<"asc" | "desc">("desc");

const queryFilter = ref<query>({
  year: "0",
});

const displayQuery = ref<query>({
  year: "0",
});

if (props.searchParams) {
  if (props.searchParams.q.includes("recipient_ss")) {
    displayQuery.value.recipients = props.searchParams.q.substring(
      props.searchParams.q.indexOf("*") + 1,
      props.searchParams.q.lastIndexOf("*")
    );
  }
  if (
    props.searchParams.q.includes(
      `themes_${languageSettings.active_language.slice(0, 2).toUpperCase()}_ss`
    )
  ) {
    displayQuery.value.themes = props.searchParams.q.substring(
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

  displayQuery.value.recipients = "";

  if (Number(queryFilter.value.year) > 0) {
    paramQuery.push(`date_s:(${queryFilter.value.year}*)`);

    displayQuery.value.year = queryFilter.value.year;
  }

  if (queryFilter.value.title) {
    const titles: string[] = queryFilter.value.title.split(" ");
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

  if (queryFilter.value.themes) {
    const themes: string[] = queryFilter.value.themes.split(" ");
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

  if (queryFilter.value.recipients) {
    const recipients: string[] = queryFilter.value.recipients.split(" ");
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

  displayQuery.value.title = queryFilter.value.title;
  displayQuery.value.themes = queryFilter.value.themes;
  displayQuery.value.recipients = queryFilter.value.recipients;

  params.q = paramQuery.join(" AND ");
  params.sort = paramSort.sort;

  getGaiaComponents(params, componentTypes);
};

const clearParams = async (parameter: queryProps) => {
  if (parameter === "year") {
    queryFilter.value.year = "0";
    displayQuery.value.year = "0";
  } else {
    queryFilter.value[parameter] = "";
    displayQuery.value[parameter] = "";
  }
  searchHandler();
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
          v-model="queryFilter.title"
          id="fsTitle"
          type="text"
          class="form-control"
        />
      </label>

      <label for="fsThemes">
        {{ t("components.statements.themes") }}
        <input
          v-model="queryFilter.themes"
          type="text"
          name="fsThemes"
          id="fsThemes"
          class="form-control"
      /></label>

      <label for="fsRecipients">
        {{ t("components.notifications.recipients") }}
        <input
          v-model="queryFilter.recipients"
          type="text"
          name="fsRecipients"
          id="fsRecipients"
          class="form-control"
      /></label>

      <div class="filter-row row">
        <div class="form_section-header">{{ t("forms.filter") }}</div>
        <div class="form_section-options">
          <select v-model="queryFilter.year" name="" id="" class="form-select">
            <option :value="'0'" :selected="true">
              {{ t("forms.year_any") }}
            </option>
            <option
              v-for="year of [...Array(new Date().getFullYear() + 1).keys()]
                .slice(1991)
                .reverse()"
              :value="year.toString()"
            >
              {{ year }}
            </option>
          </select>
        </div>
      </div>

      <div class="form_section-options column">
        <div class="form_section-header">{{ t("forms.sort.sort") }}</div>
        <div class="form_section-options">
          <select
            v-model="selectSortName"
            id="sortName"
            name="sortName"
            class="form-select"
          >
            <option value="asc" selected>
              {{ t("forms.sort.by_name") }} &uarr;
            </option>
            <option value="desc">{{ t("forms.sort.by_name") }} &darr;</option>
          </select>
          <select
            v-model="selectSortDate"
            id="sortDate"
            name="sortDate"
            class="form-select"
          >
            <option value="asc" selected>
              {{ t("forms.sort.by_date") }} &uarr;
            </option>
            <option value="desc">{{ t("forms.sort.by_date") }} &darr;</option>
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
        {{ t("forms.title_contains") }} - {{ displayQuery.title }}
        <button
          class="btn-close btn-close-white ms-2"
          type="button"
          aria-label="Close"
          @click="clearParams('title')"
        ></button>
      </span>
      <span v-show="displayQuery.year" class="badge bg-secondary">
        {{ t("forms.year") }} -
        {{
          Number(displayQuery.year) > 0
            ? displayQuery.year
            : t("forms.year_any")
        }}
        <button
          v-show="displayQuery.year !== '0'"
          class="btn-close btn-close-white ms-2"
          type="button"
          aria-label="Close"
          @click="clearParams('year')"
        ></button>
      </span>
      <span v-if="displayQuery.recipients" class="badge bg-secondary">
        {{ t("components.notifications.recipients") }} -
        {{ decodeURIComponent(displayQuery.recipients) }}
        <button
          class="btn-close btn-close-white ms-2"
          type="button"
          aria-label="Close"
          @click="clearParams('recipients')"
        ></button>
      </span>

      <span v-if="displayQuery.themes" class="badge bg-secondary">
        {{ t("components.statements.themes") }} -
        {{ decodeURIComponent(displayQuery.themes) }}
        <button
          class="btn-close btn-close-white ms-2"
          type="button"
          aria-label="Close"
          @click="clearParams('themes')"
        ></button>
      </span>
    </div>
  </div>
</template>
