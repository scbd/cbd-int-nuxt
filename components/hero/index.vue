<script setup lang="ts">
import type { componentSanitized } from "~/types/components";

const props = defineProps<{
  article: componentSanitized | componentSanitized[];
}>();
</script>
<template>
  <div class="cus-hero" v-if="!Array.isArray(article)">
    <div class="featured-item featured-primary" :class="'accent-cbd'">
      <NuxtImg
        v-if="article.image_cover?.url"
        :src="article.image_cover?.url"
        :alt="article.image_cover?.alt"
        :title="article.image_cover?.title"
        class="featured-cover-image"
      />
      <NuxtImg
        v-else
        src="/images/hero-primary.jpg"
        class="featured-cover-image"
      />
      <NuxtLink :to="article.url" class="featured-wrapper">
        <div class="featured-information">
          <div class="featured-taxonomy">
            <div class="featured-source">{{ "CBD" }}</div>
            <div class="featured-type">{{ article.type }}</div>
          </div>

          <div class="featured-description">{{ article.title }}</div>
        </div>
        <div class="featured-buttons d-flex container-fluid" role="group">
          <NuxtLink
            :to="article.url"
            class="btn cbd-btn cbd-btn-primary btn-lg"
            role="button"
            >Read On</NuxtLink
          >
        </div>
      </NuxtLink>
    </div>
  </div>

  <!-- <div
    class="cus-hero"
    v-else-if="Array.isArray(article) && article.length === 1"
  >
    <div class="featured-item featured-primary" :class="'accent-cbd'">
      <NuxtImg
        v-if="article[0].image_cover?.url"
        :src="article[0].image_cover?.url"
        :alt="article[0].image_cover?.alt"
        :title="article[0].image_cover?.title"
        class="featured-cover-image"
      />
      <NuxtImg
        v-else
        src="/images/hero-primary.jpg"
        class="featured-cover-image"
      />
      <NuxtLink :to="article[0].url" class="featured-wrapper">
        <div class="featured-information">
          <div class="featured-taxonomy">
            <div class="featured-source">{{ "CBD" }}</div>
            <div class="featured-type">{{ article[0].type }}</div>
          </div>

          <div class="featured-description">{{ article[0].title }}</div>
        </div>
        <div class="featured-buttons d-flex container-fluid" role="group">
          <NuxtLink
            :to="article[0].url"
            class="btn cbd-btn cbd-btn-primary btn-lg"
            role="button"
            >Read On</NuxtLink
          >
        </div>
      </NuxtLink>
    </div>
  </div> -->

  <div v-else class="cus-hero triple-features">
    <div class="featured-item featured-primary" :class="'accent-cbd'">
      <NuxtImg
        v-if="article[0].image_cover?.url"
        :src="article[0].image_cover?.url"
        :alt="article[0].image_cover?.alt"
        :title="article[0].image_cover?.title"
        class="featured-cover-image"
      />
      <NuxtImg
        v-else
        src="/images/hero-primary.jpg"
        class="featured-cover-image"
      />
      <NuxtLink :to="article[0].url" class="featured-wrapper">
        <div class="featured-information">
          <div class="featured-taxonomy">
            <div class="featured-source">{{ "CBD" }}</div>
            <div class="featured-type">{{ article[0].type }}</div>
          </div>

          <div class="featured-description">{{ article[0].title }}</div>
        </div>
        <div class="featured-buttons d-flex container-fluid" role="group">
          <NuxtLink
            :to="article[0].url"
            class="btn cbd-btn cbd-btn-primary btn-lg"
            role="button"
            >Read On</NuxtLink
          >
        </div>
      </NuxtLink>
    </div>

    <div class="triple-ancilliary-wrapper">
      <div
        v-for="secondary_article in article.slice(1, 3)"
        class="featured-item"
        :class="'accent-cbd'"
      >
        <NuxtImg
          v-if="secondary_article.image_cover?.url"
          :src="secondary_article.image_cover?.url"
          :alt="secondary_article.image_cover?.alt"
          :title="secondary_article.image_cover?.title"
          class="featured-cover-image"
        />
        <NuxtImg
          v-else
          src="/images/hero-primary.jpg"
          class="featured-cover-image"
        />
        <NuxtLink :to="secondary_article.url" class="featured-wrapper">
          <div class="featured-information">
            <div class="featured-taxonomy">
              <div class="featured-source">{{ "CBD" }}</div>
              <div class="featured-type">{{ secondary_article.type }}</div>
            </div>

            <div class="featured-description">
              {{ secondary_article.title }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
