<script setup lang="ts">
const languageSettings = useLanguageStore();
</script>

<template>
  <div class="cus-mega-menu container-fluid" role="navigation">
    <NavigationBranding />

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#mainNavigation"
      aria-controls="mainNavigation"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <ClientOnly v-if="megamenuStatus.status === 'OK'">
      <div class="offcanvas offcanvas-end" tabindex="-1" id="mainNavigation">
        <div class="offcanvas-header">
          <NavigationBranding />
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <ul class="mega-menu-settings navbar-nav">
          <li class="mega-menu-item nav-item dropdown">
            <NuxtLink
              class="nav-link dropdown-toggle"
              to="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >Options</NuxtLink
            >

            <nav class="mega-menu-drawer dropdown-menu container-fluid">
              <ul class="mega-menu-drawer-internal nav">
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
                    v-for="language in languages"
                    :key="language.langCode"
                    v-show="
                      languageSettings.active_language === language.langCode
                    "
                    to="#"
                    class="nav-link current-lang dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="true"
                  >
                    <NuxtImg
                      src="/images/icons/icon_nav-language_outline.svg"
                      alt="Language Selection Icon"
                    />
                    <span class="nav-options-current-lang-slot">
                      {{ language.label }}
                    </span>
                  </NuxtLink>

                  <ul class="language-selector-dropdown dropdown-menu show">
                    <li
                      v-for="language in languages"
                      :key="language.langCode"
                      v-show="
                        languageSettings.active_language !== language.langCode
                      "
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
            </nav>
          </li>
        </ul>

        <ul class="navbar-nav">
          <li
            v-for="level1_item in megamenu"
            class="mega-menu-item nav-item dropdown"
          >
            <NuxtLink
              class="nav-link dropdown-toggle"
              :to="level1_item.link"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ level1_item.title }}
            </NuxtLink>

            <NavigationMegamenuDrawer :parent="level1_item" />
          </li>
        </ul>
      </div>
    </ClientOnly>
    <ClientOnly v-else>
      <Loader
        :class="[{ 'error-loader': megamenuStatus.status === 'error' }]"
      />
    </ClientOnly>
  </div>
</template>
