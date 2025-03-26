<script setup lang="ts">

onMounted(() => {
    // let active_lang: string = document.querySelector('html')!.getAttribute('lang') || 'en';
    
    // TODO: Consider detecting the user's browser language and matching it to available languages
    // If present, set language to browser, otherwise default lang attribute or a cookie
    const navigator_languages = navigator?.languages;

    
    // const current_lang_button: Element | null = document.querySelector('.nav-options-current-lang-slot');
    // const language_selector_dropdown: Element | null = document.querySelector('.language-selector-dropdown');

    // // Loader
    // const loader: Element | null = document.querySelector('.loader-wrapper');

    // const drupal_languages: { langCode: string, label: string, direction: string }[] = [];
    
    // languageChange(drupal_languages, loader, current_lang_button, language_selector_dropdown);
    
    // const language_observer = new MutationObserver((mutations) => {
    //     mutations.forEach((mutation) => {
    //         if (mutation.type === 'attributes') {
    //             languageChange(drupal_languages, loader, current_lang_button, language_selector_dropdown);
    //         }
    //     })
    // })

    // language_observer.observe(document.querySelector('html')!, { attributes: true });
    
    
    /*
    ///////// Ignore this mess. It's been migrated to langDom.ts ////////
    
    const langChange = async (current_language: string) => {
        getDrupalLanguages(current_language)
            .then((languages) => {
                setTimeout(() => {
                    console.log('Getting Languages...')
                    drupal_languages.splice(0, drupal_languages.length);
                    drupal_languages.push(...languages);
                    // loader?.classList.toggle('show-loader');
                }, 1000);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setTimeout(() => {
                    language_selector_dropdown!.innerHTML = '';
                    drupal_languages.forEach((language, index) => {
                        langDropdownBuilder(language);
                    })                
                    // loader?.classList.toggle('show-loader');
                    console.log('Languages Received!');
                }, 1000);
            })
    }

    const langDropdownBuilder = (language: { langCode: string, label: string, direction: string }) => {
        
        if (language.langCode === active_lang) {
            current_lang_button!.innerHTML = language.label;
        } else {
            const list_item: Element | null = document.createElement('li');
            const anchor: Element | null = document.createElement('a');

            anchor?.classList.add('dropdown-item');
            anchor?.setAttribute('data-lang-code', language.langCode);
            anchor?.setAttribute('href', '#');
            anchor?.addEventListener('click', (event) => {
                setLanguage(language.langCode);
                active_lang = language.langCode;
                event.stopPropagation();
            });
            anchor!.innerHTML = language.label;                
            list_item?.appendChild(anchor);
            language_selector_dropdown?.appendChild(list_item);
        }
    }    

    const language_observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes') {
                console.log(mutation.attributeName);
                langChange(active_lang);
            }
        });
    })

    langChange(active_lang);

    language_observer.observe(document.querySelector('html')!, { attributes: true});

    */
});
</script>

<template>
    <div class="cus-options container-fluid justify-content-end">
        <ul class="navbar-nav">
            <li class="nav-item">
                <NuxtLink class="nav-link" to="#" role="button">
                    <NuxtImg src="/images/icons/icon_nav-search_outline.svg" alt="Search Icon" />
                    <span class="nav-options-search-slot">Search</span>
                </NuxtLink>
            </li>
            <li class="nav-item">
                <NuxtLink to="#" class="nav-link current-lang" role="button" data-bs-toggle="dropdown" aria-expanded="false" ref="current_lang">
                    <NuxtImg src="/images/icons/icon_nav-language_outline.svg" alt="Language Selection Icon" />
                    <span class="nav-options-current-lang-slot"></span>
                </NuxtLink>
                <ul class="language-selector-dropdown dropdown-menu"></ul>
            </li>
            <li class="nav-item">
                <NuxtLink class="nav-link" to="#" role="button">
                    <NuxtImg src="/images/icons/icon_nav-account_outline.svg" alt="Login Icon" />
                    <span class="nav-options-login-slot">Login</span>
                </NuxtLink>
            </li>
            <li class="nav-item">
                <NuxtLink class="nav-link" to="#" role="button">
                    <NuxtImg src="/images/icons/icon_nav-settings_outline.svg" alt="Settings Icon" />
                    <span class="nav-options-settings-slot">Settings</span>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

