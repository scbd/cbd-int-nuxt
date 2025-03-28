<script setup lang="ts"></script>

<template>
    <div class="cus-mega-menu container-fluid" role="navigation">

        <NavigationBranding />

        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#mainNavigation" aria-controls="mainNavigation" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div 
            v-if="megamenu_status?.status === 'OK'"
            class="offcanvas offcanvas-end" 
            tabindex="-1" 
            id="mainNavigation">
            
            <div class="offcanvas-header">
                <ClientOnly>
                <NuxtLink to="/" 
                    class="navbar-brand">
                    <img 
                        class="cus-logo" 
                        :src="`/images/CBD-logo-${ active_language?.active_language.slice(0,2).toUpperCase() }.png`" 
                        alt="Convention of Biological Diversity Logo" />
                </NuxtLink>
                </ClientOnly>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>                        

            <ul class="mega-menu-settings navbar-nav">
                <li class="mega-menu-item nav-item dropdown">
                    <NuxtLink class="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">Options</NuxtLink>
                    
                    <nav class="mega-menu-drawer dropdown-menu container-fluid">
                        <ul class="mega-menu-drawer-internal nav">
                            
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
                                    class="nav-link current-lang dropdown-toggle" 
                                    role="button" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="true">
                                        <NuxtImg src="/images/icons/icon_nav-language_outline.svg" alt="Language Selection Icon" />
                                        <span                        
                                            class="nav-options-current-lang-slot">
                                                {{ language.label }}
                                        </span>
                                </NuxtLink>
                                
                                <ul class="language-selector-dropdown dropdown-menu show">
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
                    </nav>
                    
                </li>
            </ul>

            <ul class="navbar-nav">
                
                <li 
                    v-for="level1_item in megamenu"
                    class="mega-menu-item nav-item dropdown">
                    
                    <NuxtLink 
                        class="nav-link dropdown-toggle" 
                        to="#" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false">
                            {{ level1_item.title }}
                    </NuxtLink>
                    
                    <div class="mega-menu-drawer dropdown-menu container-fluid">
                    
                        <ul class="mega-menu-drawer-internal nav">
                            <li class="sections-header">Sections</li>
                            <li class="level-1-item nav-item">
                                <NuxtLink class="nav-link" to="#">
                                    {{ level1_item.title }}
                                </NuxtLink>
                            </li>

                            <div 
                                v-if="level1_item.children.length > 0"
                                v-for="level2_item in level1_item.children"
                                class="level-2-items">
                                
                                <NuxtLink class="nav-link" :to="level2_item.link">
                                    {{ level2_item.title }}
                                </NuxtLink>
                                <ul 
                                    v-if="level2_item.children.length > 0"
                                    v-for="level3_item in level2_item.children"
                                    class="level-3-items nav">
                                    <li class="nav-item">
                                        <NuxtLink class="nav-link" :to="level3_item.link">
                                            {{ level3_item.title }}
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>
                        </ul>

                        <NavigationSocialmediafollow />

                    </div>                    
                </li>                
            </ul>
        </div>
        <Loader 
            v-else-if="megamenu_status?.status === 'error'"
            class="error-loader" />
        <Loader v-else />
    </div>
</template>