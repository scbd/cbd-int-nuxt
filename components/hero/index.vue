<script setup lang="ts">
import type { componentSanitized } from "~/types/components";

const { t } = useI18n();

const props = defineProps<{
  articles: componentSanitized[];
}>();
</script>
<template>
  <div class="cus-hero" v-if="articles.length === 1">
    <div
      v-for="article in articles"
      class="featured-item featured-primary"
      :class="'accent-cbd'"
    >
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
        <div class="featured-buttons container-fluid" role="group">
          <NuxtLink
            :to="article.url"
            class="btn cbd-btn cbd-btn-primary btn-lg"
            role="button"
            >{{ t("components.articles.view") }}</NuxtLink
          >
        </div>
      </NuxtLink>
    </div>
  </div>

  <div v-else class="cus-hero triple-features">
    <div class="featured-items">
      <div class="featured-item featured-primary" :class="'accent-cbd'">
        <NuxtImg
          v-if="articles[0].image_cover?.url"
          :src="articles[0].image_cover?.url"
          :alt="articles[0].image_cover?.alt"
          :title="articles[0].image_cover?.title"
          class="featured-cover-image"
        />
        <NuxtImg
          v-else
          src="/images/hero-primary.jpg"
          class="featured-cover-image"
        />
        <NuxtLink :to="articles[0].url" class="featured-wrapper">
          <div class="featured-information">
            <div class="featured-taxonomy">
              <div class="featured-source">{{ "CBD" }}</div>
              <div class="featured-type">{{ articles[0].type }}</div>
            </div>

            <div class="featured-description">{{ articles[0].title }}</div>
          </div>
          <div class="featured-buttons container-fluid" role="group">
            <NuxtLink
              :to="articles[0].url"
              class="btn cbd-btn cbd-btn-primary btn-lg"
              role="button"
              >{{ t("components.articles.view") }}</NuxtLink
            >
          </div>
        </NuxtLink>
      </div>

      <div class="triple-ancilliary-wrapper">
        <div
          v-for="secondaryArticle in articles.slice(1, 3)"
          class="featured-item"
          :class="'accent-cbd'"
        >
          <NuxtImg
            v-if="secondaryArticle.image_cover?.url"
            :src="secondaryArticle.image_cover?.url"
            :alt="secondaryArticle.image_cover?.alt"
            :title="secondaryArticle.image_cover?.title"
            class="featured-cover-image"
          />
          <NuxtImg
            v-else
            src="/images/hero-primary.jpg"
            class="featured-cover-image"
          />
          <NuxtLink :to="secondaryArticle.url" class="featured-wrapper">
            <div class="featured-information">
              <div class="featured-taxonomy">
                <div class="featured-source">{{ "CBD" }}</div>
                <div class="featured-type">{{ secondaryArticle.type }}</div>
              </div>

              <div class="featured-description">
                {{ secondaryArticle.title }}
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <NuxtLink
      :to="{ name: 'article' }"
      class="btn cbd-btn cbd-btn-outline-more-content"
      >{{ t("components.articles.more") }}</NuxtLink
    >
  </div>
</template>
