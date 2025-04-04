<script setup lang="ts">
import type { componentRequest } from '~/types/components';

    const props = defineProps<{
        objectType: string,
        objects: componentRequest
    }>();
</script>

<template>
    <section class="content-row content-updates d-flex flex-column">
        <div class="row-title">Recent {{ objectType }}s</div>
        <div class="content-wrapper d-flex">
            <ContentobjectBlock 
                v-for="content_object in objects?.meetings"
                :object-type="props.objectType"
                :object-title="content_object.title.en"
                :object-date="content_object.start_date"
                :object-location="content_object.event_city.en"
                />
        </div>
    </section>
</template>