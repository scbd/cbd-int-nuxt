<script lang="ts"></script>

<template>
    <div class="cus-options container-fluid justify-content-end">
        <ul class="navbar-nav">
            <li class="nav-item"><NuxtLink class="nav-link" to="#"><NuxtImg src="/images/icons/icon_nav-search_outline.svg" alt="Search Icon" /> Search</NuxtLink></li>
            <li class="nav-item">
                <NuxtLink to="#" class="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false"><NuxtImg src="/images/icons/icon_nav-language_outline.svg" alt="Language Selection Icon" /> English</NuxtLink>
                <ul class="language-selector-dropdown dropdown-menu">
                    <li><NuxtLink to="#" class="dropdown-item">عربي</NuxtLink></li>
                    <li><NuxtLink to="#" class="dropdown-item">中国人</NuxtLink></li>
                    <li><NuxtLink to="#" class="dropdown-item">Français</NuxtLink></li>
                    <li><NuxtLink to="#" class="dropdown-item">Русский</NuxtLink></li>
                    <li><NuxtLink to="#" class="dropdown-item">Español</NuxtLink></li>                    
                </ul>
            </li>
            <li class="nav-item"><NuxtLink class="nav-link" to="#"><NuxtImg src="/images/icons/icon_nav-account_outline.svg" alt="Login Icon" /> Login</NuxtLink></li>
            <li class="nav-item"><NuxtLink class="nav-link" to="#"><NuxtImg src="/images/icons/icon_nav-settings_outline.svg" alt="Settings Icon" /> Settings</NuxtLink></li>
        </ul>
    </div>
</template>

