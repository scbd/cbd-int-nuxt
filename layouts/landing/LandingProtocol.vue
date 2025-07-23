<script setup lang="ts"></script>

<template>
  <div class="body-replace">
    <header class="cus-navigation">
      <nav class="navbar navbar-expand-xl d-flex flex-column">
        <NavigationOptions />
        <NavigationMegamenu />
      </nav>
    </header>
    <main
      class="cus-main cus-landing-page-protocol d-flex flex-column"
      role="main"
    >
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>
