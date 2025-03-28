<script setup lang="ts"></script>

<template>
    <div class="cus-options container-fluid justify-content-end">
        <ul class="navbar-nav">
            <li class="nav-item">
                <NuxtLink class="nav-link" to="#" role="button">
                    <NuxtImg src="/images/icons/icon_nav-search_outline.svg" alt="Search Icon" />
                    <span class="nav-options-search-slot">Search</span>
                </NuxtLink>
            </li>
            <li class="nav-item">
                <NuxtLink 
                    v-for="language in languages"
                    :key="language.langCode"
                    v-show="active_language?.active_language === language.langCode"
                    to="#" 
                    class="nav-link current-lang" 
                    role="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false">
                    <NuxtImg src="/images/icons/icon_nav-language_outline.svg" alt="Language Selection Icon" />
                        <span                        
                            class="nav-options-current-lang-slot">
                                {{ language.label }}
                        </span>
                </NuxtLink>
                
                <ul class="language-selector-dropdown dropdown-menu">
                    <li 
                        v-for="language in languages" 
                        :key="language.langCode"
                        v-show="active_language?.active_language !== language.langCode">
                        <NuxtLink 
                            class="dropdown-item" 
                            to="#" 
                            @click.prevent="setActiveLanguage(language.langCode)">
                                {{ language.label  }}
                        </NuxtLink>
                    </li>
                </ul>
            </li>
            <li class="nav-item">
                <NuxtLink class="nav-link" to="#" role="button">
                    <NuxtImg src="/images/icons/icon_nav-account_outline.svg" alt="Login Icon" />
                    <span class="nav-options-login-slot">Login</span>
                </NuxtLink>
            </li>
            <li class="nav-item">
                <NuxtLink class="nav-link" to="#" role="button">
                    <NuxtImg src="/images/icons/icon_nav-settings_outline.svg" alt="Settings Icon" />
                    <span class="nav-options-settings-slot">Settings</span>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>