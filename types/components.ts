export interface componentRequest {
  numFound: number;
  start: number;
  docs?: componentMeetingRaw[];
  meetings?: componentMeeting[];
}

export interface componentMeeting {
  symbol: string;
  url: string;
  title_test?: string;
  title: {
    [ar: string]: string;
    en: string;
    es: string;
    fr: string;
    ru: string;
    zh: string;
  };
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
  start_date: Date;
  end_date: Date;
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
