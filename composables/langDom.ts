import type { componentStatus } from "~/types/componentStatus";
import type { drupalLanguage } from "~/types/drupalLanguages";
import type { fetchedMenu, fetchedMenuItem } from "~/types/drupalMenu";
import type { userSettings } from "~/types/userSettings";

export const languages = ref<drupalLanguage[]>([]);
export const activeLanguage = ref<userSettings>({ active_language: "en" });
export const megamenu = ref<fetchedMenuItem[]>([]);
export const submenu = ref<fetchedMenuItem[]>([]);
export const footerMenu = ref<fetchedMenuItem[]>([]);

export const languageStatus = ref<componentStatus>({ status: "pending" });
export const footerMenuStatus = ref<componentStatus>({ status: "pending" });
export const megamenuStatus = ref<componentStatus>({ status: "pending" });
export const submenuStatus = ref<componentStatus>({ status: "pending" });

export const setActiveLanguage = async (langCode: string) => {
  try {
    await setLanguage(langCode).then(() => {
      activeLanguage.value.active_language = langCode;
    });
    await getLanguages();
    await handlerHeaderNavigation();
    await handlerFooterNavigation();
  } catch (error) {
    console.error(error);
  }
};

const getLanguages = async () => {
  languageStatus.value.status = "pending";

  try {
    const languageData = await getDrupalLanguages(
      activeLanguage.value.active_language
    );
    languages.value = languageData;

    languageStatus.value.status = "OK";
  } catch (error) {
    console.error(error);
    languageStatus.value.status = "error";
  }
};

const handlerHeaderNavigation = async () => {
  megamenuStatus.value.status = "pending";

  try {
    const menuData: fetchedMenu | unknown = await getDrupalMenu(
      "cbd-header",
      activeLanguage.value.active_language
    );
    const menu_temp = menuData as fetchedMenu;

    for (const menu_item of menu_temp.menu as fetchedMenuItem[]) {
      const machine_name = menu_item.options!.attributes!.submenu!.slice(0, 32);

      try {
        const submenuData: fetchedMenu | unknown = await getDrupalMenu(
          machine_name,
          activeLanguage.value.active_language
        );
        const submenuPlaceholder = submenuData as fetchedMenu;
        menu_item.children.push(...submenuPlaceholder.menu);
      } catch (error) {
        console.error(error);
      }
    }
    megamenu.value = menu_temp.menu;
    megamenuStatus.value.status = "OK";
  } catch (error) {
    console.error(error);
    megamenuStatus.value.status = "error";
  }
};

export const handlerSubmenuNavigation = async (menuName: string) => {
  submenuStatus.value.status = "pending";

  try {
    const menuData: fetchedMenu | unknown = await getDrupalMenu(
      menuName,
      activeLanguage.value.active_language
    );
    const menu_temp = menuData as fetchedMenu;
    for (const menu_item of menu_temp.menu as fetchedMenuItem[]) {
      if (menu_item.options?.attributes?.submenu) {
        const machine_name = menu_item.options!.attributes!.submenu!.slice(
          0,
          32
        );

        try {
          const submenuData: fetchedMenu | unknown = await getDrupalMenu(
            machine_name,
            activeLanguage.value.active_language
          );
          const submenuPlaceholder = submenuData as fetchedMenu;
          menu_item.children.push(...submenuPlaceholder.menu);
        } catch (error) {
          console.error(error);
        }
      }
    }
    submenu.value = menu_temp.menu;
    submenuStatus.value.status = "OK";
  } catch (error) {
    console.error(error);
    submenuStatus.value.status = "error";
  }
};

const handlerFooterNavigation = async () => {
  footerMenuStatus.value.status = "pending";
  try {
    const footerData: fetchedMenu | unknown = await getDrupalMenu(
      "cbd-footer",
      activeLanguage.value.active_language
    );
    const footerPlaceholder = footerData as fetchedMenu;
    footerMenu.value = footerPlaceholder.menu;

    footerMenuStatus.value.status = "OK";
  } catch (error) {
    console.error(error);
    footerMenuStatus.value.status = "error";
  }
};
