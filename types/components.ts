export interface componentRequest {
  start?: number;
  data?:
    | componentArticleRaw
    | componentArticleRaw[]
    | componentGbfTargetRaw
    | componentGbfTargetRaw[]
    | componentPortalRaw[];
}

export interface componentGaiaRequest {
  numFound: number;
  start: 0;
  docs:
    | componentMeetingRaw[]
    | componentNotificationRaw[]
    | componentStatementRaw[]
    | componentNbsapRaw[];
}

export type componentType = componentGaiaType | componentDrupalType;

export type componentGaiaType = (
  | "meeting"
  | "notification"
  | "statement"
  | "nbsap"
)[];

export type componentDrupalType = ("article" | "gbf-target" | "portal")[];

export interface availableLanguages {
  [language: string]: string;
  ar: string;
  en: string;
  es: string;
  fr: string;
  ru: string;
  zh: string;
}

export interface availableLanguagesArray {
  [language: string]: string[];
  ar: string[];
  en: string[];
  es: string[];
  fr: string[];
  ru: string[];
  zh: string[];
}

export interface searchParams {
  q: string;
  rows: string | number;
  fl?: string | string[];
  sort?:
    | string
    | {
        [field_name: string]: "asc" | "desc";
      };
  start?: number;
  status?: string;
}

export interface componentSanitized
  extends componentArticle,
    componentMeeting,
    componentNotification,
    componentGbfTarget,
    componentStatement,
    componentPortal,
    componentNbsap {
  type: string;
}

interface componentBase {
  url: string;
  date: Date;
  title: string | availableLanguages;
}

interface componentArticle extends componentBase {
  image_cover?: {
    url: string;
    width: number;
    height: number;
    mime_type: string;
    file_size: number;
    title: string;
    alt: string;
  };
  date_edited?: Date;
  content?: string;
}

interface componentMeeting extends componentBase {
  symbol?: string;
  status?: string;
  themes?: availableLanguagesArray;
  date_end?: Date;
  event_city?: availableLanguages;
  event_country?: availableLanguages;
}

interface componentNotification extends componentBase {
  symbol?: string;
  date_action?: Date;
  date_deadline?: Date;
  sender?: string;
  reference?: string;
  recipient?: string[];
  themes?: availableLanguagesArray;
  fulltext?: availableLanguages;
  files?: {
    type: string;
    language: string;
    url: string;
    name: string;
  }[];
}

interface componentGbfTarget extends componentBase {
  identifier?: string;
  title_short?: availableLanguages;
  description?: string;
  description_long?: availableLanguages;
}

interface componentStatement extends componentBase {
  themes?: availableLanguagesArray;
}

interface componentPortal extends componentBase {
  date_edited?: Date;
  image?: {
    url: string;
    width?: number;
    height?: number;
    mime_type?: string;
    file_size?: number;
    title?: string;
    alt: string;
  };
}

interface componentNbsap extends componentBase {}

export interface componentArticleRaw {
  attributes: {
    langcode: string;
    status: boolean;
    title: string;
    created: string;
    changed: string;
    revision_timestamp: string;
    promote: boolean;
    sticky: boolean;
    path: {
      alias: string;
    };
    body: {
      processed: string;
    };
  };
  relationships: {
    field_image: {
      data: {
        meta: {
          alt: string;
          title: string;
          width: number;
          height: number;
        };
      };
      links: {
        related: {
          href: string;
        };
      };
    };
  };
}

export interface componentArticleCoverImageRaw {
  data: {
    attributes: {
      uri: {
        url: string;
      };
      filemime: string;
      filesize: number;
    };
  };
}

export interface componentArticlePath {
  entity: {
    uuid: string;
  };
  jsonapi: {
    individual: string;
  };
}

export interface componentMeetingRaw {
  schema_s: string;
  status_s: string;
  symbol_s: string;
  title_AR_s: string;
  title_EN_s: string;
  title_ES_s: string;
  title_FR_s: string;
  title_RU_s: string;
  title_ZH_s: string;
  url_ss: string;
  themes_AR_ss: string[];
  themes_EN_ss: string[];
  themes_ES_ss: string[];
  themes_FR_ss: string[];
  themes_RU_ss: string[];
  themes_ZH_ss: string[];
  startDate_dt: Date;
  endDate_dt: Date;
  eventCity_AR_s: string;
  eventCity_EN_s: string;
  eventCity_ES_s: string;
  eventCity_FR_s: string;
  eventCity_RU_s: string;
  eventCity_ZH_s: string;
  eventCountry_AR_s: string;
  eventCountry_EN_s: string;
  eventCountry_ES_s: string;
  eventCountry_FR_s: string;
  eventCountry_RU_s: string;
  eventCountry_ZH_s: string;
}

export interface componentNotificationRaw {
  schema_s: string;
  symbol_s: string;
  date_s: string;
  actionDate_s?: string;
  deadline_s: string;
  sender_s: string;
  reference_s: string;
  url_ss: string;
  recipient_ss: string[];
  title_AR_s: string;
  title_EN_s: string;
  title_ES_s: string;
  title_FR_s: string;
  title_RU_s: string;
  title_ZH_s: string;
  themes_AR_ss: string[];
  themes_EN_ss: string[];
  themes_ES_ss: string[];
  themes_FR_ss: string[];
  themes_RU_ss: string[];
  themes_ZH_ss: string[];
  fulltext_AR_s: string;
  fulltext_EN_s: string;
  fulltext_ES_s: string;
  fulltext_FR_s: string;
  fulltext_RU_s: string;
  fulltext_ZH_s: string;
  files_ss?: string[];
}

export interface componentGbfTargetRaw {
  identifier: string;
  name: string;
  title: availableLanguages;
  shortTitle: availableLanguages;
  description: string;
  longDescription: availableLanguages;
}

export interface componentStatementRaw {
  schema_s: string;
  symbol_s: string;
  date_s: string;
  title_AR_s: string;
  title_EN_s: string;
  title_ES_s: string;
  title_FR_s: string;
  title_RU_s: string;
  title_ZH_s: string;
  themes_AR_ss: string[];
  themes_EN_ss: string[];
  themes_ES_ss: string[];
  themes_FR_ss: string[];
  themes_RU_ss: string[];
  themes_ZH_ss: string[];
  url_ss: string;
}

export interface componentPortalRaw {
  attributes: {
    title: string;
    description: string;
    revision_created: string;
    changed: string;
    link: {
      uri: string;
      title: string;
      options: {
        attributes: {
          icon: string;
        };
      };
    };
  };
}

export interface componentNbsapRaw {
  schema_s: string;
  title_AR_s: string;
  title_EN_s: string;
  title_ES_s: string;
  title_FR_s: string;
  title_RU_s: string;
  title_ZH_s: string;
  submittedDate_s: string;
  url_ss: string;
}
