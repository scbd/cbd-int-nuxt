import type { drupalToken } from "~/types/drupalAuth";
import {
  type componentRequest,
  type componentArticleRaw,
  type componentArticleCoverImageRaw,
  type componentMeetingRaw,
  type componentNotificationRaw,
  type componentStatementRaw,
  type componentPortalRaw,
  type componentNbsapRaw,
  type componentSanitized,
  type searchParams,
} from "~/types/components";
import type { componentStatus } from "~/types/componentStatus";

export const referenced_articles = ref<componentSanitized[]>([]);
export const articles_status = ref<componentStatus>({ status: "pending" });
export const referenced_meetings = ref<componentSanitized[]>([]);
export const meetings_status = ref<componentStatus>({ status: "pending" });
export const referenced_notifications = ref<componentSanitized[]>([]);
export const notifications_status = ref<componentStatus>({ status: "pending" });
export const referenced_statements = ref<componentSanitized[]>([]);
export const statements_status = ref<componentStatus>({ status: "pending" });
export const referenced_portals = ref<componentSanitized[]>([]);
export const portals_status = ref<componentStatus>({ status: "pending" });
export const referenced_nbsaps = ref<componentSanitized[]>([]);
export const nbsaps_status = ref<componentStatus>({ status: "pending" });

export default function getComponents() {
  const config = useRuntimeConfig();

  const drupalToken = useState<drupalToken>("drupal_token").value;

  const getArticles = async (search_parameters: searchParams) => {
    articles_status.value.status = "pending";
    const lang_code = active_language.value?.active_language;

    const params = new URLSearchParams({});

    try {
      const response = await fetch(
        `${config.public.DRUPAL_URL}/${lang_code !== "en" ? (lang_code + "/").toString() : ""}jsonapi/node/article`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${drupalToken.token_type} ${drupalToken.access_token}`,
          },
        }
      );
      if (response.ok) {
        const articles_raw: componentRequest = await response.json();

        const getArticleImage = async (cover_image_url: string) => {
          const response = fetch(cover_image_url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((json) => {
              return json.json();
            })
            .then((data: componentArticleCoverImageRaw) => {
              return data;
            });

          return response;
        };

        const data_mapped = articles_raw.data!.map(
          (raw_data: componentArticleRaw): componentSanitized => ({
            type: "article",
            title: raw_data.attributes.title,
            url: raw_data.attributes.path.alias,
            image_cover: {
              url: raw_data.relationships.field_image.links.related.href,
              mime_type: "",
              file_size: 0,
              title: raw_data.relationships.field_image.data.meta.title,
              width: raw_data.relationships.field_image.data.meta.width,
              height: raw_data.relationships.field_image.data.meta.height,
              alt: raw_data.relationships.field_image.data.meta.alt,
            },
            date: new Date(raw_data.attributes.created),
            date_edited: new Date(raw_data.attributes.changed),
            content: raw_data.attributes.body.processed,
          })
        );

        for await (const article of data_mapped.flat()) {
          if (article.image_cover?.url) {
            try {
              const image_cover = await getArticleImage(
                article.image_cover.url
              );
              article.image_cover.mime_type =
                image_cover.data.attributes.filemime;
              article.image_cover.file_size =
                image_cover.data.attributes.filesize;
              article.image_cover.url = `${config.public.DRUPAL_URL}/${image_cover.data.attributes.uri.url}`;
            } catch (error) {
              console.error(error);
            }
          }
        }

        const articles_list: componentSanitized[] = data_mapped;

        referenced_articles.value = articles_list;
        articles_status.value.status = "OK";

        return articles_list;
      }
    } catch (error) {
      console.error(error);
      articles_status.value.status = "error";
    }
  };

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
          (raw_data: componentMeetingRaw): componentSanitized => ({
            type: "meeting",
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

        const meeting_list: componentSanitized[] = data_docs_mapped;

        referenced_meetings.value = meeting_list;
        meetings_status.value.status = "OK";

        return meeting_list;
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

      const notifications_raw: { response: componentRequest } =
        await response.json();

      const data_docs_mapped = notifications_raw.response.docs!.map(
        (raw_data: componentNotificationRaw): componentSanitized => ({
          type: "notification",
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
            ar: raw_data.themes_AR_ss[0],
            en: raw_data.themes_EN_ss[0],
            es: raw_data.themes_ES_ss[0],
            fr: raw_data.themes_FR_ss[0],
            ru: raw_data.themes_RU_ss[0],
            zh: raw_data.themes_ZH_ss[0],
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

      const notification_list: componentSanitized[] = data_docs_mapped;

      referenced_notifications.value = notification_list;
      notifications_status.value.status = "OK";

      return notification_list;
    } catch (error) {
      console.error(error);
      notifications_status.value.status = "error";
    }
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
          (raw_data: componentStatementRaw): componentSanitized => ({
            type: "statement",
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

        const statement_list: componentSanitized[] = data_docs_mapped;

        referenced_statements.value = statement_list;
        statements_status.value.status = "OK";

        return statement_list;
      }
    } catch (error) {
      console.error(error);
      statements_status.value.status = "error";
    }
  };

  const getPortals = async () => {
    portals_status.value.status = "pending";

    const drupalToken = useState<drupalToken>("drupal_token").value;

    try {
      const lang_code = active_language.value?.active_language;

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
          (raw_data: componentPortalRaw): componentSanitized => ({
            type: "portal",
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

        const portals_list: componentSanitized[] = data_mapped;

        referenced_portals.value = portals_list;
        portals_status.value.status = "OK";

        return portals_list;
      }
    } catch (error) {
      console.error(error);
      portals_status.value.status = "error";
    }
  };

  const getNbsaps = async (search_parameters: searchParams) => {
    nbsaps_status.value.status = "pending";

    const params = new URLSearchParams({
      q: "schema_s:nbsap",
      fl: search_parameters.fl?.toString() || "",
      sort: search_parameters.sort?.params
        ? `${search_parameters.sort.params} ${search_parameters.sort?.direction || "asc"}`
        : "abs(ms(submittedDate_s,NOW)) asc",
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
        const nbsaps_raw: { response: componentRequest } =
          await response.json();

        const data_docs_mapped = nbsaps_raw.response.docs!.map(
          (raw_data: componentNbsapRaw): componentSanitized => ({
            type: "nbsap",
            date: new Date(raw_data.submittedDate_s),
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

        const nbsap_list: componentSanitized[] = data_docs_mapped;

        referenced_nbsaps.value = nbsap_list;
        nbsaps_status.value.status = "OK";

        return nbsap_list;
      }
    } catch (error) {
      console.error(error);
      nbsaps_status.value.status = "error";
    }
  };

  return {
    getArticles,
    getMeetings,
    getNotifications,
    getStatements,
    getPortals,
    getNbsaps,
  };
}
