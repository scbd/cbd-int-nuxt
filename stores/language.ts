import type { langCode } from "~/types/drupalLanguages";

export const useLanguageStore = defineStore("languageStore", {
  state: () => {
    const active_language = ref<langCode>("en");
    return { active_language };
  },
  persist: {
    storage: piniaPluginPersistedstate.cookies({
      maxAge: 365 * 24 * 60 * 60,
    }),
  },
  actions: {
    setActiveLanguage(langCode: langCode) {
      this.active_language = langCode;
    },
  },
});
