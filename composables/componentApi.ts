import type { drupalToken } from "~/types/drupalAuth";
import {
  type componentRequest,
  type componentMeeting,
  type componentMeetingRaw,
  type componentNotification,
  type componentNotificationRaw,
  type componentStatement,
  type componentStatementRaw,
  type componentPortal,
  type componentPortalRaw,
  type searchParams,
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

export const statements = ref<componentRequest>({
  numFound: 0,
  start: 0,
  docs: [],
  statements: [],
});
export const statements_status = ref<componentStatus>({ status: "pending" });

export const portals = ref<componentRequest>({
  data: [],
});

export const portals_status = ref<componentStatus>({ status: "pending" });

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
            date: new Date(raw_data.startDate_dt),
            date_end: new Date(raw_data.endDate_dt),
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
        date_action: raw_data.actionDate_s
          ? new Date(raw_data.actionDate_s)
          : undefined,
        date_deadline: new Date(raw_data.deadline_s),
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

  const getStatements = async (search_parameters: searchParams) => {
    statements_status.value.status = "pending";

    const params = new URLSearchParams({
      q: "schema_s:statement",
      fl: search_parameters.fl?.toString() || "",
      sort: search_parameters.sort?.params
        ? `${search_parameters.sort.params} ${search_parameters.sort?.direction || "asc"}`
        : "abs(ms(startDate_dt,NOW)) asc",
      rows: (search_parameters.rows || 4).toString(),
    });

    try {
      const response = await fetch(
        `${config.public.SOLR_QUERY}?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const statements_raw: { response: componentRequest } =
          await response.json();

        const data_docs_mapped = statements_raw.response.docs!.map(
          (raw_data: componentStatementRaw): componentStatement => ({
            symbol: raw_data.symbol_s,
            date: new Date(raw_data.date_s),
            url: raw_data.url_ss[0],
            title: {
              ar: raw_data.title_AR_s,
              en: raw_data.title_EN_s,
              es: raw_data.title_ES_s,
              fr: raw_data.title_FR_s,
              ru: raw_data.title_RU_s,
              zh: raw_data.title_ZH_s,
            },
          })
        );

        const statement_list: componentRequest = {
          numFound: statements_raw.response.numFound,
          start: statements_raw.response.start,
          statements: data_docs_mapped,
        };

        statements.value = statement_list;
        statements_status.value.status = "OK";
      }
    } catch (error) {
      console.error(error);
      statements_status.value.status = "error";
    }
  };

  const getPortals = async () => {
    portals_status.value.status = "pending";

    const drupalToken = useState<drupalToken>("drupal_token").value;
    const lang_code = active_language.value?.active_language;

    try {
      const response = await fetch(
        `${config.public.DRUPAL_URL}/${lang_code !== "en" ? (lang_code + "/").toString() : ""}jsonapi/menu_link_content/cbd-portals`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${drupalToken.token_type} ${drupalToken.access_token}`,
          },
        }
      );

      if (response.ok) {
        const portals_raw: componentRequest = await response.json();

        const data_mapped = portals_raw.data!.map(
          (raw_data: componentPortalRaw): componentPortal => ({
            title: raw_data.attributes.title,
            url: raw_data.attributes.link.uri,
            date: new Date(raw_data.attributes.revision_created),
            date_changed: new Date(raw_data.attributes.changed),
            image: {
              url: `${config.public.DRUPAL_URL}/sites/default/files/${raw_data.attributes.link.options.attributes.icon}`,
              alt: raw_data.attributes.title,
            },
          })
        );

        const portals_list: componentRequest = {
          portals: data_mapped,
        };

        console.log(portals_list);

        portals.value = portals_list;
        portals_status.value.status = "OK";
      }
    } catch (error) {
      console.error(error);
      portals_status.value.status = "error";
    }
  };

  return {
    getMeetings,
    getNotifications,
    getStatements,
    getPortals,
  };
}
