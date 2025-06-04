export default defineNuxtPlugin({
  name: "UI Watcher",
  enforce: "post",

  async setup(nuxtApp) {},

  hooks: {
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
