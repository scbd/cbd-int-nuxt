export interface drupalEntityPath {
  entity: {
    uuid: string;
  };
  jsonapi: {
    individual: string;
  };
}

export interface drupalEntitySearchParams {
  entity: string;
  limit: number;
  fl?: string | string[];
  conditions?: { [key in string]: string };
  sort?: string | string[];
  status?: string;
}
