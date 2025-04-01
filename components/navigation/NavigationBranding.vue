<script setup lang="ts"></script>

<template>
    <ClientOnly>
    <NuxtLink 
        v-if="language_status.status === 'OK'"
        to="/" 
        class="navbar-brand">
        <img 
            class="cus-logo" 
            :src="`/images/CBD-logo-${ active_language?.active_language.slice(0,2).toUpperCase() }.png`" 
            alt="Convention of Biological Diversity Logo" />
    </NuxtLink>
    <Loader 
        v-else-if="language_status.status === 'error'"
        class="error-loader" />
    <Loader v-else />
    </ClientOnly>
</template>