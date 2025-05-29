export interface componentRequest {
  numFound?: number;
  start?: number;
  data?: componentArticleRaw | componentArticleRaw[] | componentPortalRaw[];
  docs?: [];
}

export interface availableLanguages {
  [ar: string]: string;
  en: string;
  es: string;
  fr: string;
  ru: string;
  zh: string;
}

export interface searchParams {
  q: string;
  rows: string | number;
  fl?: string | string[];
  sort?: string[];
  status?: string;
}

export interface componentSanitized
  extends componentArticle,
    componentMeeting,
    componentNotification,
    componentPortal,
    componentStatement,
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
  themes?: availableLanguages;
  fulltext?: availableLanguages;
  files?: {
    type: string;
    language: string;
    url: string;
    name: string;
  }[];
}

interface componentStatement extends componentBase {}

interface componentPortal extends componentBase {
  date_changed?: Date;
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
      langcode: string;
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

export interface componentNotificationRaw {
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

export interface componentMeetingRaw {
  status_s: string;
  symbol_s: string;
  title_AR_s: string;
  title_EN_s: string;
  title_ES_s: string;
  title_FR_s: string;
  title_RU_s: string;
  title_ZH_s: string;
  url_ss: string;
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

export interface componentStatementRaw {
  symbol_s: string;
  date_s: string;
  title_AR_s: string;
  title_EN_s: string;
  title_ES_s: string;
  title_FR_s: string;
  title_RU_s: string;
  title_ZH_s: string;
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
  title_AR_s: string;
  title_EN_s: string;
  title_ES_s: string;
  title_FR_s: string;
  title_RU_s: string;
  title_ZH_s: string;
  submittedDate_s: string;
  url_ss: string;
}
