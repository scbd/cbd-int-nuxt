<script setup lang="ts">
    import type { fetchedMenuItem } from '~/types/drupalMenu';
    
    const props = defineProps<
    {
        parent: fetchedMenuItem
    }
    >();
</script>

<template>
    <li 
        class="nav-item"
        v-for="(i = 1) in 3">
        <NuxtLink class="nav-link" to="#">
            {{ `Dynamic Content - ${i}` }}
        </NuxtLink>
    </li>
    <!-- <li 
        v-for="level3_item in props.parent.children"
        class="nav-item">
        <NuxtLink class="nav-link" :to="level3_item.link">
            {{ level3_item.title }}
        </NuxtLink>
    </li> -->
</template>
