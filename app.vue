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

<style lang="css">
  /* Loader being held here temporarily for testing */
  
  .loader-wrapper {
    width: 0;
    height: 0;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: rgba(0,0,0,.4);
    display: inline;
    overflow: hidden;
  }

  .show-loader {
    width: 100%;
    height: 100%;
    display: flex;
  }
  
  .loader {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 32px 0 #fff, -32px 0 #fff;
      position: relative;
      animation: flash 0.5s ease-out infinite alternate;
  }

  @keyframes flash {
      0% {
          background-color: #FFF2;
          box-shadow: 32px 0 #FFF2, -32px 0 #FFF;
      }

      50% {
          background-color: #FFF;
          box-shadow: 32px 0 #FFF2, -32px 0 #FFF2;
      }

      100% {
          background-color: #FFF2;
          box-shadow: 32px 0 #FFF, -32px 0 #FFF2;
      }
  }
</style>

<template>
  <div class="loader-wrapper">
      <span class="loader"></span>
  </div>
  <div class="body-replace">
    <NuxtLayout></NuxtLayout>  
  </div>
</template>
