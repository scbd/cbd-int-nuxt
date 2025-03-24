const langDropdownBuilder = (
    language: { langCode: string, label: string, direction: string },
    active_language: string | 'en',
    current_lang_button: Element | null,
    language_selector_dropdown: Element | null
) => {
        
    if (language.langCode === active_language) {
        current_lang_button!.innerHTML = language.label;
    } else {
        const list_item: Element | null = document.createElement('li');
        const anchor: Element | null = document.createElement('a');

        anchor?.classList.add('dropdown-item');
        anchor?.setAttribute('data-lang-code', language.langCode);
        anchor?.setAttribute('href', '#');
        anchor?.addEventListener('click', (event) => {
            setLanguage(language.langCode);
            active_language = language.langCode;
            event.stopPropagation();
        });
        anchor!.innerHTML = language.label;                
        list_item?.appendChild(anchor);
        language_selector_dropdown?.appendChild(list_item);
    }
}


export const languageChange = (
    drupal_languages: { langCode: string, label: string, direction: string }[],
    loader: Element | null,
    current_lang_button: Element | null,
    language_selector_dropdown: Element | null
) => {
<<<<<<< HEAD
    const user_language_settings: { active_language: string } | null = useState('user_settings').value as { active_language: string };
    const user_language: string = user_language_settings?.active_language || 'en';
    
    getDrupalLanguages(user_language)
=======
    getDrupalLanguages(current_language)
>>>>>>> 36f2a75 (Added error animation)
        .catch((error) => {
            console.error(error);
            loader?.classList.add('error-loader');
        })
        .then((languages) => {
            drupal_languages.splice(0, drupal_languages.length);
<<<<<<< HEAD
            drupal_languages.push(...languages);
            loader?.classList.remove('show-loader');
        })
        .finally(() => {
            language_selector_dropdown!.innerHTML = '';
            drupal_languages.forEach((language, index) => {
                langDropdownBuilder(language, user_language, current_lang_button, language_selector_dropdown);
            })
=======
            drupal_languages.push(...languages);            
        })
        .finally(() => {
            // Added pause to confirm loader is working
            setTimeout(() => {
                language_selector_dropdown!.innerHTML = '';
                drupal_languages.forEach((language, index) => {
                    langDropdownBuilder(language, current_language, current_lang_button, language_selector_dropdown);
                })                
                loader?.classList.remove('show-loader');
            }, 1000);
>>>>>>> 36f2a75 (Added error animation)
        })
}