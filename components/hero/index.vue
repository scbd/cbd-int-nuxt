<script setup lang="ts">
import type { componentArticle, componentSanitized } from "~/types/components";

const props = defineProps<{
  article: componentSanitized;
}>();
</script>
<template>
  <div class="cus-hero">
    <template v-if="typeof article === 'object'">
      <div
        class="featured-item featured-primary d-flex justify-content-center"
        :class="['accent-cbd']"
      >
        <div class="featured-wrapper">
          <div class="featured-information">
            <div class="featured-taxonomy">
              <div class="featured-source">{{ "CBD" }}</div>
              <div class="featured-type">{{ props.article.type }}</div>
            </div>

            <div class="featured-description">{{ props.article.title }}</div>
          </div>
          <div class="featured-buttons d-flex container-fluid" role="group">
            <NuxtLink
              :to="article.url"
              class="btn cbd-btn cbd-btn-primary btn-lg"
              role="button"
              >Learn More</NuxtLink
            >
            <!-- <NuxtLink
              to="#"
              class="btn cbd-btn cbd-btn-primary btn-lg"
              role="button"
              >Submit Registrations</NuxtLink
            > -->
          </div>
        </div>
      </div>
    </template>

    <template v-else> </template>
  </div>
</template>
