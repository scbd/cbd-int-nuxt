<script setup lang="ts">
const languageSettings = useLanguageStore();
const { t } = useI18n();
</script>

<template>
  <div class="cus-options container-fluid justify-content-end">
    <ul class="navbar-nav">
      <li class="nav-item">
        <NuxtLink class="nav-link" to="#" role="button">
          <NuxtImg
            src="/images/icons/icon_nav-search_outline.svg"
            :alt="t('navigation.options_menu.search_icon')"
          />
          <span class="nav-options-search-slot">{{
            t("navigation.options_menu.search")
          }}</span>
        </NuxtLink>
      </li>
      <li class="nav-item">
        <ClientOnly>
          <NuxtLink
            v-for="language in languages"
            :key="language.langCode"
            v-show="languageSettings.active_language === language.langCode"
            to="#"
            class="nav-link current-lang"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <NuxtImg
              src="/images/icons/icon_nav-language_outline.svg"
              :alt="t('navigation.options_menu.language_icon')"
            />
            <span class="nav-options-current-lang-slot">
              {{ language.label }}
            </span>
          </NuxtLink>

          <ul class="language-selector-dropdown dropdown-menu">
            <li
              v-for="language in languages"
              :key="language.langCode"
              v-show="languageSettings.active_language !== language.langCode"
            >
              <NuxtLink
                class="dropdown-item"
                to="#"
                @click.prevent="setActiveLanguage(language.langCode)"
              >
                {{ language.label }}
              </NuxtLink>
            </li>
          </ul>
        </ClientOnly>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link" to="#" role="button">
          <NuxtImg
            src="/images/icons/icon_nav-account_outline.svg"
            :alt="t('navigation.options_menu.login_icon')"
          />
          <span class="nav-options-login-slot">{{
            t("navigation.options_menu.login")
          }}</span>
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link" to="#" role="button">
          <NuxtImg
            src="/images/icons/icon_nav-settings_outline.svg"
            :alt="t('navigation.options_menu.settings_icon')"
          />
          <span class="nav-options-settings-slot">{{
            t("navigation.options_menu.settings")
          }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
