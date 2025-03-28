<script setup lang="ts"></script>

<template>
    <footer class="cus-footer d-flex flex-column">
        <client-only>
        <div 
            v-if="footer_menu_status.status === 'OK'"
            class="footer-row footer-navigation">
            <ClientOnly>
            <nav
                v-for="nav in footer_menu"
                :key="nav.title">
                
                <div class="nav-title">
                    {{ nav.title }}
                </div>

                <ul 
                    v-if="nav.children.length > 7"
                    :class="[nav.children.length > 7 ? 'two-column': '']">
                    <div>
                        <li
                            v-for="child in nav.children.slice(0, Math.round(nav.children.length / 2))">
                            <NuxtLink 
                                :to="child.link">
                                {{ child.title }}
                            </NuxtLink>
                        </li>
                    </div>
                    <div>
                        <li
                            v-for="child in nav.children.slice(Math.round(nav.children.length / 2), nav.children.length)">
                            <NuxtLink 
                                :to="child.link">
                                {{ child.title }}
                            </NuxtLink>
                        </li>
                    </div>
                </ul>
                <ul v-else>
                    <li
                        v-for="child in nav.children">
                        <NuxtLink 
                            :to="child.link">
                            {{ child.title }}
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
            </ClientOnly>

            
            <nav class="a-part-of">
                <div class="nav-title">A Part Of</div>
                <ul>
                    <li><NuxtLink to="//un.org" target="_blank" rel="noopener noreferrer"><NuxtImg src="/images/logo_un_negative.svg" class="logo-footer-un" alt="UN Logo" /></NuxtLink></li>
                    <li>
                        <NuxtLink 
                            to="//unep.org" 
                            target="_blank" 
                            rel="noopener noreferrer">
                                <img :src="`/images/UNEP-logo-${ active_language?.active_language.slice(0,2).toUpperCase() }.svg`"
                                class="logo-footer-unep" 
                                alt="UNEP Logo" />
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>

        <Loader 
            v-else-if="megamenu_status?.status === 'error'"
            class="error-loader" />
        <Loader v-else />
        </client-only>

        <!-- <div class="footer-row contact-and-legal">
            <ul>
                <li>&copy; 2025 Secretariat of the Convention on Biological Diversity</li>
                <li><NuxtLink to="#">Terms of Use</NuxtLink></li>
                <li><NuxtLink to="#">Privacy Policy</NuxtLink></li>
                <li><NuxtLink to="#">Contact Us</NuxtLink></li>
                <li><NuxtLink to="#">Credits</NuxtLink></li>
            </ul>
        </div> -->

    </footer>
</template>