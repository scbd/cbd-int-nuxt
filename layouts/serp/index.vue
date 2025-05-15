<script setup lang="ts"></script>

<template>
  <header class="cus-navigation">
    <nav class="navbar navbar-expand-xl d-flex flex-column">
      <NavigationOptions />
      <NavigationMegamenu />
    </nav>
  </header>

  <main class="cus-main cus-serp d-flex flex-column" role="main">
    <NavigationSubmenuHorizontal />
    <NuxtPage :page-key="(route) => route.fullPath" />
  </main>
  <Footer />
</template>
