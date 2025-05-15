<script setup lang="ts">
const route = useRoute();
</script>
<template>
  <div class="protocol-subnavigation accent-cbd">
    <nav class="navbar container-xxl">
      <ul class="nav">
        <div class="subnav-header">
          <li class="nav-item selected">
            <ClientOnly>
              <a v-if="megamenu.length > 0" class="nav-link" href="#">
                {{ megamenu[0].title }}
              </a>
            </ClientOnly>
          </li>
          <li class="nav-item">
            <button
              class="btn cbd-btn-subnavigation"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSubnav"
              aria-expanded="true"
              aria-controls="collapseSubnav"
            >
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.92 0.180054H6.68999H1.07999C0.119992 0.180054 -0.360007 1.34005 0.319993 2.02005L5.49999 7.20005C6.32999 8.03005 7.67999 8.03005 8.50999 7.20005L10.48 5.23005L13.69 2.02005C14.36 1.34005 13.88 0.180054 12.92 0.180054Z"
                />
              </svg>
            </button>
          </li>
        </div>
        <div class="subnav-level-2-items collapse show" id="collapseSubnav">
          <ClientOnly>
            <li
              v-if="megamenu.length > 0"
              v-for="menuItem of megamenu[0].children"
              class="nav-item subnav-level-2-item"
              :class="
                (route.name as string).toLowerCase() ==
                menuItem.title.toLowerCase()
                  ? 'selected'
                  : ''
              "
            >
              <NuxtLink :to="menuItem.link" class="nav-link"
                >{{ menuItem.title }}
              </NuxtLink>
            </li>
          </ClientOnly>
        </div>
      </ul>
    </nav>
  </div>
</template>
