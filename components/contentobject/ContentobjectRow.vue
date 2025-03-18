<script setup lang="ts">
    const props = defineProps<{
        objectType?: string,
    }>();
</script>

<template>
    <section class="content-row content-updates d-flex flex-column">
        <div class="row-title">Recent {{ objectType }}s</div>
        <div class="content-wrapper d-flex">
            <!-- v-for items in row -->
            <ContentobjectBlock 
                :object-type = props.objectType
                :object-title="'Astrid Schomaker - Executive Secretary of the Secretariat of the Convention on Biological Diversity'"
                :object-date="new Date('July 29, 2024')"
                :object-description="'In April 2024, the United Nations Secretary-General appointed Astrid Schomaker Executive Secretary of the Secretariat of the Convention on Biological Diversity (CBD).'"
                :object-info="{
                    source: 'cbd',
                    type: 'article',
                    }" 
                :object-img="{
                    imgSrc: '/images/update-0.jpg',
                    imgDescription: ''
                }"
                />
            <ContentobjectBlock 
                :object-type = props.objectType
                :object-title="'Astrid Schomaker - Executive Secretary of the Secretariat of the Convention on Biological Diversity'"
                :object-date="new Date('July 29, 2024')"
                :object-description="'In April 2024, the United Nations Secretary-General appointed Astrid Schomaker Executive Secretary of the Secretariat of the Convention on Biological Diversity (CBD).'"
                :object-info="{
                    source: 'cbd',
                    type: 'article',
                    }" 
                :object-img="{
                    imgSrc: '/images/update-0.jpg',
                    imgDescription: ''
                }"
                />
            <ContentobjectBlock 
                :object-type = props.objectType
                :object-title="'Astrid Schomaker - Executive Secretary of the Secretariat of the Convention on Biological Diversity'"
                :object-date="new Date('July 29, 2024')"
                :object-description="'In April 2024, the United Nations Secretary-General appointed Astrid Schomaker Executive Secretary of the Secretariat of the Convention on Biological Diversity (CBD).'"
                :object-info="{
                    source: 'cbd',
                    type: 'article',
                    }" 
                :object-img="{
                    imgSrc: '/images/update-0.jpg',
                    imgDescription: ''
                }"
                />
            <ContentobjectBlock 
                :object-type = props.objectType
                :object-title="'Astrid Schomaker - Executive Secretary of the Secretariat of the Convention on Biological Diversity'"
                :object-date="new Date('July 29, 2024')"
                :object-description="'In April 2024, the United Nations Secretary-General appointed Astrid Schomaker Executive Secretary of the Secretariat of the Convention on Biological Diversity (CBD).'"
                :object-info="{
                    source: 'cbd',
                    type: 'article',
                    }" 
                :object-img="{
                    imgSrc: '/images/update-0.jpg',
                    imgDescription: ''
                }"
                />
        </div>
    </section>
</template>