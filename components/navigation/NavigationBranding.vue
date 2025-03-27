<script setup lang="ts"></script>

<template>
    <ClientOnly>
    <NuxtLink to="/" 
        class="navbar-brand">
        <img 
            class="cus-logo" 
            :src="`/images/CBD-logo-${ active_language?.active_language.includes('-') ? active_language?.active_language.replace('-hans','').toUpperCase() : active_language?.active_language.toUpperCase() }.png`" 
            alt="Convention of Biological Diversity Logo" />
    </NuxtLink>
    </ClientOnly>
</template>