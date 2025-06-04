export const useLanguageStore = defineStore("languageStore", {
  state: () => {
    const active_language = ref("");
    return { active_language };
  },
  persist: {
    storage: piniaPluginPersistedstate.cookies({
      maxAge: 365 * 24 * 60 * 60,
    }),
  },
  actions: {
    setActiveLanguage(langCode: string) {
      this.active_language = langCode;
    },
  },
});
