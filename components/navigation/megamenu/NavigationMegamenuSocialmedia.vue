<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div class="social-media-follow">
    <div class="social-media-title">
      {{ t("navigation.social_media.follow") }}
    </div>
    <div class="social-media-icons">
      <NuxtLink to="#" target="_blank"
        ><NuxtImg
          src="/images/icons/icon_social-yt.svg"
          alt="Follow us on YouTube"
          class="social-media-icon"
      /></NuxtLink>
      <NuxtLink to="#" target="_blank"
        ><NuxtImg
          src="/images/icons/icon_social-fb.svg"
          alt="Follow us on Facebook"
          class="social-media-icon"
      /></NuxtLink>
      <NuxtLink to="#" target="_blank"
        ><NuxtImg
          src="/images/icons/icon_social-x.svg"
          alt="Follow us on X"
          class="social-media-icon"
      /></NuxtLink>
      <NuxtLink to="#" target="_blank"
        ><NuxtImg
          src="/images/icons/icon_social-li.svg"
          alt="Follow us on LinkedIn"
          class="social-media-icon"
      /></NuxtLink>
      <NuxtLink to="#" target="_blank"
        ><NuxtImg
          src="/images/icons/icon_social-ig.svg"
          alt="Follow us on Instagram"
          class="social-media-icon"
      /></NuxtLink>
    </div>
  </div>
</template>
