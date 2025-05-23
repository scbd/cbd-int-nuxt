import type { userSettings } from "~/types/userSettings";

export default defineNuxtPlugin({
  name: "UI Watcher",
  enforce: "post",

  async setup(nuxtApp) {},

  hooks: {
    "app:mounted"() {
      const userSettings = useState<userSettings>("user_settings", () => ({
        active_language: "en",
      }));
      activeLanguage.value = userSettings.value;

      setActiveLanguage(activeLanguage.value.active_language);
    },
    "page:finish"() {
      useHead({
        script: [
          {
            src: "/bootstrap/js/bootstrap.bundle.min.js",
            type: "text/javascript",
            tagPosition: "bodyClose",
          },
        ],
      });
    },
  },
});
