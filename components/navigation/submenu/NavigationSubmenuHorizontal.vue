<script setup lang="ts">
import type { fetchedMenuItem } from "~/types/drupalMenu";

const route = useRoute();

const props = defineProps<{
  submenuItems: fetchedMenuItem[];
  submenuIndex: number;
}>();

const displayChildren = ref<number>(props.submenuIndex);
const itemSelected = ref<number>(props.submenuIndex);
</script>
<template>
  <div class="protocol-subnavigation accent-cbd">
    <nav class="navbar container-xxl">
      <ClientOnly>
        <ul class="nav">
          <div class="subnav-header">
            <!-- <li class="nav-item selected">
                <NuxtLink
                  :to="submenuItem.link === '<nolink>' ? '' : submenuItem.link"
                  class="nav-link"
                >
                  {{ submenuItem.title }}
                </NuxtLink>
              </li> -->
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
            <li
              v-for="(childItem, index) of submenu"
              class="nav-item subnav-level-2-item"
              :class="[
                { show: childItem == submenu[itemSelected] },
                { 'current-page': childItem == submenuItems[0] },
              ]"
            >
              <NuxtLink
                :to="childItem.link === '<nolink>' ? '' : childItem.link"
                class="nav-link"
                @click="
                  displayChildren = index;
                  itemSelected = index;
                "
                >{{ childItem.title }}
              </NuxtLink>
              <ul
                v-if="childItem.children.length > 0"
                class="subnav-level-3-items nav"
              >
                <li
                  v-for="grandchildItem of submenu[displayChildren].children"
                  class="nav-item"
                  :class="[
                    {
                      'current-page':
                        grandchildItem == submenuItems[0].children[index],
                    },
                  ]"
                >
                  <NuxtLink class="nav-link" :to="grandchildItem.link"
                    >{{ grandchildItem.title }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </div>
        </ul>
        <ul
          class="subnav-level-3-items nav"
          :class="{
            'item-overflow': submenu[displayChildren].children.length > 8,
          }"
        >
          <li
            v-for="(childItem, index) of submenu[displayChildren].children"
            class="nav-item"
            :class="[
              {
                'current-page': route.fullPath === childItem.link,
              },
            ]"
          >
            <NuxtLink class="nav-link" :to="childItem.link">{{
              childItem.title
            }}</NuxtLink>
          </li>
        </ul>
      </ClientOnly>
    </nav>
  </div>
</template>
