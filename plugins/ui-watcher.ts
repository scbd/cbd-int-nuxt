import type { drupalMenuItem } from "~/interfaces/drupalMenuItem"



// TODO: Remove any
export default defineNuxtPlugin({
    name: 'UI Watcher',
    enforce: 'post',

    async setup (nuxtApp) {
        
    },

    hooks: {
        'app:mounted'() {
            getLanguages();
        },
    }
})

/*
export const languageUiChange = (active_language: string, logo: Element[] | null, logo_unep: Element[] | null ) => {
    logo?.forEach((logo) => {
        logo.setAttribute('src', `/images/CBD-logo-${active_language.includes('-') ? active_language.replace('-hans','').toLocaleUpperCase() : active_language.toLocaleUpperCase()}.png`);
    });
    logo_unep?.forEach((logo) => {
        logo.setAttribute('src', `/images/UNEP-logo-${active_language.includes('-') ? active_language.replace('-hans','').toLocaleUpperCase() : active_language.toLocaleUpperCase()}.svg`);
    });
}


export const languageDropdownBuilder = (
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
            event.stopPropagation();
        });
        anchor!.innerHTML = language.label;                
        list_item?.appendChild(anchor);
        language_selector_dropdown?.appendChild(list_item);
    }
}

export const footerBuilder = async (footer_menu: { id: string, title: string, link: string, children: drupalMenuItem[] }[]) => {

    const footer_navigation = document.querySelector('.footer-navigation');
    
    footer_menu.forEach((menu_group, index) => {
        const nav = document.createElement('nav');
        const ul = document.createElement('ul');
        const title = document.createElement('li');
        title.innerText = menu_group.title;

        ul.appendChild(title);
        
        if (menu_group.children.length > 0) {
            menu_group.children.forEach((child, index) => {
                const li = document.createElement('li');
                const anchor = document.createElement('anchor');
                
                anchor.innerText = child.title;
                anchor.setAttribute('href', child.link);
                li.appendChild(anchor);
                ul.appendChild(li);
            })
        }

        nav.appendChild(ul);
        

        footer_navigation?.appendChild(nav);
    })

    return true;
}

const childrenLoop = (children: drupalMenuItem[], array_length: number, title: string | null) => {
    const parent_ul = document.createElement('ul');
    
    if (title) {
        const parent_li = document.createElement('li');
        parent_li.innerText = title!;
        parent_ul.appendChild(parent_li);
    }

    if (array_length > 0) {
        const child_ul = document.createElement('ul');
        children.forEach((child, index) => {
            const child_li = document.createElement('li');
            const anchor = document.createElement('anchor');
            
            anchor.innerText = child.title;
            anchor.setAttribute('href', child.link);
            child_li.appendChild(anchor);
            child_ul.appendChild(child_li);
        })
    }

    return parent_ul;
}
*/