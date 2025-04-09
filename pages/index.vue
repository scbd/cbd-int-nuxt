<script setup lang="ts">
import getComponents, {
  getComponentsTest,
  notifications,
} from "~/composables/componentApi";

const { getMeetings } = getComponents();

onMounted(async () => {
  await getMeetings(null, [], { params: "" }, null);
  await getComponentsTest("notifications", null);
});

definePageMeta({
  layout: "landing-home",
});
</script>

<template>
  <!-- <HeroSinglefeature /> -->
  <article class="cus-article container-xxl d-flex flex-column">
    <!-- <ContentobjectRow object-type="update" /> -->
    <ContentobjectRow object-type="meeting" :objects="meetings" />
    <ContentobjectRow object-type="notification" :objects="notifications" />
  </article>
</template>
