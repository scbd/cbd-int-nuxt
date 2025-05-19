<script setup lang="ts">
import type { searchParams } from "~/types/components";
import getComponents from "~/composables/componentApi";

const { getNotifications } = getComponents();

const props = defineProps<{
  searchParams: searchParams;
}>();

const params = ref<searchParams>(props.searchParams);
const selected = ref(new Date().getFullYear());

const searchHandler = async () => {
  params.value.q = `schema_s:notification AND symbol_s:${selected.value}-*`;
  console.log(params.value);
  await getNotifications(params.value);
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
        <input id="fsTitle" type="text" class="form-control" />
      </label>
      <label for="fsKeywords">
        Keywords
        <input id="fsKeywords" type="text" class="form-control" />
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
          <select v-model="selected" name="" id="" class="form-select">
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
        <div class="form_section-options column">
          <label class="form_section-header" for="fsLanguage">Language</label>
          <select name="fsLanguage" id="fsLanguage" class="form-select">
            <option value="" selected>English</option>
            <option value="">Arabic</option>
            <option value="">Chinese</option>
            <option value="">French</option>
            <option value="">Russian</option>
            <option value="">Spanish</option>
          </select>
        </div>

        <div class="form_section-options column">
          <div class="form_section-header">Sort</div>
          <div class="form_section-options">
            <select class="form-select">
              <option value="" selected disabled>Name</option>
              <option value="">Name ASC</option>
              <option value="">Name DSC</option>
            </select>
            <select class="form-select">
              <option value="" selected disabled>Date</option>
              <option value="">Date ASC</option>
              <option value="">Date DSC</option>
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
