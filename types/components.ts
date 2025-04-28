export interface componentRequest {
  numFound?: number;
  start?: number;
  data?: [];
  docs?: [];
  meetings?: componentMeeting[];
  notifications?: componentNotification[];
  statements?: componentStatement[];
  portals?: componentPortal[];
}

export interface searchParams {
  q: string;
  fl?: string | string[];
  sort?: {
    params?: string;
    direction?: string;
  };
  rows: string | number;
  optional?: {
    status?: string;
  };
}

interface componentGeneric {
  symbol: string;
  date: Date;
  url: string;
  title: {
    [ar: string]: string;
    en: string;
    es: string;
    fr: string;
    ru: string;
    zh: string;
  };
}

export interface componentMeeting extends componentGeneric {
  date_end: Date;
  event_city: {
    [ar: string]: string;
    en: string;
    es: string;
    fr: string;
    ru: string;
    zh: string;
  };
  event_country: {
    [ar: string]: string;
    en: string;
    es: string;
    fr: string;
    ru: string;
    zh: string;
  };
  status: string;
}

export interface componentNotification extends componentGeneric {
  date_action?: Date;
  date_deadline: Date;
  sender: string;
  reference: string;
  recipient: string[];
  themes: {
    [ar: string]: string;
    en: string;
    es: string;
    fr: string;
    ru: string;
    zh: string;
  };
  fulltext: {
    [ar: string]: string;
    en: string;
    es: string;
    fr: string;
    ru: string;
    zh: string;
  };
}

export interface componentStatement extends componentGeneric {
  // location: string;
  // description: string;
}

export interface componentPortal {
  title: string;
  url: string;
  date: Date;
  date_changed: Date;
  image: {
    url: string;
    width?: number;
    height?: number;
    mime_type?: string;
    file_size?: number;
    title?: string;
    alt: string;
  };
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

export interface componentNotificationRaw {
  symbol_s: string;
  date_s: string;
  actionDate_s?: string | undefined;
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
