<script setup lang="ts"></script>

<template>
    <footer class="cus-footer d-flex flex-column">
        <client-only>
        <div class="footer-row footer-navigation">
            <!-- <address>
                <ul>
                    <li>
                        <NuxtLink to="/" class="navbar-brand"><img class="cus-logo" src="/images/CBD-logo-EN.png" alt="Convention of Biological Diversity Logo" /></NuxtLink>
                        Secretariat of the Convention on Biological Diversity
                    </li>
                    <li>
                        413, Saint Jacques Street, suite 800 <br> 
                        Montreal QC H2Y 1N9 <br>
                        Canada
                    </li>
                    <li>
                        +1 514 288 2220 <br>
                        secretariat@cbd.int
                    </li>
                </ul>
            </address>-->

            <ClientOnly>
            <nav
                v-for="nav in footer_menu"
                :key="nav.title">
                <ul>
                    <li>{{ nav.title }}</li>
                    <li 
                        v-show="nav.children.length > 0"
                        v-for="child in nav.children">
                        <NuxtLink 
                            :to="child.link">
                            {{ child.title }}
                        </NuxtLink>
                    </li>

                </ul>
            </nav>
            </ClientOnly>

            
            <nav>
                <ul class="a-part-of">
                    <li>A Part Of</li>
                    <ul>
                        <li><NuxtLink to="//un.org" target="_blank" rel="noopener noreferrer"><NuxtImg src="/images/logo_un_negative.svg" class="logo-footer-un" alt="UN Logo" /></NuxtLink></li>
                        <li>
                            <NuxtLink 
                                to="//unep.org" 
                                target="_blank" 
                                rel="noopener noreferrer">
                                    <img :src="`/images/UNEP-logo-${ active_language?.active_language.includes('-') ? active_language?.active_language.replace('-hans','').toUpperCase() : active_language?.active_language.toUpperCase() }.svg`" 
                                    class="logo-footer-unep" 
                                    alt="UNEP Logo" />
                            </NuxtLink>
                        </li>
                    </ul>
                </ul>
            </nav>
        </div>
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