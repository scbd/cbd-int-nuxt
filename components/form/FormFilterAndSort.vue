<script setup lang="ts">
import type { searchParams } from "~/types/components";
import getComponents from "~/composables/componentApi";

const { getNotifications, getStatements } = getComponents();
const route = useRoute();
const languageSettings = useLanguageStore();
const { t } = useI18n();

const props = defineProps<{
  searchParams: searchParams;
  componentType?: string;
}>();

const inputFilterTitle = ref<string>();
const inputFilterReference = ref<string>();
const selectFilterYear = ref<number>(0);
const selectSortName = ref<string>("asc");
const selectSortDate = ref<string>("desc");

const query: {
  title?: string;
  year: number;
  recipient?: string;
  theme?: string;
} = {
  year: 0,
};
const displayQuery = ref(query);

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
    props.searchParams.q.indexOf("*") + 1,
    props.searchParams.q.lastIndexOf("*")
  );
}

const searchHandler = async () => {
  let paramQuery = `schema_s:${props.componentType ?? "notification"}`;
  let paramSort = [];

  displayQuery.value.recipient = "";

  if (selectFilterYear.value > 0) {
    paramQuery = `${paramQuery} AND date_s:(${selectFilterYear.value}*)`;

    displayQuery.value.year = selectFilterYear.value;
  }

  if (inputFilterTitle.value) {
    const titles: string[] = inputFilterTitle.value.split(" ");
    paramQuery = `${paramQuery} AND title_${languageSettings.active_language.toUpperCase()}_s:(`;

    for await (const title of titles) {
      if (title !== titles[titles.length - 1]) {
        paramQuery = `${paramQuery}*${title}* AND `;
      } else {
        paramQuery = `${paramQuery}*${title}*`;
      }
    }
    paramQuery = `${paramQuery})`;

    displayQuery.value.title = inputFilterTitle.value;
  }
  if (inputFilterReference.value) {
    const references: string[] = inputFilterReference.value.split(" ");
    paramQuery = `${paramQuery} AND reference_s:(`;
    for await (const reference of references) {
      if (reference !== references[references.length - 1]) {
        paramQuery = `${paramQuery}*${reference}* AND `;
      } else {
        paramQuery = `${paramQuery}*${reference}*`;
      }
    }
    paramQuery = `${paramQuery})`;
  }
  const params: searchParams = {
    q: paramQuery,
    fl: props.searchParams.fl,
    rows: props.searchParams.rows,
  };

  if (selectSortDate.value) {
    paramSort?.push(`date_s ${selectSortDate.value}`);
  }

  if (selectSortName.value) {
    paramSort?.push(
      `title_${languageSettings.active_language.toUpperCase()}_s ${selectSortDate.value}`
    );
  }

  params.q = paramQuery;
  params.sort = paramSort;

  if (props.componentType === "statement") {
    await getStatements(params);
  } else {
    await getNotifications(params);
  }
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
      <!-- <label for="fsReference">
        Reference
        <input
          v-model="inputFilterReference"
          id="fsReference"
          type="text"
          class="form-control"
        />
      </label> -->

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

      <!-- <div class="filter-row row">
        <div class="form_section-options column">
          <label class="form_section-header" for="fsLanguage">Language</label>
          <select name="fsLanguage" id="fsLanguage" class="form-select">
            <ClientOnly>
              <option
                v-for="language in languages"
                :value="language.langCode"
                :selected="
                  language.langCode === activeLanguage!.active_language
                    ? true
                    : false
                "
              >
                {{ language.label }}
              </option>
            </ClientOnly>
          </select>
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
              <option value="asc" selected>Date ASC</option>
              <option value="desc" selec>Date DSC</option>
            </select>
          </div>
        </div>
      </div> -->
      <input
        class="btn cbd-btn-primary"
        type="submit"
        :value="t('forms.search')"
        @click="searchHandler()"
      />
    </form>
    <div class="search-terms">
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
