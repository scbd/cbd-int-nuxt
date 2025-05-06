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
        class="level-2-item nav-item"
        :class="level2_item.children.length > 8 ? 'level-3-items-2-col' : ''">
        <NuxtLink class="nav-link" :to="level2_item.link">
            {{ level2_item.title }}
        </NuxtLink>
        <ul 
            v-if="level2_item.children.length > 0"
            class="level-3-items nav">

            <NavigationMegamenuLevel3Dynamic
                v-if="level2_item.options?.attributes?.component"
                :parent="level2_item" />
            
            <NavigationMegamenuLevel3 v-else :parent="level2_item" />
        </ul>
        <ul 
            v-else
            class="level-3-items nav">
            <NavigationMegamenuLevel3Dynamic :parent="level2_item" />
        </ul>
    </li>
</template>