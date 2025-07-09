<script setup lang="ts">
import getComponents from "~/composables/componentApi";
import type { componentGaiaType, searchParams } from "~/types/components";

const { t } = useI18n();
const { getGaiaComponents } = getComponents();

const props = defineProps<{
  componentTypes: componentGaiaType;
  componentSearch: searchParams;
}>();

const searchResults = ref({
  found: 0,
  start: props.componentSearch.start ?? 0,
  pageCurrent: 1,
  pageTotal: 1,
  steps: 20,
  search: props.componentSearch,
});

if (props.componentTypes.length > 1) {
  searchResults.value.found = referencedComponents.value.numFound;
  searchResults.value.start = referencedComponents.value.start + 1;
  searchResults.value.steps = referencedComponents.value.start + 20;
  searchResults.value.pageCurrent =
    Math.floor(referencedComponents.value.start / searchResults.value.steps) +
    1;
} else {
  if (props.componentTypes[0] === "meeting") {
    searchResults.value.found = referencedMeetings.value.numFound;
    searchResults.value.start = referencedMeetings.value.start + 1;
    searchResults.value.steps = referencedMeetings.value.start + 20;
    searchResults.value.pageCurrent =
      Math.floor(referencedMeetings.value.start / searchResults.value.steps) +
      1;
  } else if (props.componentTypes[0] === "notification") {
    searchResults.value.found = referencedNotifications.value.numFound;
    searchResults.value.start = referencedNotifications.value.start + 1;
    searchResults.value.steps = referencedNotifications.value.start + 20;
    searchResults.value.pageCurrent =
      Math.floor(
        referencedNotifications.value.start / searchResults.value.steps
      ) + 1;
  } else if (props.componentTypes[0] === "statement") {
    searchResults.value.found = referencedStatements.value.numFound;
    searchResults.value.start = referencedStatements.value.start + 1;
    searchResults.value.steps = referencedStatements.value.start + 20;
    searchResults.value.pageCurrent =
      Math.floor(referencedStatements.value.start / searchResults.value.steps) +
      1;
  }
}

searchResults.value.pageTotal = Math.ceil(
  searchResults.value.found / searchResults.value.steps
);

const pageHandler = async (event: Event, select = false) => {
  if (select) {
    searchResults.value.search.start = Math.max(
      0,
      Math.floor(
        (Number((event.target as HTMLSelectElement).value) - 1) *
          searchResults.value.steps
      )
    );
    searchResults.value.pageCurrent = Number(
      (event.target as HTMLSelectElement).value
    );
  } else {
    searchResults.value.pageCurrent = Number(
      (event.target as HTMLElement).getAttribute("data-page-number")
    );

    searchResults.value.start = Math.max(
      0,
      Math.floor(
        (Number(
          (event.target as HTMLElement).getAttribute("data-page-number")
        ) -
          1) *
          searchResults.value.steps
      )
    );
    searchResults.value.search.start = Math.max(
      0,
      Math.floor(
        (Number(
          (event.target as HTMLElement).getAttribute("data-page-number")
        ) -
          1) *
          searchResults.value.steps
      )
    );
  }

  await getGaiaComponents(searchResults.value.search, props.componentTypes);
};

