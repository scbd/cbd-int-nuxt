import type { fetchedMenuItem } from "~/types/drupalMenu";

export const handleSubmenus = async (routeArray: string[]) => {
  const submenuItems = ref<fetchedMenuItem[]>([]);
  const pathItems = ref<{
    level2?: number;
    level3?: number;
    level4?: number;
  }>({});
  const displayChildren = ref<number>(0);
  const displayVerticalNav = ref<boolean>(false);

  if (submenu.value.length > 0) {
    submenuItems.value.length = 0;
    for await (const [level2Index, level2Item] of submenu.value.entries()) {
      if (level2Item.link.includes(routeArray[routeArray.length - 1])) {
        submenuItems.value.push(level2Item);
        displayChildren.value = level2Index;
        pathItems.value.level2 = level2Index;
      } else {
        for (const [level3Index, level3Item] of level2Item.children.entries()) {
          if (level3Item.link.includes(routeArray[routeArray.length - 1])) {
            submenuItems.value.push(level2Item);
            displayChildren.value = level2Index;
            pathItems.value.level2 = level2Index;
            pathItems.value.level3 = level3Index;
            if (level3Item.children.length > 0) {
              displayVerticalNav.value = true;
            }
          } else {
            for (const [
              level4Index,
              level4Item,
            ] of level3Item.children.entries()) {
              if (level4Item.link.includes(routeArray[routeArray.length - 1])) {
                submenuItems.value.push(level2Item);
                displayChildren.value = level2Index;
                displayVerticalNav.value = true;
                pathItems.value.level2 = level2Index;
                pathItems.value.level3 = level3Index;
                pathItems.value.level4 = level4Index;
              }
            }
          }
        }
      }
    }

    if (submenuItems.value.length === 0) {
      submenuItems.value = [submenu.value[0]];
    }
  }

  return { submenuItems, pathItems, displayChildren, displayVerticalNav };
};
