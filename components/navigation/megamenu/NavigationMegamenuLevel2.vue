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
        v-for="level2_item in props.parent.children"
        class="level-2-item nav-item">
        <NuxtLink class="nav-link" :to="level2_item.link">
            {{ level2_item.title }}
        </NuxtLink>
        <ul 
            v-if="level2_item.children.length > 0"
            class="level-3-items nav">

            <NavigationMegamenuLevel3 :parent="level2_item" />
        </ul>
    </li>
</template>