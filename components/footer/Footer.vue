<script setup lang="ts">
    onMounted(() => {

        // const logo = document.querySelectorAll('.cus-logo');
        // const logo_unep = document.querySelectorAll('.logo-footer-unep');

        // const language_observer = new MutationObserver((mutations) => {
        //     mutations.forEach((mutation) => {
        //         if (mutation.type === 'attributes') {                
        //             const user_language_settings: { active_language: string } | null = useState('user_settings').value as { active_language: string };
        //             let active_language: string = user_language_settings?.active_language || 'en';
                    
        //             logo?.forEach((logo) => {
        //                 logo.setAttribute('src', `/images/CBD-logo-${active_language.includes('-') ? active_language.replace('-hans','').toLocaleUpperCase() : active_language.toLocaleUpperCase()}.png`);
        //             });
        //             logo_unep?.forEach((logo) => {
        //                 logo.setAttribute('src', `/images/UNEP-logo-${active_language.includes('-') ? active_language.replace('-hans','').toLocaleUpperCase() : active_language.toLocaleUpperCase()}.svg`);
        //             });
                    
        //         }
        //     })
        // })

        // language_observer.observe(document.querySelector('html')!, { attributes: true });

        //const footer_data = getDrupalMenu('en', 'cbd-footer')
        
        getDrupalMenu('cbd-header','en').then((result) => {
            console.log(result);
        })
        
    })
</script>

<template>
    <footer class="cus-footer d-flex flex-column">
        <div class="footer-row footer-navigation">
            <address>
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
            </address>

            <nav>
                <ul class="important-links">
                    <li>Important Links</li>
                    <li><NuxtLink to="#">About the Biodiversity Convention</NuxtLink></li>
                    <li><NuxtLink to="#">News</NuxtLink></li>
                    <li><NuxtLink to="#">Meetings</NuxtLink></li>
                    <li><NuxtLink to="#">Documents</NuxtLink></li>
                    <li><NuxtLink to="#">Recommendations</NuxtLink></li>
                    <li><NuxtLink to="#">Countries</NuxtLink></li>
                    <li><NuxtLink to="#">Resources</NuxtLink></li>
                    <li><NuxtLink to="#">COP 16</NuxtLink></li>
                    <li><NuxtLink to="#">COP-MOP 12</NuxtLink></li>
                </ul>
                <ul class="social-media-follow">
                    <li>Follow Us</li>                        
                    <li><NuxtLink to="#" target="_blank"><NuxtImg src="/images/icons/icon_social-yt.svg" alt="Follow us on YouTube" class="social-media-icon" /> YouTube</NuxtLink></li>
                    <li><NuxtLink to="#" target="_blank"><NuxtImg src="/images/icons/icon_social-fb.svg" alt="Follow us on Facebook" class="social-media-icon" /> Facebook</NuxtLink></li>
                    <li><NuxtLink to="#" target="_blank"><NuxtImg src="/images/icons/icon_social-x.svg" alt="Follow us on X (Twitter)" class="social-media-icon" /> X (Twitter)</NuxtLink></li>
                    <li><NuxtLink to="#" target="_blank"><NuxtImg src="/images/icons/icon_social-li.svg" alt="Follow us on LinkedIn" class="social-media-icon" /> LinkedIn</NuxtLink></li>
                    <li><NuxtLink to="#" target="_blank"><NuxtImg src="/images/icons/icon_social-ig.svg" alt="Follow us on Instagram" class="social-media-icon" /> Instagram</NuxtLink></li>
                    <li><NuxtLink to="#" target="_blank"><NuxtImg src="/images/icons/icon_social-rss.svg" alt="Subscribe to our RSS Feed" class="social-media-icon" /> RSS</NuxtLink></li>
                </ul>
                <ul class="a-part-of">
                    <li>A Part Of</li>
                    <ul>
                        <li><NuxtLink to="//un.org" target="_blank" rel="noopener noreferrer"><NuxtImg src="/images/logo_un_negative.svg" class="logo-footer-un" alt="UN Logo" /></NuxtLink></li>
                        <li><NuxtLink to="//unep.org" target="_blank" rel="noopener noreferrer"><img src="/images/UNEP-logo-EN.svg" class="logo-footer-unep" alt="UNEP Logo" /></NuxtLink></li>
                    </ul>
                </ul>
            </nav>
        </div>

        <div class="footer-row contact-and-legal">
            <ul>
                <li>&copy; 2025 Secretariat of the Convention on Biological Diversity</li>
                <li><NuxtLink to="#">Terms of Use</NuxtLink></li>
                <li><NuxtLink to="#">Privacy Policy</NuxtLink></li>
                <li><NuxtLink to="#">Contact Us</NuxtLink></li>
                <li><NuxtLink to="#">Credits</NuxtLink></li>
            </ul>
        </div>

    </footer>
</template>