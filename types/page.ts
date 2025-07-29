export interface pageRequest {
  data: [];
}

export interface page {
  title: string;
  url: string;
  date_created: Date;
  date_edited: Date;
  content: string;
  summary: string;
  field_menu: string;
}

export interface pageParamaters {
  alias: string;
}

export interface pagePath {
  entity: {
    uuid: string;
  };
  jsonapi: {
    individual: string;
  };
}

export interface pageRaw {
  data: {
    attributes: {
      title: string;
      langcode: string;
      created: string;
      changed: string;
      path: {
        alias: string;
      };
      body: {
        processed: string;
        summary: string;
      };
      field_menu: string;
    };
  };
}

export type pagePathProp = `level${number}`;
