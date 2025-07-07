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
  start: 0,
  page: 1,
  steps: 20,
  search: props.componentSearch,
});

if (props.componentTypes.length > 1) {
  searchResults.value.found = referencedComponents.value.numFound;
  searchResults.value.start = referencedComponents.value.start + 1;
  searchResults.value.steps = referencedComponents.value.start + 20;
} else {
  if (props.componentTypes[0] === "meeting") {
    searchResults.value.found = referencedMeetings.value.numFound;
    searchResults.value.start = referencedMeetings.value.start + 1;
    searchResults.value.steps = referencedMeetings.value.start + 20;
  } else if (props.componentTypes[0] === "notification") {
    searchResults.value.found = referencedNotifications.value.numFound;
    searchResults.value.start = referencedNotifications.value.start + 1;
    searchResults.value.steps = referencedNotifications.value.start + 20;
  } else if (props.componentTypes[0] === "statement") {
    searchResults.value.found = referencedStatements.value.numFound;
    searchResults.value.start = referencedStatements.value.start + 1;
    searchResults.value.steps = referencedStatements.value.start + 20;
  }
}

const pageHandler = async (event: Event, select = false) => {
  if (select) {
    searchResults.value.search!.start = Math.max(
      0,
      Math.floor(
        (Number((event.target as HTMLSelectElement).value) - 1) *
          searchResults.value.steps
      )
    );
    searchResults.value.page = Number(
      (event.target as HTMLSelectElement).value
    );
  } else {
    searchResults.value.page = Number((event.target as HTMLElement).innerText);

    searchResults.value.start = Math.max(
      0,
      Math.floor(
        (Number((event.target as HTMLElement).innerText) - 1) *
          searchResults.value.steps
      )
    );
    searchResults.value.search!.start = Math.max(
      0,
      Math.floor(
        (Number((event.target as HTMLElement).innerText) - 1) *
          searchResults.value.steps
      )
    );
  }

  // if (props.componentType === "meeting") {
  //   await getMeetings(searchResults.value.search!);
  // } else if (props.componentType === "notification") {
  //   await getNotifications(searchResults.value.search!);
  // } else if (props.componentType === "statement") {
  //   await getStatements(searchResults.value.search!);
  // }

  getGaiaComponents(searchResults.value.search, props.componentTypes);
};
</script>
<template>
  <div class="results-info-wrapper">
    <div class="results-info">
      {{ t("forms.results") }}
      {{ searchResults.page * searchResults.steps - searchResults.steps + 1 }} -
      {{ searchResults.page * searchResults.steps }} {{ t("forms.of") }}
      {{ searchResults.found }}
    </div>
    <div class="results-pagination">
      <template
        v-if="Math.floor(searchResults.found / searchResults.steps) < 10"
      >
        <div
          v-for="page of Math.floor(searchResults.found / searchResults.steps)"
          :class="['page', { 'current-page': page == searchResults.page }]"
          @click="(event) => pageHandler(event)"
        >
          {{ page }}
        </div>
      </template>

      <template v-else>
        <!-- <div
          v-for="page of Array.from(
            { length: 3 },
            (value, index) => searchResults.page + index
          )"
          :class="['page', { 'current-page': page == searchResults.page }]"
          @click="(event) => pageHandler(event)"
        >
          {{ page }}
        </div> -->

        <div
          :class="[
            'page',
            { 'current-page': searchResults.start <= searchResults.steps },
          ]"
          @click="(event) => pageHandler(event)"
        >
          {{ 1 }}
        </div>

        <div>
          <select
            @change="(event) => pageHandler(event, true)"
            class="form-select"
          >
            <option :value="null" disabled>...</option>
            <option
              v-for="page in Array.from(
                {
                  length: Math.floor(searchResults.found / searchResults.steps),
                },
                (value, index) => index + 1
              )"
              :value="page"
            >
              {{ page }}
            </option>
          </select>
        </div>
        <!-- <div
          v-for="page of Array.from(
            { length: 3 },
            (value, index) =>
              Math.floor(searchResults.found / searchResults.steps) - 2 + index
          )"
          class="page"
          @click="(event) => pageHandler(event)"
        >
          {{ page }}
        </div> -->
        <div
          :class="[
            'page',
            { 'current-page': searchResults.start >= searchResults.found },
          ]"
          @click="(event) => pageHandler(event)"
        >
          {{ Math.ceil(searchResults.found / searchResults.steps) }}
        </div>
      </template>
    </div>
  </div>
</template>
