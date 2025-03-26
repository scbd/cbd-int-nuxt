<script setup lang="ts">
import { type drupalLanguage } from "~/interfaces/drupalLanguages";
import { type userSettings } from "~/interfaces/userSettings";

const languages = ref<drupalLanguage[]>([]);
const userSettings = useState<userSettings>("user_settings", () => ({
  active_language: "en",
}));

const getLanguages = async () => {
  try {
    const languageData = await getDrupalLanguages(
      userSettings.value.active_language
    );
    languages.value = languageData;
  } catch (error) {
    console.error("Error:", error);
  }
};

const setActiveLanguage = async (langCode: string) => {
  try {
    await setLanguage(langCode);
    await getLanguages();
  } catch (error) {
    console.error("Error:", error);
  }
};

onMounted(() => {
  getLanguages();
});
</script>

<template>
  <div class="cus-options container-fluid justify-content-end">
    <ul class="navbar-nav">
      <li class="nav-item">
        <NuxtLink class="nav-link" to="#" role="button">
          <NuxtImg
            src="/images/icons/icon_nav-search_outline.svg"
            alt="Search Icon"
          />
          <span class="nav-options-search-slot">Search</span>
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink
          to="#"
          class="nav-link current-lang"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <NuxtImg
            src="/images/icons/icon_nav-language_outline.svg"
            alt="Language Selection Icon"
          />
          <span class="nav-options-current-lang-slot"></span>
        </NuxtLink>
        <ul class="language-selector-dropdown dropdown-menu">
          <li v-for="language in languages" :key="language.langCode">
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="setActiveLanguage(language.langCode)"
            >
              {{ language.label }}
            </a>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link" to="#" role="button">
          <NuxtImg
            src="/images/icons/icon_nav-account_outline.svg"
            alt="Login Icon"
          />
          <span class="nav-options-login-slot">Login</span>
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link" to="#" role="button">
          <NuxtImg
            src="/images/icons/icon_nav-settings_outline.svg"
            alt="Settings Icon"
          />
          <span class="nav-options-settings-slot">Settings</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
