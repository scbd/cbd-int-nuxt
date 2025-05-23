import type { drupalToken } from "~/types/drupalAuth";
import {
  type componentRequest,
  type componentArticleRaw,
  type componentArticleCoverImageRaw,
  type componentArticlePath,
  type componentMeetingRaw,
  type componentNotificationRaw,
  type componentStatementRaw,
  type componentPortalRaw,
  type componentNbsapRaw,
  type componentSanitized,
  type searchParams,
} from "~/types/components";
import type { componentStatus } from "~/types/componentStatus";
import contentParser from "~/composables/contentParser";

export const referencedArticles = ref<componentSanitized[]>([]);
export const articlesStatus = ref<componentStatus>({ status: "pending" });
export const referencedMeetings = ref<componentSanitized[]>([]);
export const meetingsStatus = ref<componentStatus>({ status: "pending" });
export const referencedNotifications = ref<componentSanitized[]>([]);
export const notificationsStatus = ref<componentStatus>({ status: "pending" });
export const referencedStatements = ref<componentSanitized[]>([]);
export const statementsStatus = ref<componentStatus>({ status: "pending" });
export const referencedPortals = ref<componentSanitized[]>([]);
export const portalsStatus = ref<componentStatus>({ status: "pending" });
export const referencedNbsaps = ref<componentSanitized[]>([]);
export const nbsapsStatus = ref<componentStatus>({ status: "pending" });

