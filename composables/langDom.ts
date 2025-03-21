const langDropdownBuilder = (
    language: { langCode: string, label: string, direction: string },
    active_lang: string | 'en',
    current_lang_button: Element | null,
    language_selector_dropdown: Element | null
) => {
        
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


export const langChange = (
    current_language: string, 
    drupal_languages: { langCode: string, label: string, direction: string }[],
    loader: Element | null,
    current_lang_button: Element | null,
    language_selector_dropdown: Element | null
) => {
    getDrupalLanguages(current_language)
        .then((languages) => {           
            console.log('Getting Languages...')
            drupal_languages.splice(0, drupal_languages.length);
            drupal_languages.push(...languages);            
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            setTimeout(() => {
                language_selector_dropdown!.innerHTML = '';
                drupal_languages.forEach((language, index) => {
                    langDropdownBuilder(language, current_language, current_lang_button, language_selector_dropdown);
                })                
                loader?.classList.remove('show-loader');
                console.log('Languages Received!');
            }, 1000);
        })
}