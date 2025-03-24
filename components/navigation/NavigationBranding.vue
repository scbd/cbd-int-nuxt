<script setup lang="ts">

onMounted(() => {

    const logo = document.querySelector('.cus-logo');
    
    // Move to Composable?
    // TODO: Load correct image on first arrival
    const language_observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes') {        
                console.log('fired');
                
                const user_language_settings: { active_language: string } | null = useState('user_settings').value as { active_language: string };
                let active_language: string = user_language_settings?.active_language || 'en';
                
                logo?.setAttribute('src', `/images/CBD-logo-${active_language.includes('-') ? active_language.replace('-hans','').toLocaleUpperCase() : active_language.toLocaleUpperCase()}.png`);
            }
        })
    })

    language_observer.observe(document.querySelector('html')!, { attributes: true });
})

    

</script>

<template>
    <NuxtLink to="/" class="navbar-brand">
        <img class="cus-logo" src="/images/logo_cbd_green.svg" alt="Convention of Biological Diversity Logo" rel="preload" />
    </NuxtLink>
</template>