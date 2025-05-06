<script setup lang="ts"></script>

<style lang="css">
  /* Loader being held here temporarily for testing */
  
  .loader-wrapper {
    width: 100%;
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.4);
  }
  
  .error-warning {
    display: none;
    font-size: 3rem;
    animation: error-flash 1.5s ease-in-out infinite;
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

  .error-loader .loader {
    display: none;
  }

  .error-loader .error-warning {
    display: block;
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

  @keyframes error-flash {
    0% {
      opacity: 0.8;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0.8;
    }
  }
</style>

<template>
  <div class="loader-wrapper">
      <span class="error-warning">
        <svg fill="#fff" width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <title>warning</title>
          <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path>
        </svg>
      </span>
      <span class="loader"></span>
  </div>
</template>