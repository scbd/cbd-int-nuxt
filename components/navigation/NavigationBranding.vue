<script setup lang="ts"></script>

<template>
    <ClientOnly>
    <NuxtLink to="/" 
        class="navbar-brand">
        <img 
            class="cus-logo" 
            :src="`/images/CBD-logo-${ active_language?.active_language.slice(0,2).toUpperCase() }.png`" 
            alt="Convention of Biological Diversity Logo" />
    </NuxtLink>
    </ClientOnly>
</template>