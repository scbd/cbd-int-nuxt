import type { componentStatus } from "~/interfaces/componentStatus";
import type { drupalLanguage } from "~/interfaces/drupalLanguages";
import type { fetchedMenuItem } from "~/interfaces/drupalMenu";
import type { fetchedMenu } from "~/interfaces/drupalMenu";
import type { userSettings } from "~/interfaces/userSettings";

export const languages = ref<drupalLanguage[]>([]);
export const active_language = ref<userSettings>();
export const megamenu = ref<fetchedMenuItem[]>();
export const megamenu_status = ref<componentStatus>();
export const footer_menu = ref<fetchedMenuItem[]>();

export const getLanguages = async () => {
    const userSettings = useState<userSettings>("user_settings", () => ({
        active_language: "en",
    }));
    active_language.value = userSettings.value;
    
    const megamenu_status_ref = ref<componentStatus>({status: "pending"});    
    megamenu_status.value = megamenu_status_ref.value;
    console.log(megamenu_status.value.status)

    try {
        // Get Language
        const languageData = await getDrupalLanguages(
            userSettings.value.active_language
        );
        languages.value = languageData;

        // Get Mega Menu
        const megamenuData: fetchedMenu | unknown = await getDrupalMenu(
            'cbd-header',
            userSettings.value.active_language
        )
        const megamenu_temp = megamenuData as fetchedMenu;
        megamenu.value = megamenu_temp.menu;
        megamenu_status.value.status = "OK";


        // Get Footer Menu
        const footerData: fetchedMenu | unknown = await getDrupalMenu(
            'cbd-footer',
            userSettings.value.active_language
        )
        const footer_temp = footerData as fetchedMenu;
        footer_menu.value = footer_temp.menu;
    } 
    catch (error) {
        console.error(error);
    }
}

export const setActiveLanguage = async (langCode: string) => {
    try {
        await setLanguage(langCode);
        await getLanguages();
        active_language.value = { active_language: langCode };
    } 
    catch (error) {
        console.error(error);
    }
}