export default function getComponents() {
  const config = useRuntimeConfig();

  const drupalToken = useState<drupalToken>("drupal_token").value;

  const getArticles = async (searchParameters: searchParams) => {
    articlesStatus.value.status = "pending";
    const langCode = activeLanguage.value?.active_language;

    let uuid = "";

    if (searchParameters.q === "content-page") {
      const params = new URLSearchParams({
        path: [searchParameters.fl].flat().toString(),
      });

      try {
        const response = await fetch(
          `${config.public.DRUPAL_URL}/router/translate-path?${params}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const articleResponse: componentArticlePath = await response.json();
          uuid = articleResponse.entity.uuid;
        } else {
          referencedArticles.value = [];
          throw new Error(response.statusText, {
            cause: { url: response.url, statusCode: response.status },
          });
        }
      } catch (error: any) {
        throw createError({
          statusCode: error.cause.statusCode,
          statusMessage: error.message,
          cause: error.cause.url,
          fatal: true,
        });
      }
    }

    const params = new URLSearchParams({
      "page[limit]": searchParameters.rows.toString(),
      sort: `${searchParameters.sort ? searchParameters.sort : "-created"}`,
    });

    try {
      const response = await fetch(
        `${config.public.DRUPAL_URL}/${langCode !== "en" ? (langCode + "/").toString() : ""}jsonapi/node/article${uuid ? "/" + uuid : ""}?${params}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${drupalToken.token_type} ${drupalToken.access_token}`,
          },
        }
      );
      if (response.ok) {
        const articlesRaw: componentRequest = await response.json();

        if ((articlesRaw.data as componentArticleRaw).attributes) {
          articlesRaw.data = [articlesRaw.data as componentArticleRaw];
        }

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

        const dataMapped = (articlesRaw.data as componentArticleRaw[])!.map(
          (rawData: componentArticleRaw): componentSanitized => ({
            type: "article",
            title: rawData.attributes.title,
            url: rawData.attributes.path.alias,
            image_cover: {
              url: rawData.relationships.field_image.links.related.href,
              mime_type: "",
              file_size: 0,
              title: rawData.relationships.field_image.data.meta.title,
              width: rawData.relationships.field_image.data.meta.width,
              height: rawData.relationships.field_image.data.meta.height,
              alt: rawData.relationships.field_image.data.meta.alt,
            },
            date: new Date(rawData.attributes.created),
            date_edited: new Date(rawData.attributes.changed),
            content: rawData.attributes.body.processed,
          })
        );

        for await (const article of dataMapped.flat()) {
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

          article.content = contentParser(article.content);
        }

        const articlesList: componentSanitized[] = dataMapped;

        referencedArticles.value = articlesList;
        articlesStatus.value.status = "OK";

        return articlesList;
      }
    } catch (error) {
      console.error(error);
      articlesStatus.value.status = "error";
    }
  };

  const getMeetings = async (searchParameters: searchParams) => {
    meetingsStatus.value.status = "pending";

    const params = new URLSearchParams({
      q: "schema_s:meeting",
      fl: searchParameters.fl?.toString() || "",
      sort: searchParameters.sort
        ? searchParameters.sort?.flat().join(", ")
        : "abs(ms(startDate_dt,NOW)) asc",
      rows: (searchParameters.rows || 4).toString(),
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
        const meetingsRaw: { response: componentRequest } =
          await response.json();

        const dataDocsMapped = meetingsRaw.response.docs!.map(
          (rawData: componentMeetingRaw): componentSanitized => ({
            type: "meeting",
            symbol: rawData.symbol_s,
            date: new Date(rawData.startDate_dt),
            date_end: new Date(rawData.endDate_dt),
            url: rawData.url_ss[0],
            title: {
              ar: rawData.title_AR_s,
              en: rawData.title_EN_s,
              es: rawData.title_ES_s,
              fr: rawData.title_FR_s,
              ru: rawData.title_RU_s,
              zh: rawData.title_ZH_s,
            },
            event_city: {
              ar: rawData.eventCity_AR_s,
              en: rawData.eventCity_EN_s,
              es: rawData.eventCity_ES_s,
              fr: rawData.eventCity_FR_s,
              ru: rawData.eventCity_RU_s,
              zh: rawData.eventCity_ZH_s,
            },
            event_country: {
              ar: rawData.eventCountry_AR_s,
              en: rawData.eventCountry_EN_s,
              es: rawData.eventCountry_ES_s,
              fr: rawData.eventCountry_FR_s,
              ru: rawData.eventCountry_RU_s,
              zh: rawData.eventCountry_ZH_s,
            },
            status: rawData.status_s,
          })
        );

        const meetingList: componentSanitized[] = dataDocsMapped;

        referencedMeetings.value = meetingList;
        meetingsStatus.value.status = "OK";

        return meetingList;
      }
    } catch (error) {
      console.error(error);
      meetingsStatus.value.status = "error";
    }
  };

  const getNotifications = async (searchParameters: searchParams) => {
    const params = new URLSearchParams({
      q: searchParameters.q,
      fl: searchParameters.fl?.toString() || "",
      sort: searchParameters.sort
        ? searchParameters.sort?.flat().join(", ")
        : "abs(ms(startDate_dt,NOW)) asc",
      rows: (searchParameters.rows || 4).toString(),
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

      const notificationsRaw: { response: componentRequest } =
        await response.json();

      const dataDocsMapped = notificationsRaw.response.docs!.map(
        (rawData: componentNotificationRaw): componentSanitized => ({
          type: "notification",
          symbol: rawData.symbol_s,
          date: new Date(rawData.date_s),
          date_action: rawData.actionDate_s
            ? new Date(rawData.actionDate_s)
            : undefined,
          date_deadline: new Date(rawData.deadline_s),
          sender: rawData.sender_s,
          reference: rawData.reference_s,
          url: rawData.url_ss[0],
          recipient: rawData.recipient_ss,
          title: {
            ar: rawData.title_AR_s,
            en: rawData.title_EN_s,
            es: rawData.title_ES_s,
            fr: rawData.title_FR_s,
            ru: rawData.title_RU_s,
            zh: rawData.title_ZH_s,
          },
          themes: {
            ar: rawData.themes_AR_ss ? rawData.themes_AR_ss.join("، ") : "",
            en: rawData.themes_EN_ss ? rawData.themes_EN_ss.join(", ") : "",
            es: rawData.themes_ES_ss ? rawData.themes_ES_ss.join(", ") : "",
            fr: rawData.themes_FR_ss ? rawData.themes_FR_ss.join(", ") : "",
            ru: rawData.themes_RU_ss ? rawData.themes_RU_ss.join(", ") : "",
            zh: rawData.themes_ZH_ss ? rawData.themes_ZH_ss.join(", ") : "",
          },
          fulltext: {
            ar: rawData.fulltext_AR_s,
            en: rawData.fulltext_EN_s,
            es: rawData.fulltext_ES_s,
            fr: rawData.fulltext_FR_s,
            ru: rawData.fulltext_RU_s,
            zh: rawData.fulltext_ZH_s,
          },
          files: JSON.parse(rawData.files_ss?.[0] ?? "{}"),
        })
      );

      const notificationList: componentSanitized[] = dataDocsMapped;

      referencedNotifications.value = notificationList;
      notificationsStatus.value.status = "OK";

      return notificationList;
    } catch (error) {
      console.error(error);
      notificationsStatus.value.status = "error";
    }
  };

  const getStatements = async (searchParameters: searchParams) => {
    statementsStatus.value.status = "pending";

    const params = new URLSearchParams({
      q: "schema_s:statement",
      fl: searchParameters.fl?.toString() || "",
      sort: searchParameters.sort
        ? searchParameters.sort?.flat().join(", ")
        : "abs(ms(startDate_dt,NOW)) asc",
      rows: (searchParameters.rows || 4).toString(),
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
        const statementsRaw: { response: componentRequest } =
          await response.json();

        const dataDocsMapped = statementsRaw.response.docs!.map(
          (rawData: componentStatementRaw): componentSanitized => ({
            type: "statement",
            symbol: rawData.symbol_s,
            date: new Date(rawData.date_s),
            url: rawData.url_ss[0],
            title: {
              ar: rawData.title_AR_s,
              en: rawData.title_EN_s,
              es: rawData.title_ES_s,
              fr: rawData.title_FR_s,
              ru: rawData.title_RU_s,
              zh: rawData.title_ZH_s,
            },
          })
        );

        const statementList: componentSanitized[] = dataDocsMapped;

        referencedStatements.value = statementList;
        statementsStatus.value.status = "OK";

        return statementList;
      }
    } catch (error) {
      console.error(error);
      statementsStatus.value.status = "error";
    }
  };

  const getPortals = async () => {
    portalsStatus.value.status = "pending";

    const drupalToken = useState<drupalToken>("drupal_token").value;

    try {
      const langCode = activeLanguage.value?.active_language;

      const response = await fetch(
        `${config.public.DRUPAL_URL}/${langCode !== "en" ? (langCode + "/").toString() : ""}jsonapi/menu_link_content/cbd-portals`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${drupalToken.token_type} ${drupalToken.access_token}`,
          },
        }
      );

      if (response.ok) {
        const portalsRaw: componentRequest = await response.json();

        const dataMapped = (portalsRaw.data as componentPortalRaw[])!.map(
          (rawData: componentPortalRaw): componentSanitized => ({
            type: "portal",
            title: rawData.attributes.title,
            url: rawData.attributes.link.uri,
            date: new Date(rawData.attributes.revision_created),
            date_changed: new Date(rawData.attributes.changed),
            image: {
              url: `${config.public.DRUPAL_URL}/sites/default/files/${rawData.attributes.link.options.attributes.icon}`,
              alt: rawData.attributes.title,
            },
          })
        );

        const portalsList: componentSanitized[] = dataMapped;

        referencedPortals.value = portalsList;
        portalsStatus.value.status = "OK";

        return portalsList;
      }
    } catch (error) {
      console.error(error);
      portalsStatus.value.status = "error";
    }
  };

  const getNbsaps = async (searchParameters: searchParams) => {
    nbsapsStatus.value.status = "pending";

    const params = new URLSearchParams({
      q: "schema_s:nbsap",
      fl: searchParameters.fl?.toString() || "",
      sort: searchParameters.sort
        ? searchParameters.sort?.flat().join(", ")
        : "abs(ms(startDate_dt,NOW)) asc",
      rows: (searchParameters.rows || 4).toString(),
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
        const nbsapsRaw: { response: componentRequest } = await response.json();

        const dataDocsMapped = nbsapsRaw.response.docs!.map(
          (rawData: componentNbsapRaw): componentSanitized => ({
            type: "nbsap",
            date: new Date(rawData.submittedDate_s),
            url: rawData.url_ss[0],
            title: {
              ar: rawData.title_AR_s,
              en: rawData.title_EN_s,
              es: rawData.title_ES_s,
              fr: rawData.title_FR_s,
              ru: rawData.title_RU_s,
              zh: rawData.title_ZH_s,
            },
          })
        );

        const nbsapList: componentSanitized[] = dataDocsMapped;

        referencedNbsaps.value = nbsapList;
        nbsapsStatus.value.status = "OK";

        return nbsapList;
      }
    } catch (error) {
      console.error(error);
      nbsapsStatus.value.status = "error";
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
