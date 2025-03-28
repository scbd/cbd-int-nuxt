import type { componentStatus } from "~/interfaces/componentStatus";
import type { drupalLanguage } from "~/interfaces/drupalLanguages";
import type { fetchedMenuItem } from "~/interfaces/drupalMenu";
import type { fetchedMenu } from "~/interfaces/drupalMenu";
import type { userSettings } from "~/interfaces/userSettings";

export const languages = ref<drupalLanguage[]>([]);
export const active_language = ref<userSettings>();

// Component References
export const megamenu = ref<fetchedMenuItem[]>();
export const footer_menu = ref<fetchedMenuItem[]>();
// Component Status References
export const footer_menu_status = ref<componentStatus>({status: "pending"});
export const megamenu_status = ref<componentStatus>({status: "pending"});

export const getLanguages = async () => {
    const userSettings = useState<userSettings>("user_settings", () => ({
        active_language: "en",
    }));
    active_language.value = userSettings.value;
    
    try {
        const languageData = await getDrupalLanguages(
            active_language.value.active_language
        );
        languages.value = languageData;

        componentsHandler();
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
    } catch (error) {
        console.error(error);
    }
}

const componentsHandler = async () => {
    try {
        const megamenuData: fetchedMenu | unknown = await getDrupalMenu(
            'cbd-header',
            active_language.value!.active_language
        )
        const megamenu_temp = megamenuData as fetchedMenu;
        megamenu.value = megamenu_temp.menu;
        megamenu_status.value!.status = "OK";
    } catch (error) {
        console.error(error);
        megamenu_status.value!.status = "error";
    }

    try {
        const footerData: fetchedMenu | unknown = await getDrupalMenu(
            'cbd-footer',
            active_language.value!.active_language
        )
        const footer_temp = footerData as fetchedMenu;
        footer_menu.value = footer_temp.menu;
        footer_menu_status.value!.status = "OK";
    } catch (error) {
        console.error(error);
        footer_menu_status.value!.status = "error";
    }
}