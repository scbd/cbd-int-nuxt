<script setup lang="ts">
import type { searchParams } from "~/types/components";
import getComponents from "~/composables/componentApi";

const { getNotifications } = getComponents();

const props = defineProps<{
  searchParams: searchParams;
}>();

const inputFilterTitle = ref<string>();
const inputFilterReference = ref<string>();
const selectFilterYear = ref<number>(new Date().getFullYear());
const selectSortName = ref<string>("asc");
const selectSortDate = ref<string>("desc");

const searchHandler = async () => {
  let paramQuery = props.searchParams.q;
  let paramSort = [];

  if (selectFilterYear.value) {
    paramQuery = `${props.searchParams.q} AND symbol_s:${selectFilterYear.value}-*`;
  }

  if (inputFilterTitle.value) {
    const titles: string[] = inputFilterTitle.value.split(" ");
    paramQuery = `${paramQuery} AND title_${activeLanguage.value!.active_language.slice(0, 2).toUpperCase()}_s:(`;

    for await (const title of titles) {
      if (title !== titles[titles.length - 1]) {
        paramQuery = `${paramQuery}*${title}* AND `;
      } else {
        paramQuery = `${paramQuery}*${title}*`;
      }
    }
    paramQuery = `${paramQuery})`;
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
      `title_${activeLanguage.value!.active_language.slice(0, 2).toUpperCase()}_s ${selectSortDate.value}`
    );
  }

  params.q = paramQuery;
  params.sort = paramSort;

  console.log(params);
  await getNotifications(params);
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
      Filter and Sort
    </button>

    <form action="#" id="searchForm" class="filter-and-sort-form collapse show">
      <label for="fsTitle">
        Title Contains
        <input
          v-model="inputFilterTitle"
          id="fsTitle"
          type="text"
          class="form-control"
        />
      </label>
      <label for="fsReference">
        Reference
        <input
          v-model="inputFilterReference"
          id="fsReference"
          type="text"
          class="form-control"
        />
      </label>

      <div class="filter-row row">
        <div class="form_section-header">Filter</div>
        <div class="form_section-options">
          <!-- <select name="" id="" class="form-select">
            <option value="" selected disabled>Sector</option>
            <option value="">CBD</option>
            <option value="">Cartagena Protocol</option>
            <option value="">Nagoya Protocol</option>
            <option value="">Supplementary Protocol</option>
          </select>
          <select name="" id="" class="form-select">
            <option value="" selected disabled>Subject</option>
            <option value="">Subject 1</option>
            <option value="">Subject 2</option>
            <option value="">Subject 3</option>
          </select>
          <select name="" id="" class="form-select">
            <option value="" selected disabled>Another Selection</option>
            <option value="">Option 1</option>
            <option value="">Option 2</option>
            <option value="">Option 3</option>
          </select> -->
          <select v-model="selectFilterYear" name="" id="" class="form-select">
            <template
              v-for="year of [...Array(new Date().getFullYear() + 1).keys()]
                .slice(1991)
                .reverse()"
            >
              <option
                :value="year"
                :selected="year === new Date().getFullYear() ? true : false"
              >
                {{ year }}
              </option>
            </template>
          </select>
        </div>
      </div>

      <div class="filter-row row">
        <!-- <div class="form_section-options column">
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
        </div> -->

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
      </div>
      <button
        class="btn cbd-btn-primary"
        type="button"
        @click="searchHandler()"
      >
        Search
      </button>
    </form>
  </div>
</template>
