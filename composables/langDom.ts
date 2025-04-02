import type { componentStatus } from "~/types/componentStatus";
import type { drupalLanguage } from "~/types/drupalLanguages";
import type { drupalMenu, fetchedMenu, fetchedMenuItem } from "~/types/drupalMenu";
import type { userSettings } from "~/types/userSettings";

export const languages = ref<drupalLanguage[]>([]);
export const active_language = ref<userSettings>();
export const megamenu = ref<fetchedMenuItem[]>([]);
export const footer_menu = ref<fetchedMenuItem[]>();

export const megamenu_section = ref<fetchedMenu>();

export const language_status = ref<componentStatus>({status: "pending"});
export const footer_menu_status = ref<componentStatus>({status: "pending"});
export const megamenu_status = ref<componentStatus>({status: "pending"});


export const getLanguages = async () => {
    const userSettings = useState<userSettings>("user_settings", () => ({
        active_language: "en",
    }));
    active_language.value = userSettings.value;
    
    try {
        language_status.value.status = "pending";
        
        const languageData = await getDrupalLanguages(
            active_language.value.active_language
        );
        languages.value = languageData;
        
        language_status.value.status = "OK";
    }
    catch (error) {
        console.error(error);
        language_status.value.status = "error";
    }

    handlerHeaderNavigation();
    handlerFooterNavigation();
}

export const setActiveLanguage = async (langCode: string) => {
    try {
        await setLanguage(langCode);
        await getLanguages();
        active_language.value = { active_language: langCode };
    } catch (error) {
        console.error(error);
    }
}


const handlerHeaderNavigation = async () => {
    megamenu_status.value.status = "pending";
    
    try {
        const menuData: fetchedMenu | unknown = await getDrupalMenu(
            'cbd-header',
            active_language.value!.active_language
        );
        const menu_temp = menuData as fetchedMenu;        
        
        for (const menu_item of menu_temp.menu as fetchedMenuItem[]) {
            const machine_name = String(`cbd-header-${menu_item.title.replaceAll(' ', '-').toLowerCase()}`).slice(0,32);
            
            try {
                const submenuData: fetchedMenu | unknown = await getDrupalMenu(
                    machine_name,
                    active_language.value!.active_language
                );
                const submenu_temp = submenuData as fetchedMenu;
                menu_item.children.push(...submenu_temp.menu);
            } catch (error) {
                console.error(error);
            }
        }
        megamenu.value = menu_temp.menu;
    } catch (error) {
        console.error(error);
        megamenu_status.value.status = "error";
    }

    megamenu_status.value.status = "OK";
}

const handlerFooterNavigation = async () => {
    try {
        footer_menu_status.value.status = "pending";
        
        const footerData: fetchedMenu | unknown = await getDrupalMenu(
            'cbd-footer',
            active_language.value!.active_language
        );
        const footer_temp = footerData as fetchedMenu;
        footer_menu.value = footer_temp.menu;

        footer_menu_status.value.status = "OK";
    } catch (error) {
        console.error(error);
        footer_menu_status.value.status = "error";
    }
}