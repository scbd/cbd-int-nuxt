<script setup lang="ts">
import type { componentSanitized } from "~/types/components";

const props = defineProps<{
  article: componentSanitized[];
}>();
</script>

<template>
  <div class="cus-hero hero-content-page">
    <div v-for="article in article" class="featured-item">
      <NuxtImg
        v-if="article.image_cover?.url"
        :src="article.image_cover?.url"
        :alt="article.image_cover?.alt"
        :title="article.image_cover?.title"
        class="featured-cover-image"
      />
      <div class="featured-wrapper">
        <h1 class="featured-information">{{ article.title }}</h1>
      </div>
    </div>
  </div>
</template>
