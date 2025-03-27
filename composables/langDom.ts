import type { drupalLanguage } from "~/interfaces/drupalLanguages";
import type { drupalMenuItem } from "~/interfaces/drupalMenuItem";
import type { footerMenu } from "~/interfaces/footerMenu";
import type { userSettings } from "~/interfaces/userSettings";



export const languages = ref<drupalLanguage[]>([]);
export const active_language = ref<userSettings>();
export const footer_menu = ref<drupalMenuItem[]>();

export const getLanguages = async () => {
    const userSettings = useState<userSettings>("user_settings", () => ({
        active_language: "en",
    }));

    active_language.value = userSettings.value;

    try {
        const languageData = await getDrupalLanguages(
            userSettings.value.active_language
        );
        const footerData: footerMenu | unknown = await getDrupalMenu(
            'cbd-footer',
            userSettings.value.active_language
        )
        languages.value = languageData;

        const footer_temp = footerData as footerMenu;
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