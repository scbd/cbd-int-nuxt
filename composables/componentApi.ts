import type {
  componentRequest,
  componentMeeting,
  componentMeetingRaw,
  componentNotification,
  componentNotificationRaw,
} from "~/types/components";
import type { componentStatus } from "~/types/componentStatus";
import type { userSettings } from "~/types/userSettings";

export const meetings = ref<componentRequest>({
  numFound: 0,
  start: 0,
  docs: [],
  meetings: [],
});
export const meetings_status = ref<componentStatus>({ status: "pending" });

export const notifications = ref<componentRequest>({
  numFound: 0,
  start: 0,
  docs: [],
  notifications: [],
});
export const notifications_status = ref<componentStatus>({ status: "pending" });

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

export default function getComponents() {
  const config = useRuntimeConfig();

  const getMeetings = async (search_parameters: searchParams) => {
    meetings_status.value.status = "pending";

    const params = new URLSearchParams({
      q: "schema_s:meeting",
      fl: search_parameters.fl?.toString() || "",
      sort: search_parameters.sort?.params
        ? `${search_parameters.sort.params} ${search_parameters.sort?.direction || "asc"}`
        : "abs(ms(startDate_dt,NOW)) asc",
      rows: (search_parameters.rows || 4).toString(),
    });

    try {
      const response = await fetch(
        `${config.public.SOLR_QUERY}?${params.toString()}`,
        // "https://api.cbd.int/api/v2013/index?q=schema_s:meeting&fl=startDate_dt,endDate_dt,EVT_CD,title_*_s,url_ss,symbol_s,eventCity_*_s,eventCountry_??_s,status_s&sort=abs(ms(startDate_dt,NOW))asc&rows=4",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const meetings_raw: { response: componentRequest } =
          await response.json();

        const data_docs_mapped = meetings_raw.response.docs!.map(
          (raw_data: componentMeetingRaw): componentMeeting => ({
            symbol: raw_data.symbol_s,
            start_date: new Date(raw_data.startDate_dt),
            end_date: new Date(raw_data.endDate_dt),
            url: raw_data.url_ss[0],
            title: {
              ar: raw_data.title_AR_s,
              en: raw_data.title_EN_s,
              es: raw_data.title_ES_s,
              fr: raw_data.title_FR_s,
              ru: raw_data.title_RU_s,
              zh: raw_data.title_ZH_s,
            },
            event_city: {
              ar: raw_data.eventCity_AR_s,
              en: raw_data.eventCity_EN_s,
              es: raw_data.eventCity_ES_s,
              fr: raw_data.eventCity_FR_s,
              ru: raw_data.eventCity_RU_s,
              zh: raw_data.eventCity_ZH_s,
            },
            event_country: {
              ar: raw_data.eventCountry_AR_s,
              en: raw_data.eventCountry_EN_s,
              es: raw_data.eventCountry_ES_s,
              fr: raw_data.eventCountry_FR_s,
              ru: raw_data.eventCountry_RU_s,
              zh: raw_data.eventCountry_ZH_s,
            },
            status: raw_data.status_s,
          })
        );

        const meeting_list: componentRequest = {
          numFound: meetings_raw.response.numFound,
          start: meetings_raw.response.start,
          meetings: data_docs_mapped,
        };

        meetings.value = meeting_list;
        meetings_status.value.status = "OK";
      }
    } catch (error) {
      console.error(error);
      meetings_status.value.status = "error";
    }
  };

  const getNotifications = async (search_parameters: searchParams) => {
    const params = new URLSearchParams({
      q: "schema_s:notification",
      fl: search_parameters.fl?.toString() || "",
      sort: search_parameters.sort?.params
        ? `${search_parameters.sort.params} ${search_parameters.sort?.direction || "asc"}`
        : "abs(ms(startDate_dt,NOW)) asc",
      rows: (search_parameters.rows || 4).toString(),
    });

    const response = (await fetch(
      `${config.public.SOLR_QUERY}?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).catch((error) => {
      console.error(error);
      notifications_status.value.status = "error";
    })) as Response;

    const notifications_raw: { response: componentRequest } =
      await response.json();

    const data_docs_mapped = notifications_raw.response.docs!.map(
      (raw_data: componentNotificationRaw): componentNotification => ({
        symbol: raw_data.symbol_s,
        date: new Date(raw_data.date_s),
        action_date: raw_data.actionDate_s
          ? new Date(raw_data.actionDate_s)
          : undefined,
        deadline_date: new Date(raw_data.deadline_s),
        sender: raw_data.sender_s,
        reference: raw_data.reference_s,
        url: raw_data.url_ss[0],
        recipient: raw_data.recipient_ss,
        title: {
          ar: raw_data.title_AR_s,
          en: raw_data.title_EN_s,
          es: raw_data.title_ES_s,
          fr: raw_data.title_FR_s,
          ru: raw_data.title_RU_s,
          zh: raw_data.title_ZH_s,
        },
        themes: {
          ar: raw_data.themes_AR_ss.join("، "),
          en: raw_data.themes_EN_ss.join(", "),
          es: raw_data.themes_ES_ss.join(", "),
          fr: raw_data.themes_FR_ss.join(", "),
          ru: raw_data.themes_RU_ss.join(", "),
          zh: raw_data.themes_ZH_ss.join(", "),
        },
        fulltext: {
          ar: raw_data.fulltext_AR_s,
          en: raw_data.fulltext_EN_s,
          es: raw_data.fulltext_ES_s,
          fr: raw_data.fulltext_FR_s,
          ru: raw_data.fulltext_RU_s,
          zh: raw_data.fulltext_ZH_s,
        },
      })
    );

    const notification_list: componentRequest = {
      numFound: notifications_raw.response.numFound,
      start: notifications_raw.response.start,
      notifications: data_docs_mapped,
    };

    notifications.value = notification_list;

    notifications_status.value.status = "OK";
  };

  return {
    getMeetings,
    getNotifications,
  };
}
