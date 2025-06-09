import type { componentStatus } from "~/types/componentStatus";
import type { drupalLanguage } from "~/types/drupalLanguages";
import type { fetchedMenu, fetchedMenuItem } from "~/types/drupalMenu";

export const languages = ref<drupalLanguage[]>([]);
export const megamenu = ref<fetchedMenuItem[]>([]);
export const submenu = ref<fetchedMenuItem[]>([]);
export const footerMenu = ref<fetchedMenuItem[]>([]);

export const languageStatus = ref<componentStatus>({ status: "pending" });
export const footerMenuStatus = ref<componentStatus>({ status: "pending" });
export const megamenuStatus = ref<componentStatus>({ status: "pending" });
export const submenuStatus = ref<componentStatus>({ status: "pending" });

export const setActiveLanguage = async (langCode: string = "en") => {
  const languageSettings = useLanguageStore();

  try {
    await setLanguage(langCode).then(() => {
      languageSettings.setActiveLanguage(langCode);
    });

    await getLanguages();
    await handlerHeaderNavigation();
    await handlerFooterNavigation();
  } catch (error) {
    console.error(error);
  }
};

const getLanguages = async () => {
  const languageSettings = useLanguageStore();

  languageStatus.value.status = "pending";

  try {
    const languageData = await getDrupalLanguages(
      languageSettings.active_language
    );
    languages.value = languageData;

    languageStatus.value.status = "OK";
  } catch (error) {
    console.error(error);
    languageStatus.value.status = "error";
  }
};

const handlerHeaderNavigation = async () => {
  const languageSettings = useLanguageStore();

  megamenuStatus.value.status = "pending";

  try {
    const menuData: fetchedMenu | unknown = await getDrupalMenu(
      "cbd-header",
      languageSettings.active_language
    );
    const menuTemp = menuData as fetchedMenu;

    for (const menuItem of menuTemp.menu as fetchedMenuItem[]) {
      const machineName = menuItem.options!.attributes!.submenu!.slice(0, 32);

      try {
        const submenuData: fetchedMenu | unknown = await getDrupalMenu(
          machineName,
          languageSettings.active_language
        );
        const submenuPlaceholder = submenuData as fetchedMenu;
        menuItem.children.push(...submenuPlaceholder.menu);
      } catch (error) {
        console.error(error);
      }
    }
    megamenu.value = menuTemp.menu;
    megamenuStatus.value.status = "OK";
  } catch (error) {
    console.error(error);
    megamenuStatus.value.status = "error";
  }
};

export const handlerSubmenuNavigation = async (menuName: string) => {
  const languageSettings = useLanguageStore();

  submenuStatus.value.status = "pending";

  try {
    const menuData: fetchedMenu | unknown = await getDrupalMenu(
      menuName,
      languageSettings.active_language
    );
    const menuTemp = menuData as fetchedMenu;
    for (const menuItem of menuTemp.menu as fetchedMenuItem[]) {
      if (menuItem.options?.attributes?.submenu) {
        const machineName = menuItem.options!.attributes!.submenu!.slice(0, 32);

        try {
          const submenuData: fetchedMenu | unknown = await getDrupalMenu(
            machineName,
            languageSettings.active_language
          );
          const submenuPlaceholder = submenuData as fetchedMenu;
          menuItem.children.push(...submenuPlaceholder.menu);
        } catch (error) {
          console.error(error);
        }
      }
    }
    submenu.value = menuTemp.menu;
    submenuStatus.value.status = "OK";
    return submenu.value;
  } catch (error) {
    console.error(error);
    submenuStatus.value.status = "error";
  }
};

const handlerFooterNavigation = async () => {
  const languageSettings = useLanguageStore();

  footerMenuStatus.value.status = "pending";
  try {
    const footerData: fetchedMenu | unknown = await getDrupalMenu(
      "cbd-footer",
      languageSettings.active_language
    );
    const footerPlaceholder = footerData as fetchedMenu;
    footerMenu.value = footerPlaceholder.menu;

    footerMenuStatus.value.status = "OK";
  } catch (error) {
    console.error(error);
    footerMenuStatus.value.status = "error";
  }
};
