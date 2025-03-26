import type { userSettings } from "~/interfaces/userSettings";

export default defineNuxtPlugin({
    name: 'UI Watcher',
    enforce: 'post',

    async setup (nuxtApp) {
        
    },

    hooks: {
        'app:mounted'() {
            const current_lang_button: Element | null = document.querySelector('.nav-options-current-lang-slot');
            const language_selector_dropdown: Element | null = document.querySelector('.language-selector-dropdown');
            const loader: Element | null = document.querySelector('.loader-wrapper');
            const drupal_languages: { langCode: string, label: string, direction: string }[] = [];

            languageChange(drupal_languages, loader, current_lang_button, language_selector_dropdown);
            
            
            // const language_observer = new MutationObserver((mutations) => {
            //     mutations.forEach((mutation) => {
            //         if (mutation.type === 'attributes') {
            //             languageChange(drupal_languages, loader, current_lang_button, language_selector_dropdown);
            //         }
            //     })
            // })
        
            // language_observer.observe(document.querySelector('html')!, { attributes: true });
        }
    }
})



const uiChange = () => {
    const current_lang = ref(null);
    return { current_lang };
}