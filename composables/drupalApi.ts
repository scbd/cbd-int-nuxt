import type { drupalLanguage } from "~/interfaces/drupalLanguages";
import type { drupalToken } from "~/interfaces/drupalAuth";
import type { drupalMenu } from "~/interfaces/drupalMenu";
import type { userSettings } from "~/interfaces/userSettings";

export const getDrupalLanguages = async (language: string | null) => { 
    const langCode = language && ['fr', 'es', 'ru', 'zh-hans', 'ar'].includes(language) ? language : '';
    const drupalToken = useState<drupalToken>("drupal_token").value;
    
    const config = useRuntimeConfig();    
    
    // Loader engages here for time being; remove later when with a better solution
    // const loader: Element | null = document.querySelector('.loader-wrapper');
    // loader?.classList.add('show-loader');
    
    try {
        const response = await fetch(`${config.public.DRUPAL_URL}/${langCode}/jsonapi/configurable_language/configurable_language`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${drupalToken.token_type} ${drupalToken.access_token}`
            }
        });

        if (response.ok) {
            const data = await response.json();

            const languages = data.data
                .filter((item: { attributes: { locked: boolean; }; }) => item.attributes.locked === false)
                .map((item: { attributes: { drupal_internal__id: string; label: string; direction: string; weight: number; }; }): drupalLanguage => ({
                    langCode: item.attributes.drupal_internal__id,
                    label: item.attributes.label,
                    direction: item.attributes.direction,
                    weight: item.attributes.weight
                }))
                .sort((a: drupalLanguage, b: drupalLanguage) => a.weight - b.weight)
                .map(({ weight, ...rest }: drupalLanguage) => rest);
            
            return languages;
        } else {
            console.error(`Error: ${response.status}`);
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const getDrupalMenu = async (menu: string, language: string | null) => {
    const langCode = language && ['fr', 'es', 'ru', 'zh-hans', 'ar'].includes(language) ? language : '';
    const drupalToken = useState<drupalToken>("drupal_token").value;
    
    const config = useRuntimeConfig();    

    try {
        const response = await fetch(`${config.public.DRUPAL_URL}/${langCode}/jsonapi/menu_link_content/${menu}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${drupalToken.token_type} ${drupalToken.access_token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            
            const processedMenu = {
                langcode: '',
                menu_name: menu,
                menu: []
            };
            
            if (data.data && data.data.length > 0) {
                processedMenu.langcode = data.data[0].attributes.langcode || '';
                const rootItems = data.data.filter((item: { attributes: { parent: null; }; }) => item.attributes.parent === null);
                processedMenu.menu = rootItems.map((item: drupalMenu) => {
                    const menuItem = {
                        id: item.id,
                        title: item.attributes.title,
                        link: cleanUri(item.attributes.link.uri),
                        children: []
                    };
                    
                    const children = data.data.filter((child: { attributes: { parent: string; }; }) => {
                        return child.attributes.parent && 
                               child.attributes.parent.replace('menu_link_content:', '') === item.id;
                    });
                    
                    if (children.length > 0) {
                        menuItem.children = children.map((child: drupalMenu) => {
                            const childItem = {
                                id: child.id,
                                title: child.attributes.title,
                                link: cleanUri(child.attributes.link.uri),
                                children: []
                            };
                            
                            const grandchildren = data.data.filter((grandchild: drupalMenu) => {
                                return grandchild.attributes.parent && 
                                       grandchild.attributes.parent.replace('menu_link_content:', '') === child.id;
                            });
                            
                            if (grandchildren.length > 0) {
                                childItem.children = grandchildren.map((grandchild: drupalMenu) => {
                                    return {
                                        id: grandchild.id,
                                        title: grandchild.attributes.title,
                                        link: cleanUri(grandchild.attributes.link.uri)
                                    };
                                });
                            }
                            
                            return childItem;
                        });
                    }
                    
                    return menuItem;
                });
            }
            
            return processedMenu;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const cleanUri = (uri: string): string => {
    if (uri.startsWith('route:')) {
        return uri.replace('route:', '');
    } else if (uri.startsWith('internal:')) {
        return uri.replace('internal:', '');
    }
    return uri;
}

export const setLanguage = async (language: string) => {
    const user_settings = useState<userSettings>("user_settings", () => ({
        active_language: 'en'
      }));
    const langCode = language && ['en', 'fr', 'es', 'ru', 'zh-hans', 'ar'].includes(language) ? language : 'en';
    const langDir = language && ['ar'].includes(language) ? 'rtl' : 'ltr';
    user_settings.value.active_language = langCode

    useHead({
      htmlAttrs: {
        lang: langCode,
        dir: langDir
      }
    })
    
    return true
}