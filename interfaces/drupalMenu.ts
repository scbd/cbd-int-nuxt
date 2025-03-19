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