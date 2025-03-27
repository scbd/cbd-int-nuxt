import type { drupalMenuItem } from "./drupalMenuItem";

export interface footerMenu {
    langCode: string,
    menu_name: string,
    menu: drupalMenuItem[]
}