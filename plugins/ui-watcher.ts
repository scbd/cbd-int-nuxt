import type { userSettings } from "~/types/userSettings";

export default defineNuxtPlugin({
    name: 'UI Watcher',
    enforce: 'post',

    async setup (nuxtApp) {
        
    },

    hooks: {
        'app:mounted'() {
            const userSettings = useState<userSettings>("user_settings", () => ({
                active_language: "en",
            }));
            active_language.value = userSettings.value;
            
            setActiveLanguage(active_language.value.active_language);

            getMeetings('EN', 4, undefined, {params: ''}, null);
        },
        'page:loading:end'() {
            useHead({
                script: [{
                  src: '/bootstrap/js/bootstrap.bundle.min.js',
                  type: 'text/javascript',
                  tagPosition: 'bodyClose'
                }]
            })
        }
    }
})