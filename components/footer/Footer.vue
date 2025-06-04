<script setup lang="ts">
const languageSettings = useLanguageStore();
</script>

<template>
  <footer class="cus-footer d-flex flex-column">
    <ClientOnly>
      <div
        v-if="footerMenuStatus.status === 'OK'"
        class="footer-row footer-navigation"
      >
        <nav v-for="nav in footerMenu" :key="nav.title">
          <div class="nav-title">
            {{ nav.title }}
          </div>

          <ul
            v-if="nav.children.length > 7"
            :class="[nav.children.length > 7 ? 'two-column' : '']"
          >
            <div>
              <li
                v-for="child in nav.children.slice(
                  0,
                  Math.round(nav.children.length / 2)
                )"
              >
                <NuxtLink :to="child.link">
                  {{ child.title }}
                </NuxtLink>
              </li>
            </div>
            <div>
              <li
                v-for="child in nav.children.slice(
                  Math.round(nav.children.length / 2),
                  nav.children.length
                )"
              >
                <NuxtLink :to="child.link">
                  {{ child.title }}
                </NuxtLink>
              </li>
            </div>
          </ul>
          <ul v-else>
            <li v-for="child in nav.children">
              <NuxtLink :to="child.link">
                {{ child.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <nav class="a-part-of">
          <div class="nav-title">A Part Of</div>
          <ul>
            <li>
              <NuxtLink to="//un.org" target="_blank" rel="noopener noreferrer"
                ><NuxtImg
                  src="/images/logo_un_negative.svg"
                  class="logo-footer-un"
                  alt="UN Logo"
              /></NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="//unep.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  :src="`/images/UNEP-logo-${languageSettings.active_language.toUpperCase()}.svg`"
                  class="logo-footer-unep"
                  alt="UNEP Logo"
                />
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <Loader
        v-else
        :class="footerMenuStatus.status === 'error' ? 'error-loader' : ''"
      />
    </ClientOnly>
  </footer>
</template>
