<script setup lang="ts">
  useHead({
    script: [{
      // src: '~/assets/bootstrap/dist/js/bootstrap.min.js',
      src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
      integrity: 'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz',
      crossorigin: 'anonymous',
      type: 'text/javascript',
      tagPosition: 'bodyClose'
    }]
  })
</script>

<template>
  <div class="body-replace">
    <NuxtRouteAnnouncer />
    <NuxtLayout></NuxtLayout>
  </div>
</template>
