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

export interface fetchedMenu {
    langCode: string,
    menu_name: string,
    menu: []
}

export interface fetchedMenuItem {
    id: string,
    title: string,
    link: string,
    children: fetchedMenuItem[]
}