watch(
  [
    referencedComponents.value,
    referencedMeetings.value,
    referencedNotifications.value,
    referencedStatements.value,
  ],
  () => {
    if (props.componentTypes.length > 1) {
      searchResults.value.found = referencedComponents.value.numFound;
      searchResults.value.pageCurrent =
        Math.floor(
          referencedComponents.value.start / searchResults.value.steps
        ) + 1;
    } else {
      if (props.componentTypes[0] === "meeting") {
        searchResults.value.found = referencedMeetings.value.numFound;
        searchResults.value.pageCurrent =
          Math.floor(
            referencedMeetings.value.start / searchResults.value.steps
          ) + 1;
      } else if (props.componentTypes[0] === "notification") {
        searchResults.value.found = referencedNotifications.value.numFound;
        searchResults.value.pageCurrent =
          Math.floor(
            referencedNotifications.value.start / searchResults.value.steps
          ) + 1;
      } else if (props.componentTypes[0] === "statement") {
        searchResults.value.found = referencedStatements.value.numFound;
        searchResults.value.pageCurrent =
          Math.floor(
            referencedStatements.value.start / searchResults.value.steps
          ) + 1;
      }
    }

    searchResults.value.pageTotal = Math.ceil(
      searchResults.value.found / searchResults.value.steps
    );

    if (searchResults.value.pageCurrent > searchResults.value.pageTotal) {
      searchResults.value.pageCurrent = 1;
    }
  }
);
</script>
<template>
  <div class="results-info-wrapper">
    <div class="results-info">
      {{ t("forms.results") }}
      {{
        searchResults.pageCurrent * searchResults.steps -
        searchResults.steps +
        1
      }}
      -
      {{
        searchResults.pageCurrent * searchResults.steps > searchResults.found
          ? searchResults.found
          : searchResults.pageCurrent * searchResults.steps
      }}
      {{ t("forms.of") }}
      {{ searchResults.found }}
    </div>
    <div class="results-pagination">
      <template
        v-if="Math.floor(searchResults.found / searchResults.steps) < 10"
      >
        <div
          v-for="page of Math.floor(searchResults.found / searchResults.steps)"
          :class="[
            'page',
            { 'current-page': page == searchResults.pageCurrent },
          ]"
          :data-page-number="page"
          @click="(event) => pageHandler(event)"
        >
          {{ page }}
        </div>
      </template>

      <template v-else>
        <!-- Previous Page -->
        <button
          v-if="searchResults.pageCurrent > 1"
          class="btn page search-results-control prev-page"
          :data-page-number="searchResults.pageCurrent - 1"
          @click="(event) => pageHandler(event)"
        >
          &nbsp;
        </button>

        <div
          v-if="searchResults.pageCurrent < 5"
          v-for="page of [].length = 5"
          :class="[
            'page',
            { 'current-page': page == searchResults.pageCurrent },
          ]"
          :data-page-number="page"
          @click="(event) => pageHandler(event)"
        >
          {{ page }}
        </div>

        <div
          v-else-if="searchResults.pageTotal > searchResults.pageCurrent + 5"
          v-for="page of Array.from(
            {
              length: 5,
            },
            (value, index) => searchResults.pageCurrent + index
          )"
          :class="[
            'page',
            { 'current-page': page == searchResults.pageCurrent },
          ]"
          :data-page-number="page"
          @click="(event) => pageHandler(event)"
        >
          {{ page }}
        </div>

        <div
          v-else-if="
            searchResults.pageTotal < searchResults.pageCurrent + 5 &&
            searchResults.pageTotal - searchResults.pageCurrent > 1
          "
          v-for="page of Array.from(
            {
              length: 5,
            },
            (value, index) =>
              searchResults.pageCurrent +
              index -
              (Math.ceil(searchResults.found / searchResults.steps) -
                searchResults.pageCurrent)
          )"
          :class="[
            'page',
            { 'current-page': page == searchResults.pageCurrent },
          ]"
          :data-page-number="page"
          @click="(event) => pageHandler(event)"
        >
          {{ page }}
        </div>

        <div
          v-else
          v-for="page of Array.from(
            { length: 5 },
            (value, index) => searchResults.pageTotal - 5 + index
          )"
          :class="[
            'page',
            { 'current-page': page == searchResults.pageCurrent },
          ]"
          :data-page-number="page"
          @click="(event) => pageHandler(event)"
        >
          {{ page }}
        </div>

        <!-- Next Page button -->
        <button
          v-if="searchResults.pageCurrent < searchResults.pageTotal"
          class="btn page search-results-control next-page"
          :data-page-number="searchResults.pageCurrent + 1"
          @click="(event) => pageHandler(event)"
        >
          &nbsp;
        </button>

        <div>
          <select
            v-model="searchResults.pageCurrent"
            @change="(event) => pageHandler(event, true)"
            class="form-select"
          >
            <option
              v-for="page in Array.from(
                {
                  length: Math.ceil(searchResults.found / searchResults.steps),
                },
                (value, index) => index + 1
              )"
              :value="page"
            >
              {{ page }}
            </option>
          </select>
        </div>

        <div
          :class="[
            'page',
            {
              'current-page':
                searchResults.pageCurrent >= searchResults.pageTotal,
            },
          ]"
          :data-page-number="searchResults.pageTotal"
          @click="(event) => pageHandler(event)"
        >
          {{ searchResults.pageTotal }}
        </div>
      </template>
    </div>
  </div>
</template>
