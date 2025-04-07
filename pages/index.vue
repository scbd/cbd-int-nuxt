<script setup lang="ts">
import getComponents from "~/composables/componentApi";

const { getMeetings } = getComponents();

onMounted(async () => {
  await getMeetings(null, [], { params: "" }, null);
});

definePageMeta({
  layout: "landing-home",
});
</script>

<template>
  <!-- <HeroSinglefeature /> -->
  <article class="cus-article container-xxl d-flex flex-column">
    <!-- <ContentobjectRow object-type="update" /> -->
    <ContentobjectRow object-type="meeting" :objects="meetings!" />
  </article>
</template>
