export interface drupalMenu {
  id: string;
  attributes: {
    parent: string;
    title: string;
    link: {
      uri: string;
      options: {
        component?: string;
        submenu?: string;
        icon?: string;
      };
    };
  };
}

export interface fetchedMenu {
  langCode: string;
  menu_name: string;
  menu: fetchedMenuItem[];
}

export interface fetchedMenuItem {
  id: string;
  title: string;
  link: string;
  options?: {
    attributes?: {
      component?: string;
      submenu?: string;
      icon?: string;
    };
  };
  children: fetchedMenuItem[];
}
