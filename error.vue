<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <div>{{ error.statusCode }}: {{ error.statusMessage }}</div>
</template>
