<script lang="ts">
import { NavigationSocialmediafollow } from '#components';

</script>

<template>
    <div class="cus-mega-menu container-fluid" role="navigation">
    
        <!-- Logo -->
        <NavigationBranding />

        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#mainNavigation" aria-controls="mainNavigation" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="mainNavigation">
            
            <div class="offcanvas-header">
                <NuxtLink to="/" class="navbar-brand"><NuxtImg class="cus-logo" src="/images/logo_cbd_green.svg" alt="Convention of Biological Diversity Logo" /></NuxtLink>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>                        

            <ul class="mega-menu-settings navbar-nav">
                <li class="mega-menu-item nav-item dropdown">
                    <NuxtLink class="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">Options</NuxtLink>
                    <nav class="mega-menu-drawer dropdown-menu container-fluid">
                        <ul class="mega-menu-drawer-internal nav">
                            <li class="nav-item"><NuxtLink class="nav-link" to="#"><NuxtImg src="/images/icons/icon_nav-search_outline.svg" alt="Search Icon" /> Search</NuxtLink></li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="true"><NuxtImg src="/images/icons/icon_nav-language_outline.svg" alt="Language Selection Icon" /> English</NuxtLink>
                                <ul class="language-selector-dropdown dropdown-menu show">
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
                    </nav>
                </li>
            </ul>

            <ul class="navbar-nav">
                <li class="mega-menu-item nav-item dropdown">
                    <NuxtLink class="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">Updates</NuxtLink>
                    <nav class="mega-menu-drawer accent-cbd dropdown-menu container-fluid">
                        <ul class="mega-menu-drawer-internal nav">
                            <li class="sections-header">Sections</li>
                            <li class="level-1-item nav-item">
                                <NuxtLink class="nav-link" to="#">Updates</NuxtLink>
                            </li>
                            <div class="level-2-items">
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Meetings and Events</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Biosafety Clearing-House Training Workshop</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">CP MOP 11</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">NP MOP 5</NuxtLink></li>
                                    </ul>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Notifications</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Notification 2024-059</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Notification 2024-058</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Notification 2024-057</NuxtLink></li>
                                    </ul>
                                </li>
                                <li class="level-2-item cus-truncate nav-item">
                                    <NuxtLink class="nav-link" to="#">News</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Astrid Schomaker - Executive Secretary of the Secretariat of the Convention on Biological Diversity</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">World Oceans Day</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">World Environment Day</NuxtLink></li>
                                    </ul>
                                </li>
                                <li class="level-2-item cus-truncate nav-item">
                                    <NuxtLink class="nav-link" to="#">Statements by the Executive Secretary</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">UN Publishes Negotiation Proposals for Sharing Benefits from Plant, Animal, Microbial DNA Sequences to Support Countries and Communities Protecting Nature</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">World Day to Combat Desertification and Drought</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Table Set for October's UN Summit on Achieving Vital Targets, Goals of Global Biodiversity Plan</NuxtLink></li>
                                    </ul>
                                </li>
                            </div>
                        </ul>

                        <NavigationSocialmediafollow />
                        
                    </nav>
                </li>
                <li class="mega-menu-item nav-item dropdown">
                    <NuxtLink class="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">GBF</NuxtLink>
                    <div class="mega-menu-drawer accent-cbd dropdown-menu container-fluid">
                        <ul class="mega-menu-drawer-internal nav">
                            <li class="sections-header">Sections</li>
                            <li class="level-1-item nav-item">
                                <NuxtLink class="nav-link" to="#">Kunming-Montreal Global Biodiversity Framework</NuxtLink>
                            </li>
                            <div class="level-2-items">
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Introduction Sections of the GBF</NuxtLink>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">2050 vision and 2030 Mission</NuxtLink>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">2030 Targets</NuxtLink>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Implementation and Support Mechanism</NuxtLink>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Responsibility and Transparency</NuxtLink>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Communication, Education, Awareness, and Uptake</NuxtLink>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Related Decisions</NuxtLink>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Branding Toolkit</NuxtLink>
                                </li>
                            </div>
                        </ul>

                        <NavigationSocialmediafollow />

                    </div>
                </li>
                <li class="mega-menu-item nav-item dropdown">
                    <NuxtLink class="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">Biodiversity Convention</NuxtLink>
                    <div class="mega-menu-drawer accent-cbd dropdown-menu container-fluid">
                        <ul class="mega-menu-drawer-internal nav">
                            <li class="sections-header">Sections</li>
                            <li class="level-1-item nav-item">
                                <NuxtLink class="nav-link" to="#">Biodiversity Convention</NuxtLink>
                            </li>
                            <div class="level-2-items">
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">About</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Introduction</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Text of the Convention</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">History</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Implementation Plan</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">GBF</NuxtLink></li>
                                    </ul>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Governance</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">COP Bureau</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">SBSTTA</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">SBI</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Working group on Article 8J</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Working group on Protected Area</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">IAGs</NuxtLink></li>
                                    </ul>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Parties</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Status of Contribution</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Country Profile</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">National Contacts</NuxtLink></li>
                                    </ul>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Programmes</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Agricultural Biodiversity</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Mountain Biodiversity</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Dry and Sub Humid Lands Biodiversity</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Forest Biodiversity</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Island Waters Biodiversity</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Island Biodiversity</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Marine and Coastal Biodiversity</NuxtLink></li>
                                    </ul>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Mechanisms</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">NBSAPs</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">National Reports</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Financial Mechanisms</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Technical and Scientific Cooperation</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Capacity Building and Developments</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Knowledge Management</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">The Clearing-house mechanism</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Cooperation and partnership</NuxtLink></li>
                                    </ul>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Decisions</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">COP 15 Decisions - (DTT)</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">ExCOP 2 Decisions</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">COP 14 Decisions - (DTT)</NuxtLink></li>
                                    </ul>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Recommendations</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">COP 15 Decisions - (DTT)</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">ExCOP 2 Decisions</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">COP 14 Decisions - (DTT)</NuxtLink></li>
                                    </ul>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Meetings and Documents</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">CP MOP 11</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">NP MOP 5</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">SBI 5</NuxtLink></li>
                                    </ul>
                                </li>
                            </div>
                        </ul>

                        <NavigationSocialmediafollow />

                    </div>
                </li>
                <li class="mega-menu-item nav-item dropdown">
                    <NuxtLink class="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">Cartagena Protocol</NuxtLink>
                    <div class="mega-menu-drawer dropdown-menu container-fluid">
                        <ul class="mega-menu-drawer-internal nav">
                            <li class="sections-header">Sections</li>
                            <li class="level-1-item nav-item">
                                <NuxtLink class="nav-link" to="#">Cartagena Protocol</NuxtLink>
                            </li>
                            <div class="level-2-items">
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">About</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Introduction</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Text of the Cartagena Protocol</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Implementation Plan</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">GBF</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Liaison Group on the Cartagena Protocol</NuxtLink></li>
                                    </ul>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Governance</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">COP-MOP Bureau</NuxtLink></li>
                                    </ul>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Parties</NuxtLink>
                                </li>
                                <li class="level-2-item level-3-items-2-col nav-item">
                                    <NuxtLink class="nav-link" to="#">Key Protocol Issues</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Assessment and Review</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Capacity Building</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Compliance</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Financial Mechanism</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Mainstreaming</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Handling, Transport, Packaging and Identification</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Information Sharing</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Monitoring and Reporting</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Public Awareness and Participation</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Risk Assessment</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Risk Management</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Roster of Experts</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Socio-economic Considerations</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Transit and Contained Use</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Unintentional Transboundary Movements</NuxtLink></li>
                                    </ul>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Decisions</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">COP MOP 10 Decisions</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">COP ExMOP 1 Decisions</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">COP MOP 9 Decisions</NuxtLink></li>
                                    </ul>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Meetings and Documents</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">COP MOP 10 Documents</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">NP MOP 5 Documents</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">SBI 5</NuxtLink></li>
                                    </ul>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">The Nagoya-Kuala Lumpur Supplementary Protocol</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">About the Supplementary Protocol</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">What has been done</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Text of the Nagoya - Kuala Lumpur Supplementary Protocol</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Becoming a Party</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Decisions</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Relevant meetings and documents</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Resources</NuxtLink></li>
                                    </ul>
                                </li>
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#">Resources</NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Frequently Asked Question</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Media and outreach</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">Training and learning</NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#">E-learning</NuxtLink></li>
                                    </ul>
                                </li>
                            </div>
                        </ul>
                        
                        <NavigationSocialmediafollow />

                    </div>
                </li>
                <li class="mega-menu-item nav-item dropdown">
                    <NuxtLink class="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">Nagoya Protocol</NuxtLink>
                    <div class="mega-menu-drawer dropdown-menu container-fluid">
                        <ul class="mega-menu-drawer-internal nav">
                            <li class="sections-header">Sections</li>
                            <li class="level-1-item nav-item">
                                <NuxtLink class="nav-link" to="#">Nagoya Protocol</NuxtLink>
                            </li>
                            <div class="level-2-items">
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#"></NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#"></NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#"></NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#"></NuxtLink></li>
                                    </ul>
                                </li>
                            </div>
                        </ul>
                        
                        <NavigationSocialmediafollow />

                    </div>
                </li>
                <li class="mega-menu-item nav-item dropdown">
                    <NuxtLink class="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">Countries</NuxtLink>
                    <div class="mega-menu-drawer dropdown-menu container-fluid">
                        <ul class="mega-menu-drawer-internal nav">
                            <li class="sections-header">Sections</li>
                            <li class="level-1-item nav-item">
                                <NuxtLink class="nav-link" to="#">Countries</NuxtLink>
                            </li>
                            <div class="level-2-items">
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#"></NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#"></NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#"></NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#"></NuxtLink></li>
                                    </ul>
                                </li>
                            </div>
                        </ul>
                        
                        <NavigationSocialmediafollow />

                    </div>
                </li>
                <li class="mega-menu-item nav-item dropdown">
                    <NuxtLink class="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">More</NuxtLink>
                    <div class="mega-menu-drawer dropdown-menu container-fluid">
                        <ul class="mega-menu-drawer-internal nav">
                            <li class="sections-header">Sections</li>
                            <li class="level-1-item nav-item">
                                <NuxtLink class="nav-link" to="#">More</NuxtLink>
                            </li>
                            <div class="level-2-items">
                                <li class="level-2-item nav-item">
                                    <NuxtLink class="nav-link" to="#"></NuxtLink>
                                    <ul class="level-3-items nav">
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#"></NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#"></NuxtLink></li>
                                        <li class="nav-item"><NuxtLink class="nav-link" to="#"></NuxtLink></li>
                                    </ul>
                                </li>
                            </div>
                        </ul>
                        
                        <NavigationSocialmediafollow />

                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>