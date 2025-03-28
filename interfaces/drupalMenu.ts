export interface drupalMenu {
    id: string; 
    attributes: {
        parent: string;
        title: string;
        link: {
            uri: string;
        };
    };
}

export interface footerMenu {
    langCode: string,
    menu_name: string,
    menu: []
}

export interface drupalMenuItem {
    id: string,
    title: string,
    link: string,
    children: drupalMenuItem[]
}