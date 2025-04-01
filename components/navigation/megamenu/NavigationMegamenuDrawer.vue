<script setup lang="ts">
    import type { fetchedMenuItem } from '~/types/drupalMenu';
    
    const props = defineProps<
    {
        parent: fetchedMenuItem
    }
    >();
</script>

<template>
    <nav class="mega-menu-drawer dropdown-menu container-fluid">
                    
        <ul class="mega-menu-drawer-internal nav">
            <li class="sections-header">Sections</li>
            <li class="level-1-item nav-item">
                <NuxtLink class="nav-link" :to="props.parent.link">
                    {{ props.parent.title }}
                </NuxtLink>
            </li>

            <div 
                v-if="props.parent.children.length > 0"
                class="level-2-items">
                
                <NavigationMegamenuLevel2 :parent="props.parent" />
                
            </div>
        </ul>

        <NavigationMegamenuSocialmedia />

    </nav>
</template>