import type { userSettings } from "~/interfaces/userSettings";

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
    const user_language_settings: { active_language: string } = useState('user_settings').value as { active_language: string } 
    const user_language: string = user_language_settings?.active_language || 'en';
    
    getDrupalLanguages(user_language)
        .catch((error) => {
            console.error(error);
            loader?.classList.add('error-loader');
        })
        .then((languages) => {
            drupal_languages.splice(0, drupal_languages.length);
            drupal_languages.push(...languages);
            loader?.classList.remove('show-loader');
        })
        .finally(() => {
            language_selector_dropdown!.innerHTML = '';
            drupal_languages.forEach((language, index) => {
                langDropdownBuilder(language, user_language, current_lang_button, language_selector_dropdown);
            })
        })
}

// const language_listener = new Proxy(useState('user_settings').value as { active_language: string } ||
//     useState<userSettings>("user_settings", () => ({
//         active_language: 'en'
//     })), {
//     set(obj, prop: string, value): any {
//         console.log(`Object ${obj}'s ${prop} set to ${value}`);
//         return true;
//     }
// })