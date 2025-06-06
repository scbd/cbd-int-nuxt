<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();
</script>

<style>
@import "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wdth,wght@0,62.5..100,100..900;1,62.5..100,100..900&display=swap";

:root {
  --cbd-green: #009c48;
  --gradient-green: #004e24;
  --white: #fff;
  --text-color: #1a1a1a;
  font-size: 18px;
  font-family: "Noto Sans", sans-serif;
  line-height: 1.5;
  scroll-behavior: smooth;
}

body {
  padding: 0;
  margin: 0;
  color: var(--text-color);
}

.under-construction {
  width: 100%;
  height: 100vh;
  padding: 0;
  display: flex;
  overflow: hidden;
}

.error-heading {
  color: var(--cbd-green);
}

h1.error-heading {
  font-size: 2.4rem;
  margin: 0 0 0.5rem;
}

h2.error-heading {
  font-size: 1.8rem;
  margin: 0;
}

.graphic {
  flex: 1 1 60%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  background: linear-gradient(45deg, var(--gradient-green), var(--cbd-green));
  clip-path: polygon(0 0, 70% 0, 100% 100%, 0 100%);

  .cbd-logo {
    width: 75%;
  }
}

.info {
  flex: 1 1 calc(40% - 4rem);
  flex-direction: column;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .titles {
    flex: 2 1 calc(100% - 1rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .error-msg {
    flex-basis: 1rem;
    align-self: flex-end;
    color: lightgrey;
    font-size: 0.67rem;
    text-align: right;
  }
}

@media (max-width: 900px) {
  .under-construction {
    flex-direction: column-reverse;
    overflow: auto;
  }
  .info {
    height: 50%;
    flex: 1 1 auto;
  }
  .graphic {
    height: 50%;
    flex: 1 1 auto;
    justify-content: center;
    clip-path: none;

    .cbd-logo {
      width: auto;
      height: calc(100% - 2rem);
    }
  }
}
</style>

<template>
  <div class="under-construction">
    <div class="graphic">
      <svg
        class="cbd-logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 819.25 1044"
      >
        <path
          class="leaf"
          fill="#ffffff"
          d="M425.51,463.28v-135.15c0-1.48,1.38-166.23,149.31-173.31l95.02-4.23c64.82-8.95,102.49-27.44,125.8-76.72v193.87s-.2,5.7-2.36,14.56c-15.05,59.7-72.59,84.2-134.07,87.44l-82.92,4.23c-90.98,4.82-121.97,41.7-150.89,89.51l.1-.2ZM425.51,799.28c0-1.38,1.38-166.33,149.31-173.31l95.02-4.23c64.82-8.95,102.49-27.34,125.8-76.72v193.87s-.2,5.7-2.36,14.46c-15.05,59.7-72.59,84.2-134.07,87.44l-82.92,4.23c-90.98,4.82-121.97,41.7-150.89,89.41v-135.25l.1.1ZM390.98,725.8c-28.92-47.8-59.9-84.69-150.89-89.41l-82.92-4.23c-61.57-3.25-119.11-27.74-134.07-87.44-2.16-8.75-2.36-14.46-2.36-14.46v-193.87c23.31,49.38,61.08,67.87,125.8,76.82l95.11,4.23c147.93,7.08,149.31,171.93,149.31,173.41v135.15-.2ZM575.61,397.67l87.44-4.62c152.95-8.46,156-124.72,156-125.7V1.28l-12.79-1.28c-.1.69-23.9,118.92-133.38,124.43l-100.23,4.72c-84.59,4.13-127.38,56.16-148.43,106.23-21.05,49.77-21.25,98.36-21.25,98.66v186.69c-2.46-8.16-5.11-15.93-8.16-23.21-21.15-50.07-63.84-102-148.43-106.23l-100.23-4.62c-65.8-3.34-108-48.49-128.07-105.93-3.84-11.21-5.41-18.59-5.41-18.59l-12.69,1.28v266.07s.1,7.57,2.85,18.89c17.21,71.8,82.23,102.89,153.15,106.82l87.44,4.62c128.75,7.18,157.67,149.9,159.64,173.61v210.59h12.98c0-14.46,25.97-168.39,159.74-175.77l87.44-4.62c152.95-8.46,156-124.72,156-125.7v-266.07l-12.79-1.18c-.1.59-23.9,118.92-133.38,124.43l-100.23,4.62c-84.69,4.23-127.38,56.26-148.43,106.33-3.15,7.48-5.9,14.95-8.16,22.23v-155.61c-1.67-11.41,35.11-174.98,159.64-174.98"
        />
      </svg>
    </div>
    <div class="info">
      <hgroup class="titles">
        <h1 class="error-heading">{{ error.statusCode }}</h1>
        <h2 class="error-heading">{{ error.statusMessage }}</h2>
      </hgroup>
      <div id="error-msg" class="error-msg">
        {{ error.cause }}
      </div>
    </div>
  </div>
</template>
