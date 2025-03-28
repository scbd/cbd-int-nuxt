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
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>

<template>
    <div class="loader-wrapper">
        <span class="error-warning">⚠️</span>
        <span class="loader"></span>
    </div>
</template>