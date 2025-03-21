<script setup lang="ts">

onMounted(() => {
    const logo = document.querySelector('.cus-logo');
    let active_lang: string = document.querySelector('html')!.getAttribute('lang') || 'en';
    
    // Move to Composable?
    // TODO: Load correct image on first arrival
    const language_observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes') {
                active_lang = document.querySelector('html')?.getAttribute('lang') || 'en';
                logo?.setAttribute('src', `/images/CBD-logo-${active_lang.includes('-') ? active_lang.replace('-hans','').toLocaleUpperCase() : active_lang.toLocaleUpperCase()}.png`);
            }
        })
    })

    language_observer.observe(document.querySelector('html')!, { attributes: true });
})

    

</script>

<template>
    <NuxtLink to="/" class="navbar-brand">
        <img class="cus-logo" src="/images/logo_cbd_green.svg" alt="Convention of Biological Diversity Logo" />
    </NuxtLink>
</template>