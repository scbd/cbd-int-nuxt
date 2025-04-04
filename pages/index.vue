<script setup lang="ts">
definePageMeta({
    layout: 'landing-home'
})
</script>

<template>
    <div></div>
    
    <!-- <HeroSinglefeature /> -->
    <article class="cus-article container-xxl d-flex flex-column">
        <!-- <ContentobjectRow object-type="update" /> -->
        <ClientOnly>
            <ContentobjectRow object-type="meeting" :objects="meetings!" />
        </ClientOnly>
    </article>
   
</template>