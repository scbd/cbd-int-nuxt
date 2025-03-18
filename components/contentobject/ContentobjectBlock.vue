<script setup lang="ts">
    defineProps<{
        objectType?: string,
        objectTitle?: string,
        objectDate?: Date,
        objectSubjects?: string[],
        objectLocation?: string,
        objectActionrequired?: string,
        objectDescription?: string,
        objectLink?: URL,
        objectImg?: {
            imgSrc?: string,
            imgDescription?: string,
        },
        objectInfo?: {
            source?: string,
            type?: string
        },
        objectGBFtarget?: {
            number: number,
            description: string,
            colour: string,
            resources: string[]
        },
    }>();
</script>

<template>
    <div 
        v-if="objectType === 'update'"    
        class="content-object" 
        :class="[objectType, objectInfo?.source ? `accent-${objectInfo.source}` : '']"
        >
        <img 
            v-show="objectImg"
            :src="objectImg?.imgSrc" 
            :alt="objectImg?.imgDescription" 
            class="content-image"
            />
        <div class="information">
            <div class="taxonomy">
                <div class="source">{{ objectInfo?.source }}</div>
                <div class="type">{{ objectInfo?.type }}</div>
            </div>
            <div class="date">{{ objectDate?.toLocaleDateString() }}</div>
        </div>
        <div class="title">{{ objectTitle }}</div>
        <div class="description">{{ objectDescription }}</div>
        <div class="read-on-wrapper"><NuxtLink :to="objectLink" class="read-on">Read on</NuxtLink></div>
    </div>

    <div 
        v-else-if="objectType === 'meeting' || objectType === 'notification' || objectType === 'statement'"
        class="content-object"
        :class="objectType"
        >
        <div class="date">{{ objectDate }}</div>
        <div class="title">{{ objectTitle }}</div>
        <div v-show="objectLocation" class="location">{{ objectLocation }}</div>
        <div v-show="objectActionrequired" class="action-required">{{ objectActionrequired }}</div>
        <div v-show="objectSubjects" class="subjects"> {{ objectSubjects }}</div>
        <div class="description">{{ objectDescription }}</div>
        <div class="read-on-wrapper"><NuxtLink :to="objectLink" class="read-on">View Meeting</NuxtLink></div>
    </div>

    <div
        v-else-if="objectType === 'gbf-target'"
        class="content-object"
        :class="`gbf-target-${objectGBFtarget?.number}`"
        >
        <div class="resources">
            <div class="resource-title">Head line indicators</div>
        </div>
        <div class="links">
            <NuxtLink to="#">Why is this target important?</NuxtLink>
            <NuxtLink to="#">Target Explanation</NuxtLink>
            <NuxtLink to="#">Guiding Questions</NuxtLink>
            <NuxtLink to="#">Links to other elements</NuxtLink>
            <NuxtLink to="#">Relevant Resources</NuxtLink>
            <NuxtLink to="#">Indicators</NuxtLink>
        </div>
        <NuxtLink :to="objectLink" class="view-target">View Target</NuxtLink>
    </div>

    <div
        v-else-if="objectType === 'portals-resources' || objectType === 'submissions'"
        class="content-object"
        :class="objectType"
        >
        <NuxtLink :to="objectLink" class="content-link">
            <img
                v-show="objectImg"
                :src="objectImg?.imgSrc" 
                :alt="objectImg?.imgDescription" 
                class="content-image"
                />
            <div class="title">{{ objectTitle }}</div>
        </NuxtLink>
    </div>

    <div v-else>
        Error.
    </div>
</template>